import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RouteNames from '../../../constants/routeNames';
import { RootState } from '../../../app/store';
import formValidationStr from '../../../constants/formValidationStr';
import { isEmail } from '../../../utils/form';
import { closeLoader, openLoader } from '../../../redux/generalSlice';

const useResetPassword = () => {
  const language = useSelector((state: RootState) => state.language.language);
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const validateEmail = () => {
    if(email === '') {
      setIsEmailValid(false);
      setEmailHelperText(formValidationStr[language.prefix].requiredField);
      return false;
    };
    if(!isEmail(email)) {
      setIsEmailValid(false);
      setEmailHelperText(formValidationStr[language.prefix].invalidEmailFormat);
      return false;
    };
    setIsEmailValid(true);
    setEmailHelperText('');
    return true;
  };

  const handleResetPassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateEmail()) {
      try {
        dispatch(openLoader());
        await sendPasswordResetEmail(auth, email);
        setShowSuccessAlert(true);
      } catch (error: any) {
        setShowErrorAlert(true);
      } finally {
        dispatch(closeLoader());
      }
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { value } = e.target;
    setEmail(value);
  };

  const goLogin = () => { navigate(`/${RouteNames.login}`) };

  return {
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
  };
};

export default useResetPassword;
