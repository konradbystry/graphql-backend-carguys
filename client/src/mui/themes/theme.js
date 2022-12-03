import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      // main: "#5893df",
      main: "#1a1a1a",
    },
    secondary: {
      // main: "#2ec5d3",
      main: "#484848",
    },
    background: {
      // default: "#192231",
      default: "#1a1a1a",
      // paper: "#24344d",
      paper: "#484848",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
});
