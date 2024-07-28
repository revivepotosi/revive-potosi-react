import { Button } from '@mui/material';
import useCategory from '../hooks/useCategory';
import categoryStr from '../constants/categoryStr';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import ImageBackgroundGroup from '../../../components/imageBackgroundGroup/ImageBackgroundGroup';
import ImageBackgroundGroupSkeleton from '../../../components/imageBackgroundGroup/ImageBackgroundGroupSkeleton';
import GeneralContainerSkeleton from '../../../components/generalContainer/GeneralContainerSkeleton';
import ButtonSkeleton from '../../../components/skeleton/ButtonSkeleton';

const Category = () => {
  const { language, loading, goAddCategory, categories } = useCategory();
  
  if (loading) return (
    <GeneralContainerSkeleton>
      <>
        <ButtonSkeleton />
        <ImageBackgroundGroupSkeleton />
      </>
    </GeneralContainerSkeleton>
  );

  return (
    <GeneralContainer title={categoryStr[language.prefix].title}>
      <>
        <Button variant="contained" onClick={goAddCategory}>
          {categoryStr[language.prefix].addButton}
        </Button>
        <ImageBackgroundGroup items={categories} />
      </>
    </GeneralContainer>
  );
};

export default Category;
