import { Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import RouteNames from '../constants/routeNames';
import useLocalNavigation from '../hooks/useLocalNavigation';
import Login from '../feature/login/container/Login';
import AppBarContainer from '../components/appBarContainer/AppBarContainer';
import HistoricCenter from '../feature/historicCenter/container/HistoricCenter';
import RequireAuth from '../components/requireAuth/RequireAuth';
import NoRequireAuth from '../components/noRequireAuth/NoRequireAuth';
import User from '../feature/user/container/User';
import Info from '../feature/info/container/Info';
import Category from '../feature/category/container/Category';
import Profile from '../feature/profile/container/Profile';
import BackgroudContainer from '../components/backgroudContainer/BackgroudContainer';
import AddCategory from '../feature/category/container/AddCategory';
import ViewCategory from '../feature/category/container/ViewCategory';
import EditCategory from '../feature/category/container/EditCategory';
import AddHistoricCenter from '../feature/historicCenter/container/AddHistoricCenter';
import AddContentHistoricCenter from '../feature/historicCenter/container/AddContentHistoricCenter';
import ContentHistoricCenter from '../feature/historicCenter/container/ContentHistoricCenter';
import ViewHistoricCenter from '../feature/historicCenter/container/ViewHistoricCenter';
import EditHistoricCenter from '../feature/historicCenter/container/EditHistoricCenter';
import AddContentInfo from '../feature/info/container/AddContentInfo';
import ManageContentHistoricCenter from '../feature/historicCenter/container/ManageContentHistoricCenter';
import ManageContentInfo from '../feature/info/container/ManageContentInfo';
import ResetPassword from '../feature/resetPassword/container/ResetPassword';
import ManageExperienceHistoricCenter from '../feature/historicCenter/container/ManageExperienceHistoricCenter';
import AddExperienceHistoricCenter from '../feature/historicCenter/container/AddExperienceHistoricCenter';

const Navigation = () => {
  const { isAuthenticated, isLoading } = useLocalNavigation();
  if (isLoading) return (<BackgroudContainer><CircularProgress sx={{ alignSelf: 'center', color: 'white'}} /></BackgroudContainer>);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppBarContainer />}>
          <Route index element={<HistoricCenter isAdmin={isAuthenticated} />} />
          <Route
            path={`${RouteNames.historicCenter}/${RouteNames.content}/${RouteNames.id}`}
            element={<ContentHistoricCenter isAdmin={isAuthenticated} />}
          />
          <Route path={RouteNames.info} element={<Info isAdmin={isAuthenticated} />} />
        </Route>
        <Route element={<NoRequireAuth isAuthenticated={isAuthenticated} />}>
          <Route path={RouteNames.login} element={<Login />} />
          <Route path={RouteNames.resetPassword} element={<ResetPassword />} />
        </Route>
        <Route path={RouteNames.admin} element={<RequireAuth isAuthenticated={isAuthenticated} />}>
          <Route element={<AppBarContainer />}>
            {/* <Route path={RouteNames.user} element={<User />} /> */}
            <Route path={RouteNames.category}>
              <Route index element={<Category />} />
              <Route path={RouteNames.add} element={<AddCategory />} />
              <Route path={RouteNames.id} element={<ViewCategory />} />
              <Route path={`${RouteNames.edit}/${RouteNames.id}`} element={<EditCategory />} />
            </Route>
            <Route path={RouteNames.info}>
              <Route path={`${RouteNames.content}/${RouteNames.add}`} element={<AddContentInfo />} />
              <Route path={`${RouteNames.content}/${RouteNames.manage}`} element={<ManageContentInfo />} />
            </Route>
            <Route path={RouteNames.historicCenter}>
              <Route
                path={`/${RouteNames.admin}/${RouteNames.historicCenter}/${RouteNames.experience}/${RouteNames.manage}/${RouteNames.id}`}
                element={<ManageExperienceHistoricCenter />}
              />
              <Route
                path={`/${RouteNames.admin}/${RouteNames.historicCenter}/${RouteNames.experience}/${RouteNames.add}/${RouteNames.id}`}
                element={<AddExperienceHistoricCenter />}
              />
              <Route
                path={`${RouteNames.content}/${RouteNames.manage}/${RouteNames.id}`}
                element={<ManageContentHistoricCenter />}
              />
              <Route path={RouteNames.add} element={<AddHistoricCenter />} />
              <Route path={`${RouteNames.content}/${RouteNames.add}/${RouteNames.id}`} element={<AddContentHistoricCenter />} />
              <Route path={`${RouteNames.edit}/${RouteNames.id}`} element={<EditHistoricCenter />} />
              <Route path={RouteNames.id} element={<ViewHistoricCenter />} />
            </Route>
            <Route path={RouteNames.user} element={<User />} />
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
