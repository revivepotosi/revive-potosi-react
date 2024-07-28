import { Button } from '@mui/material';
import useCategory from '../hooks/useCategory';
import categoryStr from '../constants/categoryStr';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import ImageBackgroundGroup from '../../../components/imageBackgroundGroup/ImageBackgroundGroup';
import CategorySkeleton from '../components/CategorySkeleton';

const Category = () => {
  const { language, loading, goAddCategory, goViewCategory, categories } = useCategory();
  
  if (loading) return <CategorySkeleton />;

  return (
    <GeneralContainer title={categoryStr[language.prefix].title}>
      <>
        <Button variant="contained" onClick={goAddCategory}>
          {categoryStr[language.prefix].addButton}
        </Button>
        <ImageBackgroundGroup items={categories} onClick={goViewCategory} />
      </>
    </GeneralContainer>
  );
};

export default Category;
