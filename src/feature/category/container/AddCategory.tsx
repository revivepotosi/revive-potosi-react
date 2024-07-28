import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import useAddCategory from '../hooks/useAddCategory';
import addCategoryStr from '../constants/addCategoryStr';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import formStr from '../../../constants/formStr';

const AddCategory = () => {
  const { language, goCategory, formik } = useAddCategory();
  return (
    <GeneralContainer
      title={addCategoryStr[language.prefix].title}
      backButton={{
        title: addCategoryStr[language.prefix].backButton,
        onClick: goCategory,
        icon: <ArrowBackIcon />,
      }}
    >
      <Box sx={{ flexGrow: 1, marginTop: '1rem' }} component='form' onSubmit={formik.handleSubmit} noValidate>
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
            <TextField
              required
              id="nameSpanish"
              type="text"
              name="nameSpanish"
              label={formStr[language.prefix].name}
              variant="outlined"
              autoComplete="off"
              value={formik.values.nameSpanish}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nameSpanish && Boolean(formik.errors.nameSpanish)}
              helperText={formik.touched.nameSpanish && formik.errors.nameSpanish}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              {formStr[language.prefix].englishTexts}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              id="nameEnglish"
              type="text"
              name="nameEnglish"
              label={formStr[language.prefix].name}
              variant="outlined"
              autoComplete="off"
              value={formik.values.nameEnglish}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nameEnglish && Boolean(formik.errors.nameEnglish)}
              helperText={formik.touched.nameEnglish && formik.errors.nameEnglish}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              {formStr[language.prefix].general}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <MuiFileInput
              required
              id="image"
              name="image"
              label={formStr[language.prefix].image}
              variant="outlined"
              value={formik.values.image}
              onBlur={formik.handleBlur}
              onChange={(newValue) => formik.setFieldValue('image', newValue)}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              inputProps={{ accept: '.png, .jpeg' }}
              clearIconButtonProps={{
                title: "Remove",
                children: <CloseOutlinedIcon fontSize="small" />
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" gap="1rem">
          <Button
            sx={{ display: 'block', alignSelf: 'center'}}
            type="submit"
            variant="contained"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {addCategoryStr[language.prefix].addButton}
          </Button>
        </Box>
      </Box>
    </GeneralContainer>
  );
};

export default AddCategory;
