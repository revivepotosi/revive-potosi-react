import { Button } from '@mui/material';
import useCategory from '../hooks/useCategory';
import categoryStr from '../constants/categoryStr';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';

const Category = () => {
  const { language, goAddCategory } = useCategory();
  return (
    <GeneralContainer title={categoryStr[language.prefix].title}>
      <Button variant="contained" onClick={goAddCategory}>
        {categoryStr[language.prefix].addButton}
      </Button>
    </GeneralContainer>
  );
};

export default Category;
