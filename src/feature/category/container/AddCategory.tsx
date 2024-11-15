import { Box, Button, TextField, Typography } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import useAddCategory from '../hooks/useAddCategory';
import addCategoryStr from '../constants/addCategoryStr';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import formStr from '../../../constants/formStr';
import CardContainer from '../../../components/cardContainer/CardContainer';
import buttonsStr from '../../../constants/buttonsStr';
import validation from '../../../constants/validation';

const AddCategory = () => {
  const { language, goCategory, formik } = useAddCategory();
  return (
    <GeneralContainer
      title={addCategoryStr[language.prefix].title}
      backButton={{
        title: addCategoryStr[language.prefix].backButton,
        onClick: goCategory,
      }}
    >
      <CardContainer sx={{ marginTop: '1rem'}}>
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Box>
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
              {formStr[language.prefix].spanishTexts}
            </Typography>
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
          </Box>
          <Box>
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
              {formStr[language.prefix].englishTexts}
            </Typography>
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
          </Box>
          <Box>
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
              {formStr[language.prefix].general}
            </Typography>
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
              inputProps={{ accept: validation.imageSupportedFormatsString }}
              clearIconButtonProps={{
                title: "Remove",
                children: <CloseOutlinedIcon fontSize="small" />
              }}
              fullWidth
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap="1rem">
            <Button
              type="submit"
              variant="contained"
              disabled={!(formik.isValid && formik.dirty)}
            >
              {buttonsStr[language.prefix].add}
            </Button>
          </Box>
        </Box>
      </CardContainer>
    </GeneralContainer>
  );
};

export default AddCategory;
