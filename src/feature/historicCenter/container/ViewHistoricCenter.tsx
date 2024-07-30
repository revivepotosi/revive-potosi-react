import { Box, Button, Typography } from '@mui/material';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import SimpleFormSkeleton from '../../../components/simpleFormSkeleton/SimpleFormSkeleton';
import { getBackTo, getViewField, getViewMediaField } from '../../../utils/functions';
import formStr from '../../../constants/formStr';
import buttonsStr from '../../../constants/buttonsStr';
import CardContainer from '../../../components/cardContainer/CardContainer';
import Image from '../../../components/image/Image';
import useViewHistoricCenter from '../hooks/useViewHistoricCenter';
import contentHistoricCenterStr from '../constants/contentHistoricCenterStr';

const ViewHistoricCenter = () => {
  const {
    language,
    goEditHistoricCenter,
    backToContentHistoricCenter,
    deleteHistoricCenter,
    loading,
    historicCenter,
  } = useViewHistoricCenter();
  if (loading ) return <SimpleFormSkeleton />;
  return (
    <GeneralContainer
      title={historicCenter?.text[language.prefix].name ?? ''}
      backButton={{
        title: getBackTo(language.prefix, contentHistoricCenterStr[language.prefix].title),
        onClick: backToContentHistoricCenter,
      }}
    >
      <>
        <Box
          display="flex"
          gap="0.5rem"
        >
          <Button variant="contained" onClick={goEditHistoricCenter}>
            {buttonsStr[language.prefix].edit}
          </Button>
          <Button variant="contained" color="error" onClick={deleteHistoricCenter}>
            {buttonsStr[language.prefix].delete}
          </Button>
        </Box>
        <CardContainer sx={{ marginTop: '1rem' }}>
          <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <Box>
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                {formStr[language.prefix].spanishTexts}
              </Typography>
              <Typography variant='body1'>
                {getViewField(formStr[language.prefix].name, historicCenter?.text.ES.name ?? '')}
              </Typography>
            </Box>
            <Box>
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                {formStr[language.prefix].englishTexts}
              </Typography>
              <Typography variant='body1'>
                {getViewField(formStr[language.prefix].name, historicCenter?.text.EN.name ?? '')}
              </Typography>
            </Box>
            <Box>
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                {formStr[language.prefix].general}
              </Typography>
              <Typography variant='body1' gutterBottom>
                {getViewField(formStr[language.prefix].category, historicCenter?.category.text[language.prefix].name ?? '')}
              </Typography>
              <Typography variant='body1' gutterBottom>
                {getViewMediaField(formStr[language.prefix].image)}
              </Typography>
              <Image src={historicCenter?.image.url ?? ''} alt={`${historicCenter?.text[language.prefix].name ?? ''} historic center backgroud`} />
            </Box>
          </Box>
        </CardContainer>
      </>
    </GeneralContainer>
  );
};

export default ViewHistoricCenter;
