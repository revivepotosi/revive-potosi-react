import { useNavigate, useParams } from 'react-router-dom';
import RouteNames from '../../../constants/routeNames';

const useAddExperienceHistoricCenter = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const goManageExperienceHistoricCenter =
    () => navigate(`/${RouteNames.admin}/${RouteNames.historicCenter}/${RouteNames.experience}/${RouteNames.manage}/${id}`);

  return {
    id,
    goManageExperienceHistoricCenter,
  };
};

export default useAddExperienceHistoricCenter;
