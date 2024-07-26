import { Container, Typography } from '@mui/material';
import colors from '../../../style/colors';

const Category = () => {
    return (
        <Container maxWidth="xl" sx={{ paddingTop: '1rem'}}>
            <Typography variant='h5' gutterBottom sx={{ color: colors.primary, fontWeight: 'bold'}}>Category</Typography>
        </Container>
    );
};

export default Category;
