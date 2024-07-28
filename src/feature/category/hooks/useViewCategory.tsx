import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import RouteNames from '../../../constants/routeNames';
import collections from '../../../constants/collections';
import getDocumentByID from '../../../utils/getDocumentByID';
import Category from '../interfaces/category';
import deleteDocumentByID from '../../../utils/deleteDocumentByID';

const useViewCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<Category>();

  const goCategory = () => navigate(`/${RouteNames.admin}/${RouteNames.category}`);

  const deleteCategory = () => {
    dispatch(openLoader());
    deleteDocumentByID(collections.category, id ?? '')
      .catch((error: any) => console.log(error))
      .finally(() => {
        dispatch(closeLoader());
        goCategory();
      });
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
    deleteCategory,
    loading,
    category,
  };
};

export default useViewCategory;
