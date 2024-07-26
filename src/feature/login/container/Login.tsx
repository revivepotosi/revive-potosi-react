import { useSelector } from 'react-redux';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { RootState } from '../../../app/store';
import colors from '../../../style/colors';
import LOGIN_STR from '../constants/loginStr';
import useLogin from '../hooks/useLogin';
import Logo from '../../../components/logo/Logo';
import LanguageSelector from '../../../components/languageSelector/LanguageSelector';
import BackgroudContainer from '../../../components/backgroudContainer/BackgroudContainer';

const Login = () => {
  const language = useSelector((state: RootState) => state.language.language);
  const {
    loginData,
    handleLogin,
    handleChange,
    isEmailValid,
    emailHelperText,
    isPasswordValid,
    passwordHelperText,
    validateEmail,
    validatePassword,
    showErrorAlert,
    goToHome,
  } = useLogin();
  return (
    <BackgroudContainer>
      <Box sx={{ bgcolor: colors.background, borderRadius: '1rem', padding: '2rem'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2}} component='form' onSubmit={handleLogin} noValidate>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Logo size='m' />
            <Box>
              <LanguageSelector />
            </Box>
          </Box>
          <Typography variant='h5' gutterBottom sx={{ color: colors.primary, textAlign: 'center', fontWeight: 'bold'}}>{LOGIN_STR[language.prefix].title}</Typography>
          <TextField
            required
            error={!isEmailValid}
            helperText={emailHelperText}
            id="email-input"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            onBlur={validateEmail}
            label={LOGIN_STR[language.prefix].email_label}
            variant="outlined"
          />
          <TextField
            error={!isPasswordValid}
            helperText={passwordHelperText}
            required
            type="password"
            id="password-input"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            onBlur={validatePassword}
            label={LOGIN_STR[language.prefix].password_label}
            variant="outlined"
          />
          {showErrorAlert ? (
            <Alert variant="filled" severity="error">
              {LOGIN_STR[language.prefix].error.email_password_invalid}
            </Alert>
          ): null}
          <Button type="submit" variant="contained">{LOGIN_STR[language.prefix].btn_login_label}</Button>
          <Button variant="outlined">{LOGIN_STR[language.prefix].btn_forgot_password_label}</Button>
          <Button variant="text" onClick={goToHome}>{LOGIN_STR[language.prefix].btn_back}</Button>
        </Box>
      </Box>
    </BackgroudContainer>
  );
};

export default Login;
