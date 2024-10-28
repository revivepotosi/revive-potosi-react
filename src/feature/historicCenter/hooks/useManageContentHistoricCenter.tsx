import { useNavigate, useParams } from 'react-router-dom';
import RouteNames from '../../../constants/routeNames';

const useManageContentHistoricCenter = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onBack = () => navigate(`/${RouteNames.historicCenter}/${RouteNames.content}/${id}`);
  const onAddContent = () => navigate(`/${RouteNames.admin}/${RouteNames.historicCenter}/${RouteNames.content}/${RouteNames.add}/${id}`);

  return {
    id,
    onBack,
    onAddContent,
  };
};

export default useManageContentHistoricCenter;
