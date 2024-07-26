import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import colors from '../../../style/colors';

interface Props {
  items: any[];
  anchor?: 'left' | 'right';
  open?: boolean;
  onClose?: () => void;
}

const AppBarDrawer = ({ items, anchor = 'left', open = false, onClose = () => null }: Props) => {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose} PaperProps={{sx: { backgroundColor: colors.background }}}>
      <Box sx={{ width: 250 }}>
        <List>
          {items.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppBarDrawer;
