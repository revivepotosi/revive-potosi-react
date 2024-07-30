import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import getData from '../../../utils/firebase/firestore/getData';
import HistoricCenter from '../interfaces/historicCenter';
import RouteNames from '../../../constants/routeNames';
import collections from '../../../constants/collections';


const useHistoricCenter = () => {
  const navigate = useNavigate();
  const language = useSelector((state: RootState) => state.language.language);
  const [loading, setLoading] = useState<boolean>(true);
  const [historicCenters, setHistoricCenters] = useState<HistoricCenter[]>([]);

  const goAddHistoricCenter = () => navigate(`/${RouteNames.admin}/${RouteNames.historicCenter}/${RouteNames.add}`);
  const goContentHistoricCenter =
    (id: string) =>
      () =>
        navigate(`/${RouteNames.historicCenter}/${RouteNames.content}/${id}`);

  useEffect(() => {
    const init = async () => {
      const data: HistoricCenter[] = await getData(collections.historicCenter);
      setHistoricCenters(data);
      setLoading(false);
    };
    init().then().catch((error) => console.log(error));
  }, []);

  return {
    language,
    goAddHistoricCenter,
    goContentHistoricCenter,
    loading,
    historicCenters,
  };
};

export default useHistoricCenter;
