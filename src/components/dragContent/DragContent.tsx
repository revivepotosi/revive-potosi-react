import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import colors from '../../style/colors';
import { ContentType } from '../../interfaces/content';
import Content from '../content/Content';

interface Props {
  type: ContentType;
  onEdit: () => void;
  onDelete: () => void;
  text?: string;
  imageSrc?: string;
  alt?: string;
}

const DragContent = ({ type, onEdit, onDelete , text, imageSrc, alt }: Props) => {
  return (
    <Box
      sx={{ padding: '1rem', borderWidth: '1px', borderStyle: 'solid', borderColor: colors.background, borderRadius: '1rem', marginBottom: '0.5rem'}}
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Content
        type={type}
        text={text}
        imageSrc={imageSrc}
        alt={alt}
        isDrag
      />
      <Box display="flex" alignItems="center" gap="0.2rem" sx={{ marginLeft: '0.5rem' }}>
        <Box display="flex" sx={{ flexDirection: { xs: 'column', lg: 'row' } }}>
          <IconButton aria-label="edit" color="info" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <DragHandleIcon color="primary" />
      </Box>
    </Box>
  )
};

export default DragContent;
