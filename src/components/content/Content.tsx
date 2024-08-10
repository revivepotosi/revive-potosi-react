import { Typography } from '@mui/material';
import colors from '../../style/colors';
import Image from '../image/Image';
import contentTypes from '../../constants/contentTypes';
import { ContentType } from '../../interfaces/content';

interface Props {
  type: ContentType;
  text?: string;
  imageSrc?: string;
  alt?: string;
}

const Content = ({ type, text = '', imageSrc = '', alt = '' }: Props) => {
  if( type === contentTypes[0].id) return (
    <Typography variant="h6" gutterBottom color={colors.primary}>
      {text}
    </Typography>
  );
  if( type === contentTypes[1].id) return (
    <Typography variant="subtitle2" gutterBottom color={colors.primary}>
      {text}
    </Typography>
  );
  if( type === contentTypes[3].id) return (
    <Typography variant="body2" gutterBottom>
      {text}
    </Typography>
  );
  return (
    <Image src={imageSrc} alt={alt} style={{ marginBottom: '0.5rem'}}/>
  );
};

export default Content;
