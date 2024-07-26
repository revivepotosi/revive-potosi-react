
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../app/firebase';
import { openLoader, closeLoader } from '../redux/generalSlice';

const useSingin = () => {
  const dispatch = useDispatch();
  const loginUser = async (email: string, password: string) => {
    try {
      dispatch(openLoader());
      await signInWithEmailAndPassword(auth, email, password);
    } catch(error: any) {
      throw error;
    } finally {
      dispatch(closeLoader());
    }
  };
  return {
    loginUser,
  };
};

export default useSingin;
