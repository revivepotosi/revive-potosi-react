import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { auth } from '../../../app/firebase';
import { RootState } from '../../../app/store';
import AppBarMenuItem from '../../../interfaces/appBarMenuItem';
import { getOnClickMenuItem } from '../utils/functions';
import appBarLeftStr from '../constants/appBarLeftStr';
import RouteNames from '../../../constants/routeNames';

const useAppBarLeft = () => {
  const navigate = useNavigate();
  const language = useSelector((state: RootState) => state.language.language);
  const [menuItems, setMenuItems] = useState<AppBarMenuItem[]>([]);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleOpen= (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const goHome = () => {
    navigate(RouteNames.index);
  };
  
  const getOnClick = getOnClickMenuItem(navigate, handleClose);

  useEffect(() => {
    setMenuItems([
      {
        name: appBarLeftStr[language.prefix].historicCenter,
        icon: <AccountBoxOutlinedIcon />,
        onClick: getOnClick(RouteNames.index),
      },
      {
        hide: Boolean(!auth.currentUser),
        name: appBarLeftStr[language.prefix].category,
        icon: <ExitToAppOutlinedIcon />,
        onClick: getOnClick(`/${RouteNames.admin}/${RouteNames.category}`),
      },
      {
        hide: Boolean(!auth.currentUser),
        name: appBarLeftStr[language.prefix].user,
        icon: <ExitToAppOutlinedIcon />,
        onClick: getOnClick(`/${RouteNames.admin}/${RouteNames.user}`),
      },
      {
        name: appBarLeftStr[language.prefix].info,
        icon: <ExitToAppOutlinedIcon />,
        onClick: getOnClick(`/${RouteNames.info}`),
      },
    ]);
  }, [language, auth.currentUser]);

  return {
    anchor,
    handleOpen,
    handleClose,
    menuItems,
    goHome,
  };
};

export default useAppBarLeft;
