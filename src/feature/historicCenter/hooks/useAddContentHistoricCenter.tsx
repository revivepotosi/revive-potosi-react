import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../../app/store';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import RouteNames from '../../../constants/routeNames';
import formValidationStr from '../../../constants/formValidationStr';
import collections from '../../../constants/collections';
import validation from '../../../constants/validation';
import HistoricCenter from '../interfaces/historicCenter';
import uploadImage from '../../../utils/uploadImage';
import getDocumentByID from '../../../utils/firebase/firestore/getDocumentByID';
import updateDocumentByID from '../../../utils/firebase/firestore/updateDocumentByID';
import Content, { ContentType } from '../../../interfaces/content';
import { isImageContent, isTextContent } from '../../../utils/functions';

const useAddContentHistoricCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [historicCenter, setHistoricCenter] = useState<HistoricCenter>();

  const backToContentHistoricCenter = () => navigate(`/${RouteNames.historicCenter}/${RouteNames.content}/${id}`); 

  useEffect(() => {
    const init = async () => {
      const historicCenterResult: HistoricCenter = await getDocumentByID(collections.historicCenter, id ?? '');
      setHistoricCenter(historicCenterResult);
      setLoading(false);
    };
    init().then().catch((error) => {
      console.log(error);
      backToContentHistoricCenter();
    });
  }, []);

  const addContent = async (content: Content) => {
    const newContent: Content = {
      ...content,
      id: uuidv4(),
    };
    let contentUpdated: Content[] = (historicCenter?.contents && Array.isArray(historicCenter?.contents))
      ? [ ...historicCenter.contents, newContent] : [ newContent ];
    await updateDocumentByID(
      collections.historicCenter,
      id ?? '',
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
      if (isImageContent(values.typeID) && (!values.image ||  values.alt === '')) {
        alert(formValidationStr[language.prefix].requiredFields);
        return;
      } else if (isTextContent(values.typeID) && (values.textEnglish === '' ||  values.textSpanish === '')) {
        alert(formValidationStr[language.prefix].requiredFields);
        return;
      }
      try {
        dispatch(openLoader());
        if (isImageContent(values.typeID)) {
          if (values.image) {
            const image = await uploadImage(values.image, `${collections.historicCenter}/content/${id}`);
            const newContent: Content = {
              type: values.typeID as ContentType,
              image,
              alt: values.alt,
            };
            await addContent(newContent);
            backToContentHistoricCenter();
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
        backToContentHistoricCenter();
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
    backToContentHistoricCenter,
    formik,
  };
};

export default useAddContentHistoricCenter;
