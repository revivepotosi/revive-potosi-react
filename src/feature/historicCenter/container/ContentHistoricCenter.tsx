import { Alert, Box, Button, Typography } from '@mui/material';
import CardContainerSkeleton from '../../../components/cardContainer/CardContainerSkeleton';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import GeneralContainerSkeleton from '../../../components/generalContainer/GeneralContainerSkeleton';
import ButtonSkeleton from '../../../components/skeleton/ButtonSkeleton';
import contentHistoricCenterStr from '../constants/contentHistoricCenterStr';
import useContentHistoricCenter from '../hooks/useContentHistoricCenter';
import CardContainer from '../../../components/cardContainer/CardContainer';
import colors from '../../../style/colors';
import Content from '../../../components/content/Content';
import { isImageContent, isTextContent } from '../../../utils/functions';
import formStr from '../../../constants/formStr';
import ViewMap from '../../../components/viewMap/ViewMap';
import maps from '../../../constants/maps';

interface Props {
  isAdmin?: boolean;
};

const ContentHistoricCenter = ({ isAdmin = false }: Props) => {
  const {
    language,
    loading,
    historicCenter,
    backToHistoricCenters,
    goViewHistoricCenter,
    goManageContentHistoricCenter,
    goManageExperienceHistoricCenter,
  } = useContentHistoricCenter();

  if (loading) return (
    <GeneralContainerSkeleton hasBackButton>
      <>
        { isAdmin ? ( <ButtonSkeleton /> ) : null }
        <CardContainerSkeleton />
      </>
    </GeneralContainerSkeleton>
  );

  const renderContent = (contents: any[]) => contents.map((content) => (
    <Content
      key={content.id}
      type={content.type}
      text={isTextContent(content.type) ? content?.text[language.prefix].text : undefined}
      imageSrc={isImageContent(content.type) ? content.image.url : undefined}
      alt={isImageContent(content.type) ? content.alt : undefined}
    />
  ));

  return (
    <GeneralContainer
      title={contentHistoricCenterStr[language.prefix].title}
      backButton={{
        title: contentHistoricCenterStr[language.prefix].backButton,
        onClick: backToHistoricCenters,
      }}
    >
      <>
        { isAdmin ? (
          <Box sx={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
            <Button variant="contained" onClick={goManageContentHistoricCenter} sx={{ marginRight: '0.5rem' }}>
              {contentHistoricCenterStr[language.prefix].manageContent}
            </Button>
            <Button variant="contained" color="secondary" onClick={goManageExperienceHistoricCenter} sx={{ marginRight: '0.5rem' }}>
              {contentHistoricCenterStr[language.prefix].manageExperience}
            </Button>
            <Button variant="outlined" onClick={goViewHistoricCenter}>
              {contentHistoricCenterStr[language.prefix].viewButton}
            </Button>
          </Box>
        ) : null}
        <CardContainer sx={{ marginTop: '1rem'}}>
          <>
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: colors.primary }}>
              {historicCenter?.text[language.prefix].name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: colors.primary }}>
              {historicCenter?.category.text[language.prefix].name}
            </Typography>
            {
              !(historicCenter?.contents) || (Array.isArray(historicCenter.contents) && historicCenter.contents.length === 0) ?
              (
                <Alert variant="filled" severity="info" sx={{ marginY: '0.5rem' }}>
                  { contentHistoricCenterStr[language.prefix].emptyMessage }
                </Alert>
              ) :  renderContent(historicCenter.contents)
            }
            <Typography variant="subtitle2" gutterBottom sx={{ color: colors.primary }}>
              {formStr[language.prefix].location}
            </Typography>
            <ViewMap position={historicCenter?.position ?? maps.defaultPosition}/>
          </>
        </CardContainer>
      </>
    </GeneralContainer>
  );
};

export default ContentHistoricCenter;
