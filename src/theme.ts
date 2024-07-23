import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A014F',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F99D03',
      contrastText: '#fff',
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        label: {
          fontWeight: 'bold',
        },
        outlined: {
          borderWidth: '2px'
        },
      },
    },
  },
});

export default theme;
