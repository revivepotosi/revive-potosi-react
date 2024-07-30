import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import colors from '../../style/colors';

interface Props {
  title: string;
  subtitle?: string;
  imageLink: string;
  onClick: () => void;
}

const ImageBackgroundCard = ({ title, subtitle, imageLink, onClick }: Props) => (
  <Card
    sx={{
      backgroundImage: `url(${imageLink})`,
      borderRadius: '1rem',
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    }}
    
  >
    <CardActionArea onClick={onClick}>
      <CardContent
        sx={{
          backgroundColor: colors.primary_transparent,
          width: '100%',
          height: '10rem',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.25rem',
        }}
      >
        <Typography variant='h6' textAlign="center" color={colors.white}>
          {title}
        </Typography>
        { subtitle ? (
          <Typography variant='subtitle1' textAlign="center" color={colors.white}>
            {subtitle}
          </Typography>
          ) : null
        }
      </CardContent>
    </CardActionArea>
  </Card>
);

export default ImageBackgroundCard;
