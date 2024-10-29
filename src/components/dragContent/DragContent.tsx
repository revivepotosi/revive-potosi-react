import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import colors from '../../style/colors';
import { ContentType } from '../../interfaces/content';
import Content from '../content/Content';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  id: string;
  type: ContentType;
  onDelete: () => void;
  text?: string;
  imageSrc?: string;
  alt?: string;
}

const DragContent = ({ id, type, onDelete , text, imageSrc, alt }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '1rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: colors.background,
        backgroundColor: 'white',
        borderRadius: '1rem',
        marginBottom: '0.5rem',
      }}
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
        <IconButton aria-label="delete" color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
        <DragHandleIcon
          sx={{ cursor: 'grab' }}
          color="primary"
          {...attributes}
          {...listeners}
        />
      </Box>
    </Box>
  )
};

export default DragContent;
