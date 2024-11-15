const formValidationStr: Record<string, any> = {
  ES: {
    requiredField: 'Campo Requerido.',
    requiredFields: 'Los campos no pueden estar vacios.',
    invalidEmailFormat: 'Formato de correo no valido.',
    imageFormat: 'Sólo se permiten archivos png y jpeg.',
    imageSize: 'El tamaño de la imagen debe ser inferior a 2MB.',
    imageDontValid: 'Imagen no válida.',
    modelFormat: 'Sólo se permiten archivos glb.',
    modelSize: 'El tamaño del modelo debe ser inferior a 50MB.',
    modelDontValid: 'Modelo no válida.',
  },
  EN: {
    requiredField: 'Required field.',
    requiredFields: 'The fields cannot be empty.',
    invalidEmailFormat: 'Invalid email format.',
    imageFormat: 'Only png and jpeg files are allowed.',
    imageSize: 'Image size must be less than 2MB.',
    imageDontValid: 'Invalid image.',
    modelFormat: 'Only glb files are allowed.',
    modelSize: 'Model size must be less than 50MB.',
    modelDontValid: 'Invalid model.',
  },
};

export default formValidationStr;
