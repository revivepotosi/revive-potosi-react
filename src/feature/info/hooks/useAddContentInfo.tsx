import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import RouteNames from '../../../constants/routeNames';

const useAddContentInfo = () => {
  const navigate = useNavigate();
  const language = useSelector((state: RootState) => state.language.language);
  const backToManageContent = () => navigate(`/${RouteNames.admin}/${RouteNames.info}/${RouteNames.content}/${RouteNames.manage}`); 
  
  return {
    language,
    backToManageContent,
  };
};

export default useAddContentInfo;
