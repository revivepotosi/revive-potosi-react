import { Box, Button, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import ViewCategorySkeleton from '../components/ViewCategorySkeleton';
import useViewCategory from '../hooks/useViewCategory';
import { getViewField } from '../../../utils/functions';
import formStr from '../../../constants/formStr';
import viewCategoryStr from '../constants/viewCategoryStr';
import buttonsStr from '../../../constants/buttonsStr';

const ViewCategory = () => {
  const { language, goCategory, deleteCategory, loading, category } = useViewCategory();
  if (loading ) return <ViewCategorySkeleton />;
  return (
    <GeneralContainer
      title={category?.text[language.prefix].name ?? ''}
      backButton={{
        title: viewCategoryStr[language.prefix].backButton,
        onClick: goCategory,
        icon: <ArrowBackIcon />,
      }}
    >
      <>
        <Box
          display="flex"
          gap="0.5rem"
        >
          <Button variant="contained">
            {buttonsStr[language.prefix].edit}
          </Button>
          <Button variant="contained" color="error" onClick={deleteCategory}>
            {buttonsStr[language.prefix].delete}
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1, marginTop: '1rem' }}>
          <Grid
            container
            spacing={2}
            columns={{ xs: 2, sm: 4, md: 6 }}
            sx={{ paddingBottom: '1rem'}}
          >
            <Grid item xs={2} sm={4} md={6}>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {formStr[language.prefix].spanishTexts}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body1'>
                {getViewField(formStr[language.prefix].name, category?.text.ES.name ?? '')}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={6}>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {formStr[language.prefix].englishTexts}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body1'>
                {getViewField(formStr[language.prefix].name, category?.text.EN.name ?? '')}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={6}>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {formStr[language.prefix].general}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body1'>
                <img
                  src={category?.image.url ?? ''}
                  width="100%"
                  style={{ borderRadius: '0.25rem' }}
                  alt={`${category?.text[language.prefix].name ?? ''} category backgroud`}
                />
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </>
    </GeneralContainer>
  );
};

export default ViewCategory;
