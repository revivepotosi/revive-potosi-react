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
import Category from '../interfaces/category';
import EditCategory from '../interfaces/editCategory';
import deleteFile from '../../../utils/firebase/storage/deleteFile';
import updateDocumentByID from '../../../utils/firebase/firestore/updateDocumentByID';

const useEditCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<Category>();

  const backCategory = () => navigate(`/${RouteNames.admin}/${RouteNames.category}/${id ?? ''}`);

  useEffect(() => {
    const init = async () => {
      const category: Category = await getDocumentByID(collections.category, id ?? '');
      setCategory(category);
      setLoading(false);
    };
    init().catch((error) => {
      console.log(error);
      navigate(`/${RouteNames.admin}/${RouteNames.category}`)
    });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nameSpanish: category?.text.ES.name ?? '',
      nameEnglish: category?.text.EN.name ?? '',
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
        .nullable()
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

        if (values.image) {
          await deleteFile(category?.image.ref ?? '');
          const editedImage = await uploadImage(values.image, collections.category);
          const editedCategoryWithImage: EditCategory = {
            text: {
              ES: {
                name: values.nameSpanish,
              },
              EN: {
                name: values.nameEnglish,
              },
            },
            image: editedImage,
          };
          await updateDocumentByID(collections.category, id ?? '', editedCategoryWithImage);
          return;
        };
        
        const editedCategory: EditCategory = {
          text: {
            ES: {
              name: values.nameSpanish,
            },
            EN: {
              name: values.nameEnglish,
            },
          },
        };
        await updateDocumentByID(collections.category, id ?? '', editedCategory);
      } catch (error: any) {
        console.log(error);
      } finally {
        dispatch(closeLoader());
        backCategory();
      }
    },
  });
  return {
    language,
    loading,
    backCategory,
    category,
    formik,
  };
};

export default useEditCategory;
