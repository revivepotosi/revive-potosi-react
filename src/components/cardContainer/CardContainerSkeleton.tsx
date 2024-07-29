import { Skeleton } from '@mui/material';
import width from '../../style/width';

const CardContainerSkeleton = () => (
  <Skeleton
    variant="rounded"
    width="100%" 
    height="16rem"
    sx={{ marginTop: '1rem', borderRadius: '1rem', maxWidth: width.maxWidth, marginX: 'auto'}}
  />
);

export default CardContainerSkeleton;
