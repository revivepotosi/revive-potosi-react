import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Experience from '../../interfaces/Experiences';
import { RootState } from '../../app/store';
import { Alert, IconButton } from '@mui/material';
import width from '../../style/width';
import experienceTableStr from '../../constants/experienceTableStr';

interface Props {
  experiences: Experience[];
  emptyMessage: string;
  onDelete: (experience: Experience) => () => void;
};

const ExperienceTable = ({ experiences, emptyMessage, onDelete }: Props) => {
  const language = useSelector((state: RootState) => state.language.language);

  if (experiences.length === 0) return (
    <Alert variant="filled" severity="info" sx={{ marginTop: '1rem' }}>
      { emptyMessage }
    </Alert>
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        maxWidth: width.maxWidth,
        marginX: 'auto',
        backgroundColor: 'white',
        marginTop: '1rem'
      }}
    >
      <Table aria-label="experience table">
        <TableHead>
          <TableRow>
            <TableCell>{experienceTableStr[language.prefix].name}</TableCell>
            <TableCell align="right">{experienceTableStr[language.prefix].options}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {experiences.map((experience) => (
            <TableRow
              key={experience.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                { experience.text[language.prefix].name }
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" color="error" onClick={onDelete(experience)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExperienceTable;
