
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../app/firebase';
import { openLoader, closeLoader } from '../redux/generalSlice';

const useSingup = () => {
  const dispatch = useDispatch();
  const createUser = async (email: string, password: string) => {
    try {
      dispatch(openLoader());
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(userCredential);
    } catch(error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorCode, errorMessage);
    } finally {
      dispatch(closeLoader());
    }
  };
  return {
    createUser,
  };
};

export default useSingup;
