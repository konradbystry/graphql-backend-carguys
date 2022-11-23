import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#5893df",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#5893df",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.7)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.7)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5893df",
    },
  },
});
