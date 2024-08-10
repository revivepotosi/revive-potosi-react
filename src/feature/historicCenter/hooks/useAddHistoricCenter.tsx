import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RootState } from '../../../app/store';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import RouteNames from '../../../constants/routeNames';
import formValidationStr from '../../../constants/formValidationStr';
import collections from '../../../constants/collections';
import validation from '../../../constants/validation';
import HistoricCenter from '../interfaces/historicCenter';
import uploadImage from '../../../utils/uploadImage';
import addDocument from '../../../utils/firebase/firestore/addDocument';
import getData from '../../../utils/firebase/firestore/getData';
import Category from '../../category/interfaces/category';
import useFormMap from '../../../hooks/useFormMap';
import maps from '../../../constants/maps';

const useAddHistoricCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const goHistoricCenter = () => navigate(RouteNames.index); 

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nameSpanish: '',
      nameEnglish: '',
      categoryID: '',
      image: null,
      position: maps.defaultPosition,
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
    }),
    onSubmit: async (values) => {
      try {
        if (!values.image) throw Error(formValidationStr[language.prefix].imageDontValid);
        dispatch(openLoader());
        const image = await uploadImage(values.image, collections.historicCenter);
        const categorySelected = categories.find((category: Category) => category.id === values.categoryID);
        const newHistoricCenter: HistoricCenter = {
          text: {
            ES: {
              name: values.nameSpanish,
            },
            EN: {
              name: values.nameEnglish,
            },
          },
          image: image,
          category: {
            id: categorySelected?.id ?? '',
            text: categorySelected?.text ?? {},
          },
          position: values.position,
        };
        await addDocument(collections.historicCenter, newHistoricCenter);
        goHistoricCenter();
      } catch (error: any) {
        console.log(error);
      } finally {
        dispatch(closeLoader());
      }
    },
  });

  const {
    markerRef,
    actionRef,
    eventMarkerHandlers,
    currentPositionLoading,
    changeCenter,
  } = useFormMap({ field: 'position', setFieldValue: formik.setFieldValue });

  useEffect(() => {
    const init = async () => {
      const data: Category[] = await getData(collections.category);
      setCategories(data);
      setLoading(false);
    };
    init().then().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    changeCenter(formik.values.position)
  }, [formik.values.position]);
  
  return {
    loading,
    language,
    categories,
    goHistoricCenter,
    formik,
    markerRef,
    actionRef,
    eventMarkerHandlers,
    currentPositionLoading,
  };
};

export default useAddHistoricCenter;
