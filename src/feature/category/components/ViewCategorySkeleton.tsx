import { Box, Skeleton } from '@mui/material';
import GeneralContainerSkeleton from '../../../components/generalContainer/GeneralContainerSkeleton';
import ButtonSkeleton from '../../../components/skeleton/ButtonSkeleton';

const ViewCategorySkeleton = () => (
  <GeneralContainerSkeleton hasBackButton>
    <>
      <Box
        display="flex"
        gap="0.5rem"
      >
        <ButtonSkeleton width="6rem" />
        <ButtonSkeleton width="6rem" />
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: '1rem' }}>
        <Skeleton
          variant="text"
          width="13rem"
          sx={{ marginBottom: '0.2rem', fontSize: '1.5rem' }}
        />
        <Skeleton
          variant="text"
          width="8rem"
          sx={{ marginBottom: '0.2rem', fontSize: '1.2rem' }}
        />
        <Skeleton
          variant="text"
          width="11rem"
          sx={{ marginBottom: '0.2rem', fontSize: '1.5rem' }}
        />
        <Skeleton
          variant="text"
          width="10rem"
          sx={{ marginBottom: '0.2rem', fontSize: '1.2rem' }}
        />
      </Box>
    </>
  </GeneralContainerSkeleton>
);

export default ViewCategorySkeleton;
