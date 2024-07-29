import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RootState } from '../../../app/store';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import RouteNames from '../../../constants/routeNames';
import formValidationStr from '../../../constants/formValidationStr';
import collections from '../../../constants/collections';
import Category from '../interfaces/category';
import uploadImage from '../../../utils/uploadImage';
import addDocument from '../../../utils/firebase/firestore/addDocument';

const useAddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);

  const goCategory = () => navigate(`/${RouteNames.admin}/${RouteNames.category}`);
  
  const formik = useFormik({
    initialValues: {
      nameSpanish: '',
      nameEnglish: '',
      image: null,
    },
    validationSchema: yup.object({
      nameSpanish: yup
        .string()
        .required(formValidationStr[language.prefix].requiredField),
      nameEnglish: yup
        .string()
        .required(formValidationStr[language.prefix].requiredField),
      image: yup
        .mixed()
        .required(formValidationStr[language.prefix].requiredField)
        .test('fileFormat', formValidationStr[language.prefix].imageFormat, (value: any) => {
          if (value) {
            const supportedFormats = ['png', 'jpeg', 'jpg'];
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
    }),
    onSubmit: async (values) => {
      try {
        dispatch(openLoader());
        if (!values.image) throw Error(formValidationStr[language.prefix].imageDontValid);
        const image = await uploadImage(values.image, collections.category);
        const newCategory: Category = {
          text: {
            ES: {
              name: values.nameSpanish,
            },
            EN: {
              name: values.nameEnglish,
            },
          },
          image: image,
        };
        await addDocument(collections.category,newCategory);
        goCategory();
      } catch (error: any) {
        console.log(error);
      } finally {
        dispatch(closeLoader());
      }
    },
  });
  
  return {
    language,
    goCategory,
    formik,
  };
};

export default useAddCategory;
