import { createMuiTheme, colors } from "@material-ui/core";

import typography from "./typography";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: colors.common.white,
      paper: colors.common.white,
    },
  },
  typography,
});

export default theme;
