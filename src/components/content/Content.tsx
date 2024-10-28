import { Box, Typography } from '@mui/material';
import colors from '../../style/colors';
import Image from '../image/Image';
import contentTypes from '../../constants/contentTypes';
import { ContentType } from '../../interfaces/content';

interface Props {
  type: ContentType;
  text?: string;
  imageSrc?: string;
  alt?: string;
  isDrag?: boolean;
}

const Content = ({ type, text = '', imageSrc = '', alt = '', isDrag = false }: Props) => {
  const getContent = () => {
    switch (type) {
      case contentTypes[0].id:
        return (
          <Typography variant="h6" color={colors.primary}>
            {text}
          </Typography>
        );
      case contentTypes[1].id:
        return (
          <Typography variant="subtitle2" color={colors.primary}>
            {text}
          </Typography>
        );
      case contentTypes[3].id:
        return (
          <Typography variant="body2">
            {text}
          </Typography>
        );
      default:
        return (
          <Image src={imageSrc} alt={alt}/>
        );
    }
  };

  return (
    <Box sx={{ marginBottom: isDrag ? '0rem' : '0.5rem', flexGrow: 1 }}>
      { getContent() }
    </Box>
  )
};

export default Content;
