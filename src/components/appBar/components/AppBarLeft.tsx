import { Box, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../logo/Logo';
import useAppBarLeft from '../hooks/useAppBarLeft';
import AppBarDrawer from './AppBarDrawer';

const AppBarLeft = () => {
  const { anchor, handleOpen, handleClose, menuItems, goHome } = useAppBarLeft();
  return (
    <>
      <Logo white onClick={goHome} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Box sx={{ flexGrow: { xs: 0, md: 1 }, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <AppBarDrawer items={menuItems} open={Boolean(anchor)} onClose={handleClose} />
      </Box>
      <Logo white onClick={goHome} sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: { xs: 1, md: 0 } }} />
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {menuItems.map((item) => (item.hide
          ? null
          : (
            <Button
              key={item.name}
              onClick={item.onClick}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {item.name}
            </Button>
          )
        ))}
      </Box>
    </>
  );
};

export default AppBarLeft;
