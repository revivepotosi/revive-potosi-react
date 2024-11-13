import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CardContainer from '../cardContainer/CardContainer';
import GeneralContainer from '../generalContainer/GeneralContainer';
import formStr from '../../constants/formStr';
import validation from '../../constants/validation';
import useAddExperience from '../../hooks/useAddExperience';
import addExperienceStr from '../../constants/addExperienceStr';
import buttonsStr from '../../constants/buttonsStr';

interface Props {
  historicCenterID: string;
  onBack: () => void;
}

const AddExperience = ({
  historicCenterID,
  onBack,
}: Props) => {
  const { language, formik } = useAddExperience({ historicCenterID, onBack });

  return (
    <GeneralContainer
      title={addExperienceStr[language.prefix].title}
      backButton={{
        title: addExperienceStr[language.prefix].backButton,
        onClick: onBack,
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
            <Alert variant="filled" severity="info" sx={{ marginBottom: '0.5rem' }}>
              { addExperienceStr[language.prefix].advise }
            </Alert>
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
              sx={{ marginBottom: '1rem'}}
              fullWidth
            />
            <TextField
              required
              id="descriptionSpanish"
              type="text"
              name="descriptionSpanish"
              label={formStr[language.prefix].description}
              variant="outlined"
              autoComplete="off"
              value={formik.values.descriptionSpanish}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.descriptionSpanish && Boolean(formik.errors.descriptionSpanish)}
              helperText={formik.touched.descriptionSpanish && formik.errors.descriptionSpanish}
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
              sx={{ marginBottom: '1rem'}}
              fullWidth
            />
            <TextField
              required
              id="descriptionEnglish"
              type="text"
              name="descriptionEnglish"
              label={formStr[language.prefix].description}
              variant="outlined"
              autoComplete="off"
              value={formik.values.descriptionEnglish}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.descriptionEnglish && Boolean(formik.errors.descriptionEnglish)}
              helperText={formik.touched.descriptionEnglish && formik.errors.descriptionEnglish}
              fullWidth
            />
          </Box>
          <Box>
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
              {formStr[language.prefix].general}
            </Typography>
            <MuiFileInput
              required
              id="activator"
              name="activator"
              label={formStr[language.prefix].activator}
              variant="outlined"
              value={formik.values.activator}
              onBlur={formik.handleBlur}
              onChange={(newValue) => formik.setFieldValue('activator', newValue)}
              error={formik.touched.activator && Boolean(formik.errors.activator)}
              helperText={formik.touched.activator && formik.errors.activator}
              inputProps={{ accept: validation.imageSupportedFormatsString }}
              clearIconButtonProps={{
                title: "Remove",
                children: <CloseOutlinedIcon fontSize="small" />
              }}
              sx={{ marginBottom: '1rem'}}
              fullWidth
            />
            <MuiFileInput
              required
              id="model"
              name="model"
              label={formStr[language.prefix].model}
              variant="outlined"
              value={formik.values.model}
              onBlur={formik.handleBlur}
              onChange={(newValue) => formik.setFieldValue('model', newValue)}
              error={formik.touched.model && Boolean(formik.errors.model)}
              helperText={formik.touched.model && formik.errors.model}
              inputProps={{ accept: validation.modelSupportedFormatsString }}
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
              disabled={!(formik.isValid)}
            >
              {buttonsStr[language.prefix].add}
            </Button>
          </Box>
        </Box>
      </CardContainer>
    </GeneralContainer>
  );
};

export default AddExperience;
