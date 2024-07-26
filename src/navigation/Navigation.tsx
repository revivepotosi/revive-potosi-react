import { Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import RouteNames from '../constants/routeNames';
import useLocalNavigation from '../hooks/useLocalNavigation';
import Login from '../feature/login/container/Login';
import GeneralContainer from '../components/generalContainer/GeneralContainer';
import HistoricCenter from '../feature/historicCenter/container/HistoricCenter';
import RequireAuth from '../components/requireAuth/RequireAuth';
import NoRequireAuth from '../components/noRequireAuth/NoRequireAuth';
import User from '../feature/user/container/User';
import Info from '../feature/info/container/Info';
import Category from '../feature/category/container/Category';
import Profile from '../feature/profile/container/Profile';
import BackgroudContainer from '../components/backgroudContainer/BackgroudContainer';

const Navigation = () => {
  const { isAuthenticated, isLoading } = useLocalNavigation();
  if (isLoading) return (<BackgroudContainer><CircularProgress sx={{ alignSelf: 'center', color: 'white'}} /></BackgroudContainer>);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GeneralContainer />}>
          <Route index element={<HistoricCenter isAdmin={isAuthenticated} />} />
          <Route path={RouteNames.info} element={<Info isAdmin={isAuthenticated} />} />
        </Route>
        <Route element={<NoRequireAuth isAuthenticated={isAuthenticated} />}>
          <Route path={RouteNames.login} element={<Login />} />
        </Route>
        <Route path={RouteNames.admin} element={<RequireAuth isAuthenticated={isAuthenticated} />}>
          <Route element={<GeneralContainer />}>
            <Route path={RouteNames.user} element={<User />} />
            <Route path={RouteNames.category} element={<Category />} />
            <Route path={RouteNames.profile} element={<Profile />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<Navigate to={RouteNames.index} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
