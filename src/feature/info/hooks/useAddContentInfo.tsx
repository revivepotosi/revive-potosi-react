import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import RouteNames from '../../../constants/routeNames';

const useAddContentInfo = () => {
  const navigate = useNavigate();
  const language = useSelector((state: RootState) => state.language.language);
  const backToInfo = () => navigate(`/${RouteNames.info}`); 
  
  return {
    language,
    backToInfo,
  };
};

export default useAddContentInfo;
