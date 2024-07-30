import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import formStr from '../../../constants/formStr';
import CardContainer from '../../../components/cardContainer/CardContainer';
import buttonsStr from '../../../constants/buttonsStr';
import validation from '../../../constants/validation';
import SimpleFormSkeleton from '../../../components/simpleFormSkeleton/SimpleFormSkeleton';
import addContentInfoStr from '../constants/addContentInfoStr';
import contentTypes from '../../../constants/contentTypes';
import { isImageContent, isParagraphContent, isTextContent } from '../../../utils/functions';
import useAddContentInfo from '../hooks/useAddContentInfo';

const AddContentInfo = () => {
  const {
    loading,
    language,
    backToInfo,
    formik,
  } = useAddContentInfo();

  if (loading) return (<SimpleFormSkeleton />);

  return (
    <GeneralContainer
      title={addContentInfoStr[language.prefix].title}
      backButton={{
        title: addContentInfoStr[language.prefix].backButton,
        onClick: backToInfo,
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
            <FormControl required fullWidth error={formik.touched.typeID && Boolean(formik.errors.typeID)}>
              <InputLabel id="typeID-select-label">
                {formStr[language.prefix].type}
              </InputLabel>
              <Select
                required
                labelId="typeID-select-label"
                id="typeID"
                name="typeID"
                value={formik.values.typeID}
                label={formStr[language.prefix].type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >

                { contentTypes.map((content) => (
                  <MenuItem key={content.id} value={content.id}>{content.text[language.prefix].name}</MenuItem>)
                )}
              </Select>
              { formik.touched.typeID ? <FormHelperText>{formik.errors.typeID}</FormHelperText> : null }
            </FormControl>
          </Box>
          { formik.values.typeID !== '' && isTextContent(formik.values.typeID)
            ? (
              <>
                <Box>
                  <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                    {formStr[language.prefix].spanishTexts}
                  </Typography>
                  <TextField
                    id="textSpanish"
                    type="text"
                    name="textSpanish"
                    label={formStr[language.prefix].name}
                    variant="outlined"
                    autoComplete="off"
                    value={formik.values.textSpanish}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.textSpanish && Boolean(formik.errors.textSpanish)}
                    helperText={formik.touched.textSpanish && formik.errors.textSpanish}
                    multiline={isParagraphContent(formik.values.typeID)}
                    maxRows={4}
                    fullWidth
                  />
                </Box>
                <Box>
                  <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                    {formStr[language.prefix].englishTexts}
                  </Typography>
                  <TextField
                    id="textEnglish"
                    type="text"
                    name="textEnglish"
                    label={formStr[language.prefix].name}
                    variant="outlined"
                    autoComplete="off"
                    value={formik.values.textEnglish}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.textEnglish && Boolean(formik.errors.textEnglish)}
                    helperText={formik.touched.textEnglish && formik.errors.textEnglish}
                    multiline={isParagraphContent(formik.values.typeID)}
                    maxRows={4}
                    fullWidth
                  />
                </Box>
              </>
            ) : null
          }
          { formik.values.typeID !== '' && isImageContent(formik.values.typeID)
            ? (
              <Box>
                <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                  {formStr[language.prefix].imagen}
                </Typography>
                <MuiFileInput
                  sx={{ marginBottom: '1rem'}}
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
                <TextField
                  id="alt"
                  type="text"
                  name="alt"
                  label={formStr[language.prefix].alt}
                  variant="outlined"
                  autoComplete="off"
                  value={formik.values.alt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.alt && Boolean(formik.errors.alt)}
                  helperText={formik.touched.alt && formik.errors.alt}
                  fullWidth
                />
              </Box>
            ) : null
          }
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

export default AddContentInfo;
