import { Box, Button, Typography } from '@mui/material';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import ViewCategorySkeleton from '../components/ViewCategorySkeleton';
import useViewCategory from '../hooks/useViewCategory';
import { getViewField, getViewMediaField } from '../../../utils/functions';
import formStr from '../../../constants/formStr';
import viewCategoryStr from '../constants/viewCategoryStr';
import buttonsStr from '../../../constants/buttonsStr';
import CardContainer from '../../../components/cardContainer/CardContainer';
import Image from '../../../components/image/Image';

const ViewCategory = () => {
  const { language, goCategory, goEditCategory, deleteCategory, loading, category } = useViewCategory();
  if (loading ) return <ViewCategorySkeleton />;
  return (
    <GeneralContainer
      title={category?.text[language.prefix].name ?? ''}
      backButton={{
        title: viewCategoryStr[language.prefix].backButton,
        onClick: goCategory,
      }}
    >
      <>
        <Box
          display="flex"
          gap="0.5rem"
        >
          <Button variant="contained" onClick={goEditCategory}>
            {buttonsStr[language.prefix].edit}
          </Button>
          <Button variant="contained" color="error" onClick={deleteCategory}>
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
                {getViewField(formStr[language.prefix].name, category?.text.ES.name ?? '')}
              </Typography>
            </Box>
            <Box>
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                {formStr[language.prefix].englishTexts}
              </Typography>
              <Typography variant='body1'>
                {getViewField(formStr[language.prefix].name, category?.text.EN.name ?? '')}
              </Typography>
            </Box>
            <Box>
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                {formStr[language.prefix].general}
              </Typography>
              <Typography variant='body1' gutterBottom>
                {getViewMediaField(formStr[language.prefix].image)}
              </Typography>
              <Image src={category?.image.url ?? ''} alt={`${category?.text[language.prefix].name ?? ''} category backgroud`} />
            </Box>
          </Box>
        </CardContainer>
      </>
    </GeneralContainer>
  );
};

export default ViewCategory;
