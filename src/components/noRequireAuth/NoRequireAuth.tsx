import { Navigate, Outlet, useLocation } from 'react-router-dom';
import RoutesNames from '../../constants/routesNames';

interface Props {
  isAuthenticated: boolean;
}

const NoRequireAuth = ({ isAuthenticated }: Props) => {
  const location = useLocation();
  if (isAuthenticated) {
    return <Navigate to={RoutesNames.index} state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default NoRequireAuth;
