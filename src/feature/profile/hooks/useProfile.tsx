import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { auth } from '../../../app/firebase';
import { RootState } from '../../../app/store';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import RouteNames from '../../../constants/routeNames';
import formValidationStr from '../../../constants/formValidationStr';
import profileStr from '../constants/profileStr';

const useProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);

  const goHome = () => navigate(RouteNames.index);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: auth.currentUser?.email,
      name: auth.currentUser?.displayName ?? '',
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required(formValidationStr[language.prefix].requiredField),
    }),
    onSubmit: async (values) => {
      try {
        if (!auth.currentUser) return;
        dispatch(openLoader());
        await updateProfile(auth.currentUser, {
          displayName: values.name,
        })
        alert(profileStr[language.prefix].successMessage);
      } catch (error: any) {
        console.log(error);
      } finally {
        dispatch(closeLoader());
        goHome();
      }
    },
  });
  return {
    language,
    formik,
  };
};

export default useProfile;
