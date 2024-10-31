import { Box, Button, TextField } from '@mui/material';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import formStr from '../../../constants/formStr';
import CardContainer from '../../../components/cardContainer/CardContainer';
import profileStr from '../constants/profileStr';
import useProfile from '../hooks/useProfile';

const Profile = () => {
  const { language, formik } = useProfile();

  return (
    <GeneralContainer
      title={profileStr[language.prefix].title}
    >
      <>
        <Box sx={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
          <Button variant="contained" onClick={() => null} sx={{ marginRight: '0.5rem' }}>
            {profileStr[language.prefix].changePasswordButton}
          </Button>
        </Box>
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
              <TextField
                id="email"
                type="text"
                name="email"
                label={formStr[language.prefix].email}
                variant="outlined"
                value={formik.values.email}
                sx={{ marginBottom: '1rem'}}
                disabled
                fullWidth
              />
              <TextField
                required
                id="name"
                type="text"
                name="name"
                label={formStr[language.prefix].name}
                variant="outlined"
                autoComplete="off"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" gap="1rem">
              <Button
                type="submit"
                variant="contained"
                disabled={!(formik.isValid && formik.dirty)}
              >
                {profileStr[language.prefix].updateInfo}
              </Button>
            </Box>
          </Box>
        </CardContainer>
      </>
    </GeneralContainer>
  );
};

export default Profile;
