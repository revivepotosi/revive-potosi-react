import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';
import RouteNames from '../../../constants/routeNames';
import { useEffect, useState } from 'react';
import Experience from '../../../interfaces/Experiences';
import collections from '../../../constants/collections';
import getExperiences from '../../../utils/getExperiences';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import deleteDocumentByID from '../../../utils/firebase/firestore/deleteDocumentByID';
import deleteFile from '../../../utils/firebase/storage/deleteFile';
import { getDeleteTitle } from '../../../utils/functions';

const useManageExperienceHistoricCenter = () => {
  const language = useSelector((state: RootState) => state.language.language);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  
  const goToAddExperience = () => navigate(`/${RouteNames.admin}/${RouteNames.historicCenter}/${RouteNames.experience}/${RouteNames.add}/${id}`);
  const goContentHistoricCenter = () => navigate(`/${RouteNames.historicCenter}/${RouteNames.content}/${id}`);
  
  useEffect(() => {
    const init = async () => {
      const data: Experience[] = await getExperiences(id ?? '');
      setExperiences(data);
      setLoading(false);
    };
    init().then().catch((error) => {
      console.log(error);
      goContentHistoricCenter();
    });
  }, []);

  const onDelete = (experience: Experience) => async () => {
    const isConfirmed = confirm(getDeleteTitle(language.prefix, experience.text[language.prefix].name));
    if (!isConfirmed) return;
    try {
      dispatch(openLoader());
      const experienceID = experience.id ?? '';
      await deleteFile(experience.activator.ref);
      await deleteFile(experience.model.ref);
      await deleteDocumentByID(collections.experience, experienceID);
      setExperiences((experiences) => experiences.filter((experience) => experience.id !== experienceID));
    } catch(error) {
      console.log(error);
    } finally {
      dispatch(closeLoader());
    };
  };

  return {
    language,
    loading,
    goToAddExperience,
    experiences,
    goContentHistoricCenter,
    onDelete,
  };
};

export default useManageExperienceHistoricCenter;
