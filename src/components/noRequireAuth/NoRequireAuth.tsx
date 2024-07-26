import { Navigate, Outlet, useLocation } from 'react-router-dom';
import RouteNames from '../../constants/routeNames';

interface Props {
  isAuthenticated: boolean;
}

const NoRequireAuth = ({ isAuthenticated }: Props) => {
  const location = useLocation();
  if (isAuthenticated) {
    return <Navigate to={RouteNames.index} state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default NoRequireAuth;
