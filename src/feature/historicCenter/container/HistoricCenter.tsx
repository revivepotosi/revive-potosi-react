import useHistoricCenter from '../hooks/useHistoricCenter';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import { Button } from '@mui/material';
import historicCenterStr from '../constants/historicCenterStr';
import ImageBackgroundGroup from '../../../components/imageBackgroundGroup/ImageBackgroundGroup';
import GeneralContainerSkeleton from '../../../components/generalContainer/GeneralContainerSkeleton';
import ButtonSkeleton from '../../../components/skeleton/ButtonSkeleton';
import ImageBackgroundGroupSkeleton from '../../../components/imageBackgroundGroup/ImageBackgroundGroupSkeleton';

interface Props {
    isAdmin?: boolean;
};

const HistoricCenter = ({ isAdmin = false }: Props) => {
  const { language, goAddHistoricCenter, goViewHistoricCenter, loading, historicCenters } = useHistoricCenter();

  if (loading) return (
    <GeneralContainerSkeleton>
      <>
        { isAdmin ? ( <ButtonSkeleton /> ) : null }
        <ImageBackgroundGroupSkeleton />
      </>
    </GeneralContainerSkeleton>
  );

  return (
    <GeneralContainer title={historicCenterStr[language.prefix].title}>
      <>
        { isAdmin ? (
          <Button variant="contained" onClick={goAddHistoricCenter}>
            {historicCenterStr[language.prefix].addButton}
          </Button>
        ) : null}
        <ImageBackgroundGroup items={historicCenters} onClick={goViewHistoricCenter} emptyMessage={historicCenterStr[language.prefix].emptyMessage} />
      </>
    </GeneralContainer>
  );
};

export default HistoricCenter;
