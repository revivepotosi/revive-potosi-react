import { Box, Paper, SxProps, Theme } from '@mui/material';
import width from '../../style/width';

interface Props {
  children: JSX.Element;
  maxWidth?: string;
  sx?: SxProps<Theme>;
}

const CardContainer = ({ maxWidth = width.maxWidth, sx, children }: Props) => (
  <Box sx={{ paddingBottom: '1rem' }}>
    <Paper
      sx={{
        width: '100%',
        maxWidth,
        marginX: 'auto',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '1rem',
        ...sx,
      }}
    >
      { children }
    </Paper>
  </Box>
);

export default CardContainer;
