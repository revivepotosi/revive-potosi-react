import { Box, Typography } from '@mui/material';
import colors from '../../style/colors';

interface Props {
  title: string,
  subtitle?: string,
  imageLink: string,
}

const ImageBackgroundCard = ({ title, subtitle, imageLink }: Props) => (
  <Box
    sx={{
      backgroundImage: `url(${imageLink})`,
      borderRadius: '1rem',
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="0.25rem"
      sx={{
        backgroundColor: colors.primary_transparent,
        width: '100%',
        height: '10rem',
        padding: '1rem'
      }}
    >
      <Typography variant='h6' gutterBottom sx={{ marginBottom: '0', color: colors.white }}>
        {title}
      </Typography>
      { subtitle ? (
        <Typography variant='subtitle1' gutterBottom sx={{ marginBottom: '0', color: colors.white }}>
          {subtitle}
        </Typography>
        ) : null
      }
    </Box>
  </Box>
);

export default ImageBackgroundCard;
