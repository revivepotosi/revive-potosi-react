import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import formValidationStr from '../constants/formValidationStr';
import validation from '../constants/validation';
import uploadActivator from '../utils/uploadActivator';
import uploadModel from '../utils/uploadModel';
import Experience from '../interfaces/Experiences';
import collections from '../constants/collections';
import { closeLoader, openLoader } from '../redux/generalSlice';
import addDocument from '../utils/firebase/firestore/addDocument';
import { RootState } from '../app/store';

interface Props {
  historicCenterID: string;
  onBack: () => void;
}

const useAddExperience = ({ historicCenterID, onBack }: Props) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  
  const formik = useFormik({
    initialValues: {
      nameSpanish: '',
      nameEnglish: '',
      activator: null,
      model: null,
    },
    validationSchema: yup.object({
      nameSpanish: yup
        .string()
        .required(formValidationStr[language.prefix].requiredField),
      nameEnglish: yup
        .string()
        .required(formValidationStr[language.prefix].requiredField),
      activator: yup
        .mixed()
        .required(formValidationStr[language.prefix].requiredField)
        .test('fileFormat', formValidationStr[language.prefix].imageFormat, (value: any) => {
          if (value) {
            const supportedFormats = validation.imageSupportedFormatsArray;
            return supportedFormats.includes(value.name.split('.').pop());
          }
          return true;
        })
        .test('fileSize', formValidationStr[language.prefix].imageSize, (value: any) => {
          if (value) {
            return value.size <= 2097152;
          }
          return true;
        }),
      model: yup
        .mixed()
        .required(formValidationStr[language.prefix].requiredField)
        .test('fileFormat', formValidationStr[language.prefix].modelFormat, (value: any) => {
          if (value) {
            const supportedFormats = validation.modelSupportedFormatsArray;
            return supportedFormats.includes(value.name.split('.').pop());
          }
          return true;
        })
        .test('fileSize', formValidationStr[language.prefix].modelSize, (value: any) => {
          if (value) {
            return value.size <= 52428800;
          }
          return true;
        }),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(openLoader());
        if (!values.activator) throw Error(formValidationStr[language.prefix].imageDontValid);
        if (!values.model) throw Error(formValidationStr[language.prefix].modelDontValid);
        const activator = await uploadActivator(values.activator, historicCenterID);
        const model = await uploadModel(values.model, historicCenterID);
        const newExperience: Experience = {
          historicCenterID,
          text: {
            ES: {
              name: values.nameSpanish,
            },
            EN: {
              name: values.nameEnglish,
            },
          },
          activator,
          model,
        };
        await addDocument(collections.experience, newExperience);
        onBack();
      } catch (error: any) {
        alert(error);
      } finally {
        dispatch(closeLoader());
      }
    },
  });
  
  return {
    language,
    formik,
  };
};

export default useAddExperience;
