const resetPasswordStr: Record<string, any> = {
  ES: {
    title: 'Restablecer contraseña',
    email_label: 'Correo',
    btn_reset_password: 'Restablecer contraseña',
    btn_back: 'Volver a ingresar',
    success_message: 'Se te enviara un correo para restablecer la contraseña.',
    error: {
      email_invalid: 'Correo invalido o no encontrado.',
    },
  },
  EN: {
    title: 'Reset password',
    email_label: 'Email',
    btn_reset_password: 'Reset password',
    btn_back: 'Back to sign in',
    success_message: 'You will be sent an email to reset your password.',
    error: {
      email_invalid: 'Invalid or not found email.',
    },
  },
};

export default resetPasswordStr;
