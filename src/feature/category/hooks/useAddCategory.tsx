import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import RouteNames from '../../../constants/routeNames';

const useAddCategory = () => {
  const navigate = useNavigate();
  const language = useSelector((state: RootState) => state.language.language);

  const goCategory = () => navigate(`/${RouteNames.admin}/${RouteNames.category}`);
  
  return {
    language,
    goCategory,
  };
};

export default useAddCategory;
