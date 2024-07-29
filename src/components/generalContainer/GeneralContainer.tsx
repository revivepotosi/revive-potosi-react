import { Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import colors from '../../style/colors';

interface BackButton {
  title: string;
  onClick: () => void;
}

interface Props {
  title: string;
  backButton?: BackButton;
  children: JSX.Element;
}

const GeneralContainer = ({ title, backButton, children }: Props) => (
  <Container maxWidth="xl" sx={{ paddingTop: '1rem'}}>
    { backButton ?
      (
        <Button
          size="small"
          variant="text"
          sx={{ marginBottom: '0.5rem'}}
          onClick={backButton.onClick}
          startIcon={<ArrowBackIcon />}
        >
          {backButton.title}
        </Button>
      ) : null
    }
    <Typography variant='h5' sx={{ marginBottom: '0.5rem', color: colors.primary, fontWeight: 'bold'}}>
      {title}
    </Typography>
    { children }
  </Container>
);

export default GeneralContainer;
