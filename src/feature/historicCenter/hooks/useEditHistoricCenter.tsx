import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RootState } from '../../../app/store';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import uploadImage from '../../../utils/uploadImage';
import getDocumentByID from '../../../utils/firebase/firestore/getDocumentByID';
import RouteNames from '../../../constants/routeNames';
import collections from '../../../constants/collections';
import formValidationStr from '../../../constants/formValidationStr';
import deleteFile from '../../../utils/firebase/storage/deleteFile';
import updateDocumentByID from '../../../utils/firebase/firestore/updateDocumentByID';
import validation from '../../../constants/validation';
import HistoricCenter from '../../historicCenter/interfaces/historicCenter';
import EditHistoricCenter from '../interfaces/editHistoricCenter';
import Category from '../../category/interfaces/category';
import getData from '../../../utils/firebase/firestore/getData';
import maps from '../../../constants/maps';
import useFormMap from '../../../hooks/useFormMap';

const useEditHistoricCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [historicCenter, setHistoricCenter] = useState<HistoricCenter>();
  const [categories, setCategories] = useState<Category[]>([]);

  const backViewHistoricCenter = () => navigate(`/${RouteNames.admin}/${RouteNames.historicCenter}/${id}`);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nameSpanish: historicCenter?.text.ES.name ?? '',
      nameEnglish: historicCenter?.text.EN.name ?? '',
      categoryID: historicCenter?.category?.id ?? '',
      image: null,
      position: historicCenter?.position ?? maps.defaultPosition,
    },
    validationSchema: yup.object({
      nameSpanish: yup
        .string()
        .required(formValidationStr[language.prefix].requiredField),
      nameEnglish: yup
        .string()
        .required(formValidationStr[language.prefix].requiredField),
      categoryID: yup
        .string()
        .required(formValidationStr[language.prefix].requiredField),
      image: yup
        .mixed()
        .nullable()
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
      try {
        dispatch(openLoader());
        const categorySelected = categories.find((category: Category) => category.id === values.categoryID);
    
        if (values.image) {
          await deleteFile(historicCenter?.image.ref ?? '');
          const editedImage = await uploadImage(values.image, collections.historicCenter);
          const editedHistoricCenterWithImage: EditHistoricCenter = {
            text: {
              ES: {
                name: values.nameSpanish,
              },
              EN: {
                name: values.nameEnglish,
              },
            },
            image: editedImage,
            category: {
              id: categorySelected?.id ?? '',
              text: categorySelected?.text ?? {},
            },
            position: values.position ?? maps.defaultPosition,
          };
          await updateDocumentByID(collections.historicCenter, id ?? '', editedHistoricCenterWithImage);
          return;
        };
        
        const editHistoricCenter: EditHistoricCenter = {
          text: {
            ES: {
              name: values.nameSpanish,
            },
            EN: {
              name: values.nameEnglish,
            },
          },
          category: {
            id: categorySelected?.id ?? '',
            text: categorySelected?.text ?? {},
          },
          position: values.position ?? maps.defaultPosition,
        };
        await updateDocumentByID(collections.historicCenter, id ?? '', editHistoricCenter);
      } catch (error: any) {
        console.log(error);
      } finally {
        dispatch(closeLoader());
        backViewHistoricCenter();
      }
    },
  });

  const {
    markerRef,
    actionRef,
    eventMarkerHandlers,
    changeCenter,
  } = useFormMap({ field: 'position', setFieldValue: formik.setFieldValue, hasInitialPosition: true });

  useEffect(() => {
    const init = async () => {
      const historicCenter: HistoricCenter = await getDocumentByID(collections.historicCenter, id ?? '');
      const data: Category[] = await getData(collections.category);
      setCategories(data);
      setHistoricCenter(historicCenter);
      setLoading(false);
    };
    init().catch((error) => {
      console.log(error);
      backViewHistoricCenter();
    });
  }, []);

  useEffect(() => {
    changeCenter(formik.values.position)
  }, [formik.values.position]);

  return {
    language,
    loading,
    backViewHistoricCenter,
    historicCenter,
    categories,
    formik,
    markerRef,
    actionRef,
    eventMarkerHandlers,
  };
};

export default useEditHistoricCenter;
