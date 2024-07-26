import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../app/firebase';

const useLocalNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(Boolean(user));
      setIsLoading(false);
    });
  }, []);
  return { isAuthenticated, isLoading };
};

export default useLocalNavigation;
