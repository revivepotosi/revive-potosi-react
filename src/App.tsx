import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Loader from './components/loader/Loader';
import Navigation from './navigation/Navigation';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <Loader />
    </ThemeProvider>
  )
}

export default App;
