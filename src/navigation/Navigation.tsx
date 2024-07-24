import { Route, Navigate, Routes } from 'react-router-dom';
import useLocalNavigation from '../hooks/useLocalNavigation';
import Login from '../feature/login/container/Login';
import GeneralContainer from '../components/generalContainer/GeneralContainer';
import Museum from '../feature/museum/container/Museum';
import RequireAuth from '../components/requireAuth/RequireAuth';
import NoRequireAuth from '../components/noRequireAuth/NoRequireAuth';

const Navigation = () => {
  const { isAuthenticated } = useLocalNavigation();
  return (
    <Routes>
      <Route element={<NoRequireAuth isAuthenticated={isAuthenticated} />}>
        <Route path="/login2" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/admin" element={<RequireAuth isAuthenticated={isAuthenticated} />}>
        <Route element={<GeneralContainer />}>
          <Route index element={<Museum />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default Navigation;
