import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface Props {
  isAuthenticated: boolean;
}

const RequireAuth = ({ isAuthenticated }: Props) => {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
