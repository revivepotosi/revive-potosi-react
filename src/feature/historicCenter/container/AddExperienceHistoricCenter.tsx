import AddExperience from '../../../components/addExperience/AddExperience';
import useAddExperienceHistoricCenter from '../hooks/useAddExperienceHistoricCenter';

const AddExperienceHistoricCenter = () => {
  const {
    id,
    goManageExperienceHistoricCenter,
  } = useAddExperienceHistoricCenter();
  return (
    <AddExperience historicCenterID={id ?? ''} onBack={goManageExperienceHistoricCenter} />
  );
};

export default AddExperienceHistoricCenter;
