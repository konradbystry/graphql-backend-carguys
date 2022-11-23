import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#5893df",
    },
    secondary: {
      main: "#2ec5d3",
    },
    background: {
      default: "#192231",
      paper: "#24344d",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
});
