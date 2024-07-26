import { Navigate, Outlet, useLocation } from 'react-router-dom';
import RoutesNames from '../../constants/routesNames';

interface Props {
  isAuthenticated: boolean;
}

const RequireAuth = ({ isAuthenticated }: Props) => {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={`/${RoutesNames.login}`} state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
