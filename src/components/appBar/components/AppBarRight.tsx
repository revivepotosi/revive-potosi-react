import { Avatar, Box, Button, IconButton, Tooltip } from '@mui/material';
import LanguageSelector from '../../languageSelector/LanguageSelector';
import { auth } from '../../../app/firebase';
import colors from '../../../style/colors';
import useAppBarRight from '../hooks/useAppBarRight';
import AppBarDrawer from './AppBarDrawer';
import appBarRightStr from '../constants/appBarRightStr';

const AppBarRight = () => {
  const {
    anchor,
    handleOpen,
    handleClose,
    menuItems,
    goLogin,
    language,
  } = useAppBarRight();
  return (
    <Box sx={{ flexGrow: 0 }}>
      <LanguageSelector color="white" size="small" sx={{ marginRight: '1rem'}} />
      { auth.currentUser ? (
          <>
            <Tooltip title="Abrir ajustes">
              <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: colors.secondary }} alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <AppBarDrawer items={menuItems} anchor='right' open={Boolean(anchor)} onClose={handleClose} />
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={goLogin}
          >
            {appBarRightStr[language.prefix].login}
          </Button>
        )
      }
    </Box>
  );
};

export default AppBarRight;
