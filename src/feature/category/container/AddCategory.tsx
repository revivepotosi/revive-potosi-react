import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useAddCategory from '../hooks/useAddCategory';
import addCategoryStr from '../constants/addCategoryStr';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import { Box, Button, Grid, Paper, TextField, styled } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AddCategory = () => {
  const { language, goCategory } = useAddCategory();
  return (
    <GeneralContainer
      title={addCategoryStr[language.prefix].title}
      backButton={{
        title: addCategoryStr[language.prefix].backButton,
        onClick: goCategory,
        icon: <ArrowBackIcon />,
      }}
    >
      <Box sx={{ flexGrow: 1, marginTop: '1rem' }} component='form' onSubmit={() => null} noValidate>
          <Grid
            container
            spacing={2}
            columns={{ xs: 2, sm: 4, md: 6 }}
            sx={{ marginBottom: '1rem'}}
          >
            <Grid item xs={2}>
              <TextField
                required
                id="name-input"
                type="text"
                name="name"
                label="Nombre"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                required
                id="name-input"
                name="name"
                type="file"
                label="Imagen"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </Grid>
          </Grid>
        <Box display="flex" justifyContent="flex-end" gap="1rem">
          <Button variant="outlined">Previsualizar</Button>
          <Button sx={{ display: 'block', alignSelf: 'center'}}type="submit" variant="contained">Agregar</Button>
        </Box>
      </Box>
    </GeneralContainer>
  );
};

export default AddCategory;
