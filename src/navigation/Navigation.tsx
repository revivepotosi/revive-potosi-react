import { Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import RoutesNames from '../constants/routesNames';
import useLocalNavigation from '../hooks/useLocalNavigation';
import Login from '../feature/login/container/Login';
import GeneralContainer from '../components/generalContainer/GeneralContainer';
import HistoricalCenter from '../feature/historicalCenter/container/HistoricalCenter';
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
          <Route index element={<HistoricalCenter isAdmin={isAuthenticated} />} />
          <Route path={RoutesNames.info} element={<Info isAdmin={isAuthenticated} />} />
        </Route>
        <Route element={<NoRequireAuth isAuthenticated={isAuthenticated} />}>
          <Route path={RoutesNames.login} element={<Login />} />
        </Route>
        <Route path={RoutesNames.admin} element={<RequireAuth isAuthenticated={isAuthenticated} />}>
          <Route element={<GeneralContainer />}>
            <Route path={RoutesNames.user} element={<User />} />
            <Route path={RoutesNames.category} element={<Category />} />
            <Route path={RoutesNames.profile} element={<Profile />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<Navigate to={RoutesNames.index} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
