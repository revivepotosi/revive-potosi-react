import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../app/firebase';
import { openLoader, closeLoader } from '../redux/generalSlice';

const useLocalNavigation = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    dispatch(openLoader());
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(Boolean(user));
      dispatch(closeLoader());
    });
  }, []);
  return { isAuthenticated };
};

export default useLocalNavigation;
