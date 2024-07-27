import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import colors from '../../style/colors';
import AppBar from '../appBar/AppBar';

const AppBarContainer = () => (
    <Box sx= {{ minHeight: '100vh', backgroundColor: colors.background}}>
        <AppBar />
        <Outlet />
    </Box>
);

export default AppBarContainer;
