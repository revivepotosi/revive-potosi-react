import { Button } from '@mui/material';
import CardContainerSkeleton from '../../../components/cardContainer/CardContainerSkeleton';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import GeneralContainerSkeleton from '../../../components/generalContainer/GeneralContainerSkeleton';
import ButtonSkeleton from '../../../components/skeleton/ButtonSkeleton';
import manageExperienceHistoricCenterStr from '../constants/manageExperienceHistoricCenterStr';
import ExperienceTable from '../../../components/experienceTable/ExperienceTable';
import useManageExperienceHistoricCenter from '../hooks/useManageExperienceHistoricCenter';

const ManageExperienceHistoricCenter = () => {
  const {
    language,
    loading,
    goToAddExperience,
    experiences,
    goContentHistoricCenter,
    onDelete,
  } = useManageExperienceHistoricCenter();

  if (loading) return (
    <GeneralContainerSkeleton hasBackButton>
      <>
        <ButtonSkeleton /> 
        <CardContainerSkeleton />
      </>
    </GeneralContainerSkeleton>
  );
  return (
    <GeneralContainer
      title={manageExperienceHistoricCenterStr[language.prefix].title}
      backButton={{
        title: manageExperienceHistoricCenterStr[language.prefix].backButton,
        onClick: goContentHistoricCenter,
      }}
    >
      <>
        <Button variant="contained" onClick={goToAddExperience}>
          {manageExperienceHistoricCenterStr[language.prefix].addButton}
        </Button>
        <ExperienceTable
          experiences={experiences}
          emptyMessage={manageExperienceHistoricCenterStr[language.prefix].emptyMessage}
          onDelete={onDelete}
        />
      </>
    </GeneralContainer>
  );
};

export default ManageExperienceHistoricCenter;
