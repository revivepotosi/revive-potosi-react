import { Box, Chip, ChipProps } from "@mui/material";

const defaultChips: ChipProps[] = [
  {
    label: 'Todos',
    color: 'secondary',
    variant: 'filled',
  },
  {
    label: 'Museos',
    color: 'secondary',
    variant: 'outlined',
  },
  {
    label: 'Iglesias',
    color: 'secondary',
    variant: 'outlined',
  },
  {
    label: 'Lugares',
    color: 'secondary',
    variant: 'outlined',
  },
];

interface Props {
  chips: ChipProps[];
};

const ChipGroup = ({ chips = defaultChips }: Props) => {
  return (
    <Box display="flex" component="section" sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
      { chips.map((chip, index) => <Chip key={index} color={chip.color} label={chip.label} variant={chip.variant} sx={{ marginRight: '0.4rem'}}/>)}
    </Box>
  );
};

export default ChipGroup;
