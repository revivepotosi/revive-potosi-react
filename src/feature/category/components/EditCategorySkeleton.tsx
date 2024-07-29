import GeneralContainerSkeleton from '../../../components/generalContainer/GeneralContainerSkeleton';
import CardContainerSkeleton from '../../../components/cardContainer/CardContainerSkeleton';

const EditCategorySkeleton = () => (
  <GeneralContainerSkeleton hasBackButton>
    <CardContainerSkeleton />
  </GeneralContainerSkeleton>
);

export default EditCategorySkeleton;
