import { Container, Typography } from '@mui/material';
import colors from '../../../style/colors';

interface Props {
    isAdmin?: boolean;
};

const HistoricCenter = ({ isAdmin = false }: Props) => {
    return (
        <Container maxWidth="xl" sx={{ paddingTop: '1rem'}}>
            <Typography variant='h5' gutterBottom sx={{ color: colors.primary, fontWeight: 'bold'}}>Centros Historicos</Typography>
            <Typography variant='h5' gutterBottom sx={{ color: colors.primary, fontWeight: 'bold'}}>{ isAdmin? 'Admin' : 'User'}</Typography>
        </Container>
    );
};

export default HistoricCenter;
