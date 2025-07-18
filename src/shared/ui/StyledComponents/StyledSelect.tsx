import { Select, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledSelect = styled(Select)({
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "16px",
  fontSize: "16px",
  fontWeight: 500,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: "2px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ffffff",
    boxShadow:
      "0 0 0 4px rgba(255, 255, 255, 0.3), 0 8px 25px rgba(0, 0, 0, 0.15)",
  },
  "&.Mui-focused": {
    backgroundColor: "#ffffff",
    transform: "translateY(-2px)",
  },
  "& .MuiSelect-select": {
    padding: "18px 24px",
    color: "#2c3e50",
  },
});

export const StyledFormControl = styled(FormControl)({
  "& .MuiInputLabel-root": {
    color: "#7f8c8d",
    fontWeight: 400,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2c3e50",
  },
  "& .MuiFormHelperText-root": {
    marginTop: "6px",
    fontSize: "13px",
    fontWeight: 500,
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#f44336",
  },
});