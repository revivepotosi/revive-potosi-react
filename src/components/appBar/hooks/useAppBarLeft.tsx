import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChurchOutlinedIcon from '@mui/icons-material/ChurchOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
        icon: <ChurchOutlinedIcon />,
        onClick: getOnClick(RouteNames.index),
      },
      {
        hide: Boolean(!auth.currentUser),
        name: appBarLeftStr[language.prefix].category,
        icon: <FilterAltOutlinedIcon />,
        onClick: getOnClick(`/${RouteNames.admin}/${RouteNames.category}`),
      },
      {
        hide: Boolean(!auth.currentUser),
        name: appBarLeftStr[language.prefix].user,
        icon: <PersonOutlinedIcon />,
        onClick: getOnClick(`/${RouteNames.admin}/${RouteNames.user}`),
      },
      {
        name: appBarLeftStr[language.prefix].info,
        icon: <InfoOutlinedIcon />,
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
