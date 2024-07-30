import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../../app/store';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import RouteNames from '../../../constants/routeNames';
import formValidationStr from '../../../constants/formValidationStr';
import collections from '../../../constants/collections';
import validation from '../../../constants/validation';
import uploadImage from '../../../utils/uploadImage';
import updateDocumentByID from '../../../utils/firebase/firestore/updateDocumentByID';
import Content, { ContentType } from '../../../interfaces/content';
import { isImageContent, isTextContent } from '../../../utils/functions';
import Info from '../interface/info';
import getData from '../../../utils/firebase/firestore/getData';
import addDocument from '../../../utils/firebase/firestore/addDocument';

const useAddContentInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const [loading, setLoading] = useState<boolean>(true);
  const [infos, setInfos] = useState<Info[]>([]);

  const backToInfo = () => navigate(`/${RouteNames.info}`); 

  useEffect(() => {
    const init = async () => {
      const data: Info[] = await getData(collections.info);
      setInfos(data && Array.isArray(data) && data.length > 0 ? data : []);
      setLoading(false);
    };
    init().then().catch((error) => {
      console.log(error);
      backToInfo();
    });
  }, []);

  const addContent = async (content: Content) => {
    const newContent: Content = {
      ...content,
      id: uuidv4(),
    };
    if (infos.length === 0) {
      await addDocument(collections.info, {
        contents: [ newContent ],
      } as Info);
      return;
    }

    const info: Info = infos[0];
    let contentUpdated: Content[] = (info?.contents && Array.isArray(info?.contents))
      ? [ ...info.contents, newContent] : [ newContent ];
  
    await updateDocumentByID(
      collections.info,
      info.id,
      {
        contents: contentUpdated,
      }
    );
  };

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
            const image = await uploadImage(values.image, collections.info);
            const newContent: Content = {
              type: values.typeID as ContentType,
              image,
              alt: values.alt,
            };
            await addContent(newContent);
            backToInfo();
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
        addContent(newContent);
        backToInfo();
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
    backToInfo,
    formik,
  };
};

export default useAddContentInfo;
