import { Box, Container } from '@mui/material';
import bgLogin from '../../assets/bg-login.png';

interface Props {
  children: JSX.Element;
}

const BackgroudContainer = ({ children }: Props) => (
  <Box sx={{ backgroundImage: `url(${bgLogin})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}>
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {children}
    </Container>
  </Box>
);

export default BackgroudContainer;
