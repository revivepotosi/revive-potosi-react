import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import RouteNames from '../../../constants/routeNames';
import collections from '../../../constants/collections';
import Info from '../interface/info';
import getData from '../../../utils/firebase/firestore/getData';

const useInfo = () => {
  const navigate = useNavigate();
  const language = useSelector((state: RootState) => state.language.language);
  const [loading, setLoading] = useState<boolean>(true);
  const [infos, setInfos] = useState<Info[]>([]);

  const goHome = () => navigate(RouteNames.index);
  const goManageContent = () => navigate(`/${RouteNames.admin}/${RouteNames.info}/${RouteNames.content}/${RouteNames.manage}`);

  useEffect(() => {
    const init = async () => {
      const data: Info[] = await getData(collections.info);
      setInfos(data && Array.isArray(data) && data.length > 0 ? data : []);
      console.log(data);
      setLoading(false);
    };
    init().catch((error) => {
      console.log(error);
      goHome();
    });
  }, []);

  return {
    language,
    loading,
    infos,
    goManageContent,
  };
};

export default useInfo;
