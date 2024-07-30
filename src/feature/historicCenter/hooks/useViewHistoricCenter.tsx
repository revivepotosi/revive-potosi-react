import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import RouteNames from '../../../constants/routeNames';
import collections from '../../../constants/collections';
import getDocumentByID from '../../../utils/firebase/firestore/getDocumentByID';
import deleteDocumentByID from '../../../utils/firebase/firestore/deleteDocumentByID';
import deleteFile from '../../../utils/firebase/storage/deleteFile';
import { getDeleteTitle, isImageContent } from '../../../utils/functions';
import HistoricCenter from '../interfaces/historicCenter';

const useViewHistoricCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [historicCenter, setHistoricCenter] = useState<HistoricCenter>();

  const backToContentHistoricCenter = () => navigate(`/${RouteNames.historicCenter}/${RouteNames.content}/${id}`);
  const backToHistoricCenters = () => navigate(RouteNames.index);
  const goEditHistoricCenter = () => navigate(`/${RouteNames.admin}/${RouteNames.historicCenter}/${RouteNames.edit}/${id}`);

  const deleteHistoricCenter = async () => {
    const isConfirmed = confirm(getDeleteTitle(language.prefix, historicCenter?.text[language.prefix].name ?? ''));
    if (!isConfirmed) return;
  
    dispatch(openLoader());
    try {
      if(historicCenter?.contents && Array.isArray(historicCenter.contents)) {
        for(const content of historicCenter.contents) {
          if (isImageContent(content.type)) {
            await deleteFile(content?.image?.ref ?? '');
          };
        }
      };
      await deleteFile(historicCenter?.image.ref ?? '');
      await deleteDocumentByID(collections.historicCenter, id ?? '');
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(closeLoader());
      backToHistoricCenters();
    }
  };

  useEffect(() => {
    const init = async () => {
      const historicCenter: HistoricCenter = await getDocumentByID(collections.historicCenter, id ?? '');
      setHistoricCenter(historicCenter);
      setLoading(false);
    };
    init().catch((error) => {
      console.log(error);
      backToContentHistoricCenter();
    });
  }, []);
  
  return {
    language,
    goEditHistoricCenter,
    backToContentHistoricCenter,
    deleteHistoricCenter,
    loading,
    historicCenter,
  };
};

export default useViewHistoricCenter;
