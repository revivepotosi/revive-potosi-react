import { Container, Typography } from '@mui/material';
import ChipGroup from '../../../components/chipGroup/ChipGroup';
import colors from '../../../style/colors';

interface Props {
    isAdmin?: boolean;
};

const HistoricalCenter = ({ isAdmin = false }: Props) => {
    return (
        <Container maxWidth="xl" sx={{ paddingTop: '1rem'}}>
            <Typography variant='h5' gutterBottom sx={{ color: colors.primary, fontWeight: 'bold'}}>Centros Historicos</Typography>
            <Typography variant='h5' gutterBottom sx={{ color: colors.primary, fontWeight: 'bold'}}>{ isAdmin? 'Admin' : 'User'}</Typography>
        </Container>
    );
};

export default HistoricalCenter;
