import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import colors from '../../../style/colors';
import RESET_PASSWORD_STR from '../constants/resetPasswordStr';
import useResetPassword from '../hooks/useResetPassword';
import Logo from '../../../components/logo/Logo';
import LanguageSelector from '../../../components/languageSelector/LanguageSelector';
import BackgroudContainer from '../../../components/backgroudContainer/BackgroudContainer';

const ResetPassword = () => {
  const {
    email,
    handleResetPassword,
    handleChange,
    isEmailValid,
    emailHelperText,
    validateEmail,
    showErrorAlert,
    showSuccessAlert,
    goLogin,
    language,
  } = useResetPassword();
  return (
    <BackgroudContainer>
      <Box sx={{ bgcolor: colors.background, borderRadius: '1rem', padding: '2rem'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2}} component='form' onSubmit={handleResetPassword} noValidate>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Logo size='m' />
            <Box>
              <LanguageSelector />
            </Box>
          </Box>
          <Typography variant='h5' gutterBottom sx={{ color: colors.primary, textAlign: 'center', fontWeight: 'bold'}}>{RESET_PASSWORD_STR[language.prefix].title}</Typography>
          {!showSuccessAlert ? (
            <TextField
              required
              error={!isEmailValid}
              helperText={emailHelperText}
              id="email-input"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              onBlur={validateEmail}
              label={RESET_PASSWORD_STR[language.prefix].email_label}
              variant="outlined"
              autoComplete="true"
            />
          ): null}
          {!showSuccessAlert && showErrorAlert ? (
            <Alert variant="filled" severity="error">
              {RESET_PASSWORD_STR[language.prefix].error.email_invalid}
            </Alert>
          ): null}
          {showSuccessAlert ? (
            <Alert variant="filled" severity="success">
              {RESET_PASSWORD_STR[language.prefix].success_message}
            </Alert>
          ): null}
          {!showSuccessAlert ? (
            <Button type="submit" variant="contained">{RESET_PASSWORD_STR[language.prefix].btn_reset_password}</Button>
          ): null}
          <Button variant="text" onClick={goLogin}>{RESET_PASSWORD_STR[language.prefix].btn_back}</Button>
        </Box>
      </Box>
    </BackgroudContainer>
  );
};

export default ResetPassword;
