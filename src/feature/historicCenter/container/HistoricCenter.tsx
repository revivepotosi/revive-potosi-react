import { Container, Typography } from '@mui/material';
import colors from '../../../style/colors';
import useHistoricCenter from '../hooks/useHistoricCenter';
import historicCenterStr from '../constants/historicCenterStr';

interface Props {
    isAdmin?: boolean;
};

const HistoricCenter = ({ isAdmin = false }: Props) => {
    const { language } = useHistoricCenter();
    return (
        <Container maxWidth="xl" sx={{ paddingTop: '1rem'}}>
            <Typography variant='h5' gutterBottom sx={{ color: colors.primary, fontWeight: 'bold'}}>
                { historicCenterStr[language.prefix].title }
            </Typography>
        </Container>
    );
};

export default HistoricCenter;
