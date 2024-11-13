import { useNavigate } from 'react-router-dom';
import RouteNames from '../../../constants/routeNames';

const useManageContentInfo = () => {
  const navigate = useNavigate();

  const onBack = () => navigate(`/${RouteNames.info}`);
  const onAddContent = () => navigate(`/${RouteNames.admin}/${RouteNames.info}/${RouteNames.content}/${RouteNames.add}`);

  return {
    onBack,
    onAddContent,
  };
};

export default useManageContentInfo;
