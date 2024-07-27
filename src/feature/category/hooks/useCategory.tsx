import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import RouteNames from '../../../constants/routeNames';

const useCategory = () => {
  const navigate = useNavigate();
  const language = useSelector((state: RootState) => state.language.language);
  
  const goAddCategory = () => navigate(`/${RouteNames.admin}/${RouteNames.category}/${RouteNames.add}`);

  return {
    language,
    goAddCategory,
  };
};

export default useCategory;
