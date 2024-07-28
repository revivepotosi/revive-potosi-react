import { Box, Grid } from '@mui/material';
import ImageBackgroundCardSkeleton from '../imageBackgroundCard/ImageBackgroundCardSkeleton';

const ImageBackgroundGroupSkeleton = () => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid
      container
      spacing={2}
      columns={{ xs: 2, sm: 4, md: 6 }}
      sx={{ paddingY: '1rem'}}
    >
      <Grid item xs={2} >
        <ImageBackgroundCardSkeleton />
      </Grid>
      <Grid item xs={2} >
        <ImageBackgroundCardSkeleton />
      </Grid>
      <Grid item xs={2} >
        <ImageBackgroundCardSkeleton />
      </Grid>
      <Grid item xs={2} >
        <ImageBackgroundCardSkeleton />
      </Grid>
    </Grid>
  </Box>
);

export default ImageBackgroundGroupSkeleton;
