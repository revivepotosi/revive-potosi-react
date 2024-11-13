import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RootState } from '../app/store';
import formValidationStr from '../constants/formValidationStr';
import { closeLoader, openLoader } from '../redux/generalSlice';
import { getImagePath, isHistoricCenter, isImageContent, isTextContent } from '../utils/functions';
import Info from '../feature/info/interface/info';
import HistoricCenter from '../feature/historicCenter/interfaces/historicCenter';
import collections from '../constants/collections';
import getDocumentByID from '../utils/firebase/firestore/getDocumentByID';
import getData from '../utils/firebase/firestore/getData';
import Content, { ContentType } from '../interfaces/content';
import uploadImage from '../utils/uploadImage';
import validation from '../constants/validation';
import { addContent } from '../utils/content/addContentHelpers';

interface Props {
  id?: string;
  type: string;
  backButtonOnClick: () => void;
}

const useAddContent = ({ id, type, backButtonOnClick }: Props) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const [loading, setLoading] = useState<boolean>(true);
  const [object, setObject] = useState<HistoricCenter | Info[]>();

  useEffect(() => {
    const init = async () => {
      if (isHistoricCenter(type)) {
        const historicCenterResult: HistoricCenter = await getDocumentByID(collections.historicCenter, id ?? '');
        setObject(historicCenterResult);
      } else {
        const data: Info[] = await getData(collections.info);
        setObject(data && Array.isArray(data) && data.length > 0 ? data : []);
        setLoading(false);
      }
      setLoading(false);
    };
    init().then().catch((error) => {
      console.log(error);
      backButtonOnClick();
    });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      typeID: '',
      textSpanish: '',
      textEnglish: '',
      image: null,
      alt: '',
    },
    validationSchema: yup.object({
      typeID: yup
        .string()
        .required(formValidationStr[language.prefix].requiredField),
      textSpanish: yup
        .string()
        .optional(),
      textEnglish: yup
        .string()
        .optional(),
      alt: yup
        .string()
        .optional(),
      image: yup
        .mixed()
        .nullable()
        .optional()
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
    }),
    onSubmit: async (values) => {
      if (
        isImageContent(values.typeID) && (!values.image ||  values.alt === '') ||
        isTextContent(values.typeID) && (values.textEnglish === '' ||  values.textSpanish === '')
      ) {
        alert(formValidationStr[language.prefix].requiredFields);
        return;
      }
      try {
        dispatch(openLoader());
        if (isImageContent(values.typeID)) {
          if (values.image) {
            const image = await uploadImage(values.image, getImagePath(type, id));
            const newContent: Content = {
              type: values.typeID as ContentType,
              image,
              alt: values.alt,
            };
            await addContent(newContent, type, object, id ?? '');
            backButtonOnClick();
            return;
          } else {
            throw Error(formValidationStr[language.prefix].imageDontValid);
          }
        }
        const newContent: Content = {
          type: values.typeID as ContentType,
          text: {
            ES: {
              text: values.textSpanish,
            },
            EN: {
              text: values.textEnglish,
            },
          },
        };
        await addContent(newContent, type, object, id ?? '');
        backButtonOnClick();
      } catch (error: any) {
        console.log(error);
      } finally {
        dispatch(closeLoader());
      }
    },
  });

  return {
    loading,
    language,
    formik,
  };
};

export default useAddContent;
