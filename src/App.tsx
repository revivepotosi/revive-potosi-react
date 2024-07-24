import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import Loader from './components/loader/Loader';
import Navigation from './navigation/Navigation';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Loader />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
