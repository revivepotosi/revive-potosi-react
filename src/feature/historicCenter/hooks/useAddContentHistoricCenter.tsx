import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import RouteNames from '../../../constants/routeNames';

const useAddContentHistoricCenter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const language = useSelector((state: RootState) => state.language.language);

  const backToManageContentHistoricCenter =
    () => navigate(`/${RouteNames.admin}/${RouteNames.historicCenter}/${RouteNames.content}/${RouteNames.manage}/${id}`); 
  
  return { id, language, backToManageContentHistoricCenter };
};

export default useAddContentHistoricCenter;
