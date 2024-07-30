import GeneralContainerSkeleton from '../generalContainer/GeneralContainerSkeleton';
import CardContainerSkeleton from '../cardContainer/CardContainerSkeleton';

const SimpleFormSkeleton = () => (
  <GeneralContainerSkeleton hasBackButton>
    <CardContainerSkeleton />
  </GeneralContainerSkeleton>
);

export default SimpleFormSkeleton;
