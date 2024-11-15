import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import RouteNames from '../../../constants/routeNames';
import collections from '../../../constants/collections';
import getDocumentByID from '../../../utils/firebase/firestore/getDocumentByID';
import Category from '../interfaces/category';
import deleteDocumentByID from '../../../utils/firebase/firestore/deleteDocumentByID';
import deleteFile from '../../../utils/firebase/storage/deleteFile';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../app/firebase';
import viewCategoryStr from '../constants/viewCategoryStr';
import { getDeleteTitle } from '../../../utils/functions';

const useViewCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<Category>();

  const goCategory = () => navigate(`/${RouteNames.admin}/${RouteNames.category}`);

  const goEditCategory = () => navigate(`/${RouteNames.admin}/${RouteNames.category}/${RouteNames.edit}/${id ?? ''}`);

  const deleteCategory = async () => {
    const isConfirmed = confirm(getDeleteTitle(language.prefix, category?.text[language.prefix].name ?? ''));
    if (!isConfirmed) return;
  
    dispatch(openLoader());
    try {
      const q = query(collection(db, collections.historicCenter), where('category.id', '==', id));
      const querySnapshot = await getDocs(q);
      if ( querySnapshot.docs.length > 0) {
        alert(viewCategoryStr[language.prefix].errorMessageHistoricCenter);
        return;
      }
      await deleteFile(category?.image.ref ?? '');
      await deleteDocumentByID(collections.category, id ?? '');
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(closeLoader());
      goCategory();
    }
  };

  useEffect(() => {
    const init = async () => {
      const category: Category = await getDocumentByID(collections.category, id ?? '');
      setCategory(category);
      setLoading(false);
    };
    init().catch((error) => {
      console.log(error);
      goCategory();
    });
  }, []);
  
  return {
    language,
    goCategory,
    goEditCategory,
    deleteCategory,
    loading,
    category,
  };
};

export default useViewCategory;
