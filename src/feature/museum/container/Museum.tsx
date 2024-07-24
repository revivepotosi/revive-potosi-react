import { Container, Typography } from '@mui/material';
import ChipGroup from '../../../components/chipGroup/ChipGroup';
import colors from '../../../style/colors';

const Museum = () => {
    return (
        <Container maxWidth="xl" sx={{ paddingTop: '1rem'}}>
            <Typography variant='h5' gutterBottom sx={{ color: colors.primary, fontWeight: 'bold'}}>Museos</Typography>
            <ChipGroup />
        </Container>
    );
};

export default Museum;
