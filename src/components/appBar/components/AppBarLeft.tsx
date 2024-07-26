import { useState } from 'react';
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import Logo from '../../logo/Logo';
import menu from '../../../constants/menu';
import colors from '../../../style/colors';

const AppBarLeft = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Logo white onClick={() => null} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Box sx={{ flexGrow: { xs: 0, md: 1 }, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} PaperProps={{sx: { backgroundColor: colors.background }}}>
          <Box sx={{ width: 250 }}>
            <List>
              {menu.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton onClick={handleCloseNavMenu}>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      <Logo white onClick={() => null} sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: { xs: 1, md: 0 } }} />
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {menu.map((item) => (
          <Button
            key={item.name}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default AppBarLeft;
