import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import Loader from './components/loader/Loader';
import Museum from './feature/museum/container/Museum';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Museum />
      <Loader />
    </ThemeProvider>
  )
}

export default App;
