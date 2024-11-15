import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { auth } from '../../../app/firebase';
import { RootState } from '../../../app/store';
import { closeLoader, openLoader } from '../../../redux/generalSlice';
import AppBarMenuItem from '../../../interfaces/appBarMenuItem';
import { getOnClickMenuItem } from '../utils/functions';
import appBarRightStr from '../constants/appBarRightStr';
import RouteNames from '../../../constants/routeNames';

const useAppBarRight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const [menuItems, setMenuItems] = useState<AppBarMenuItem[]>([]);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const onLogout = async () => {
    try {
      dispatch(openLoader());
      await signOut(auth);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorCode, errorMessage);
    } finally {
      dispatch(closeLoader());
    };
  };

  const goLogin = () => {
    navigate(`/${RouteNames.login}`);
  };
  
  const getOnClick = getOnClickMenuItem(navigate, handleClose);

  useEffect(() => {
    setMenuItems([
      {
        name: appBarRightStr[language.prefix].profile,
        icon: <AccountBoxOutlinedIcon />,
        onClick: getOnClick(`/${RouteNames.admin}/${RouteNames.profile}`),
      },
      {
        name: appBarRightStr[language.prefix].logout,
        icon: <ExitToAppOutlinedIcon />,
        onClick: onLogout,
      },
    ]);
  }, [language]);

  return {
    anchor,
    handleOpen,
    handleClose,
    menuItems,
    goLogin,
    language,
  };
};

export default useAppBarRight;
