import { Container, Skeleton } from '@mui/material';
import ButtonSkeleton from '../skeleton/ButtonSkeleton';

interface Props {
  hasBackButton?: boolean;
  children: JSX.Element;
}

const GeneralContainerSkeleton = ({ hasBackButton = false, children }: Props) => (
  <Container maxWidth="xl" sx={{ paddingTop: '1rem'}}>
    { hasBackButton ?
      (
        <ButtonSkeleton text sx={{ marginBottom: '0.2rem'}} />
      ) : null
    }
    <Skeleton
      variant="text"
      width="10rem"
      sx={{ marginBottom: '0.2rem', fontSize: '1.7rem' }}
    />
    { children }
  </Container>
);

export default GeneralContainerSkeleton;
