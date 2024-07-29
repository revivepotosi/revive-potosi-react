import { Box } from '@mui/material';
import GeneralContainerSkeleton from '../../../components/generalContainer/GeneralContainerSkeleton';
import ButtonSkeleton from '../../../components/skeleton/ButtonSkeleton';
import CardContainerSkeleton from '../../../components/cardContainer/CardContainerSkeleton';

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
      <CardContainerSkeleton />
    </>
  </GeneralContainerSkeleton>
);

export default ViewCategorySkeleton;
