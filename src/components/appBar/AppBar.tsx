import AppBarMaterial from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AppBarRight from './components/AppBarRight';
import AppBarLeft from './components/AppBarLeft';

const AppBar = () => {
  return (
    <AppBarMaterial position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppBarLeft />
          <AppBarRight />
        </Toolbar>
      </Container>
    </AppBarMaterial>
  );
}
export default AppBar;