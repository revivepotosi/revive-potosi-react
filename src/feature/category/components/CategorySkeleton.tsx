import GeneralContainerSkeleton from '../../../components/generalContainer/GeneralContainerSkeleton';
import ImageBackgroundGroupSkeleton from '../../../components/imageBackgroundGroup/ImageBackgroundGroupSkeleton';
import ButtonSkeleton from '../../../components/skeleton/ButtonSkeleton';

const CategorySkeleton = () => (
  <GeneralContainerSkeleton>
    <>
      <ButtonSkeleton />
      <ImageBackgroundGroupSkeleton />
    </>
  </GeneralContainerSkeleton>
);

export default CategorySkeleton;
