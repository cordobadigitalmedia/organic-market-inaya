import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  //direction: 'rtl',
  palette: {
    primary: {
      main: '#394c6e',
    },
    secondary: {
      main: '#ffffff',
      dark: '#2e2e2e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
