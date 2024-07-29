import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import RouteNames from '../../../constants/routeNames';
import Category from '../interfaces/category';
import getData from '../../../utils/firebase/firestore/getData';
import collections from '../../../constants/collections';

const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const language = useSelector((state: RootState) => state.language.language);

  const goAddCategory = () => navigate(`/${RouteNames.admin}/${RouteNames.category}/${RouteNames.add}`);
  const goViewCategory = (id: string) => () => navigate(`/${RouteNames.admin}/${RouteNames.category}/${id}`);

  useEffect(() => {
    const init = async () => {
      const data: Category[] = await getData(collections.category);
      setCategories(data);
      setLoading(false);
    };
    init().then().catch((error) => console.log(error));
  }, []);
  return {
    language,
    loading,
    goAddCategory,
    goViewCategory,
    categories,
  };
};

export default useCategory;
