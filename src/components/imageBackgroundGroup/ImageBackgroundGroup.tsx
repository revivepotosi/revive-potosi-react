import { useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import { RootState } from '../../app/store';
import ImageBackgroundCard from '../imageBackgroundCard/ImageBackgroundCard';
import Category from '../../feature/category/interfaces/category';

interface Props {
  items: Category[],
  onClick: (string: string) => () => void;
}

const ImageBackgroundGroup = ({ items, onClick }: Props) => {
  const language = useSelector((state: RootState) => state.language.language);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        columns={{ xs: 2, sm: 4, md: 6 }}
        sx={{ paddingY: '1rem'}}
      >
        {items.map((item) => (
          <Grid item xs={2} key={item.id}>
            <ImageBackgroundCard title={item.text[language.prefix].name}  imageLink={item.image.url} onClick={onClick(item.id ?? '')} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageBackgroundGroup;
