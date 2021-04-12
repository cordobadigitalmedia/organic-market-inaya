import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  //direction: 'rtl',
  palette: {
    primary: {
      main: "#1f733c",
    },
    secondary: {
      main: "#a83a25",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: "#a83a25",
        color: "#fff",
      },
    },
  },
});

export default theme;
