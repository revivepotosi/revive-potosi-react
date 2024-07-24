const loginStr: Record<string, any> = {
  ES: {
    title: 'Ingreso de usuario',
    email_label: 'Correo',
    password_label: 'Contraseña',
    btn_login_label: 'Ingresar',
    btn_forgot_password_label: 'Olvide mi contraseña',
    error: {
      email_password_invalid: 'Correo o contraseña invalido.',
    },
  },
  EN: {
    title: 'Sign in',
    email_label: 'Email',
    password_label: 'Password',
    btn_login_label: 'Sign in',
    btn_forgot_password_label: 'I forgot my password',
    error: {
      email_password_invalid: 'Invalid email or password.',
    },
  },
};

export default loginStr;
