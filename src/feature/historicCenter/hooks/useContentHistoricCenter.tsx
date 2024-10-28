import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import HistoricCenter from '../interfaces/historicCenter';
import RouteNames from '../../../constants/routeNames';
import collections from '../../../constants/collections';
import getDocumentByID from '../../../utils/firebase/firestore/getDocumentByID';

const useContentHistoricCenter = () => {
  const navigate = useNavigate();
  const language = useSelector((state: RootState) => state.language.language);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [historicCenter, setHistoricCenter] = useState<HistoricCenter>();

  const backToHistoricCenters = () => navigate(RouteNames.index);
  const goViewHistoricCenter = () => navigate(`/${RouteNames.admin}/${RouteNames.historicCenter}/${id}`);
  const goManageContentHistoricCenter =
    () => navigate(`/${RouteNames.admin}/${RouteNames.historicCenter}/${RouteNames.content}/${RouteNames.manage}/${id}`);

  useEffect(() => {
    const init = async () => {
      const historicCenter: HistoricCenter = await getDocumentByID(collections.historicCenter, id ?? '');
      setHistoricCenter(historicCenter);
      setLoading(false);
    };
    init().catch((error) => {
      console.log(error);
      backToHistoricCenters();
    });
  }, []);

  return {
    language,
    loading,
    historicCenter,
    backToHistoricCenters,
    goViewHistoricCenter,
    goManageContentHistoricCenter,
  };
};

export default useContentHistoricCenter;
