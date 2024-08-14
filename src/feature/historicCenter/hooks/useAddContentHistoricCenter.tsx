import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import RouteNames from '../../../constants/routeNames';

const useAddContentHistoricCenter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const language = useSelector((state: RootState) => state.language.language);

  const backToContentHistoricCenter = () => navigate(`/${RouteNames.historicCenter}/${RouteNames.content}/${id}`); 
  
  return { id, language, backToContentHistoricCenter };
};

export default useAddContentHistoricCenter;
