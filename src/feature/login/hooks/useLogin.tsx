import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSingin from '../../../hooks/useSingin';
import RouteNames from '../../../constants/routeNames';
import { RootState } from '../../../app/store';
import formValidationStr from '../../../constants/formValidationStr';

const isEmail = (email: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const useLogin = () => {
  const language = useSelector((state: RootState) => state.language.language);
  const navigate = useNavigate();
  const { loginUser } = useSingin();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const validateEmail = () => {
    if(loginData.email === '') {
      setIsEmailValid(false);
      setEmailHelperText(formValidationStr[language.prefix].requiredField);
      return false;
    };
    if(!isEmail(loginData.email)) {
      setIsEmailValid(false);
      setEmailHelperText(formValidationStr[language.prefix].invalidEmailFormat);
      return false;
    };
    setIsEmailValid(true);
    setEmailHelperText('');
    return true;
  };

  const validatePassword = () => {
    if(loginData.password === '') {
      setIsPasswordValid(false);
      setPasswordHelperText(formValidationStr[language.prefix].requiredField);
      return false;
    };
    setIsPasswordValid(true);
    setPasswordHelperText('');
    return true;
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const isEmailValidLocal = validateEmail();
    const isPasswordValidLocal = validatePassword();
    if (isEmailValidLocal && isPasswordValidLocal) {
      try {
        await loginUser(loginData.email, loginData.password);
      } catch (error: any) {
        setShowErrorAlert(true);
      }
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const goHome = () => { navigate(RouteNames.index) };

  return {
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
    goHome,
    language,
  };
};

export default useLogin;
