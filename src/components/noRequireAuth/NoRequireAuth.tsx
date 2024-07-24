import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface Props {
  isAuthenticated: boolean;
}

const NoRequireAuth = ({ isAuthenticated }: Props) => {
  const location = useLocation();
  if (isAuthenticated) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default NoRequireAuth;
