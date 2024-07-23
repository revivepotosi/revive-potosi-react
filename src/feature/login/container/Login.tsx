import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material'
import bgLogin from '../../../assets/bg-login.png';
import colors from '../../../style/colors';
import LOGIN_STR from '../constants/loginStr';
import useLogin from '../hooks/useLogin';
import Logo from '../../../components/logo/Logo';
import LanguageSelector from '../../../components/languageSelector/LanguageSelector';

const Login = () => {
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
  } = useLogin();
  return (
    <div style={{ backgroundImage: `url(${bgLogin})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}>
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ bgcolor: colors.background, borderRadius: '1rem', padding: '2rem'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2}} component='form' onSubmit={handleLogin} noValidate>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Logo size='m' />
              <Box>
                <LanguageSelector />
              </Box>
            </Box>
            <Typography variant='h5' gutterBottom sx={{ color: colors.primary, textAlign: 'center', fontWeight: 'bold'}}>{LOGIN_STR.title}</Typography>
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
              label={LOGIN_STR.email_label}
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
              label={LOGIN_STR.password_label}
              variant="outlined"
            />
            {showErrorAlert ? (
              <Alert variant="filled" severity="error">
                {LOGIN_STR.error.email_password_invalid}
              </Alert>
            ): null}
            <Button type="submit" variant="contained">{LOGIN_STR.btn_login_label}</Button>
            <Button variant="outlined">{LOGIN_STR.btn_forgot_password_label}</Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
