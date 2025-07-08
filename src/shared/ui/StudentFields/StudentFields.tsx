import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AVAILABLE_GROUPS, STUDENT_NUMBER_PLACEHOLDER } from "../../constants/groups";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "16px",
    fontSize: "16px",
    fontWeight: 500,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
      boxShadow:
        "0 0 0 4px rgba(255, 255, 255, 0.3), 0 8px 25px rgba(0, 0, 0, 0.15)",
    },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
      transform: "translateY(-2px)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#7f8c8d",
    fontWeight: 400,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2c3e50",
  },
  "& .MuiOutlinedInput-input": {
    padding: "18px 24px",
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

const StyledSelect = styled(Select)({
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

const StyledFormControl = styled(FormControl)({
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

interface StudentFieldsProps {
  studentNumber: string;
  selectedGroup: string;
  studentNumberError: string;
  groupError: string;
  onStudentNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGroupChange: (event: SelectChangeEvent<string>) => void;
  disabled?: boolean;
  isRequired?: boolean;
}

export const StudentFields = ({
  studentNumber,
  selectedGroup,
  studentNumberError,
  groupError,
  onStudentNumberChange,
  onGroupChange,
  disabled = false,
  isRequired = false,
}: StudentFieldsProps) => {
  const requiredMark = isRequired ? " *" : "";

  return (
    <>
      <StyledTextField
        type="text"
        value={studentNumber}
        onChange={onStudentNumberChange}
        placeholder={`Номер студенческого билета${requiredMark}`}
        disabled={disabled}
        error={!!studentNumberError}
        helperText={studentNumberError || STUDENT_NUMBER_PLACEHOLDER}
        fullWidth
        variant="outlined"
      />

      <StyledFormControl fullWidth>
        <InputLabel error={!!groupError}>
          Группа{requiredMark}
        </InputLabel>
        <StyledSelect
          value={selectedGroup}
          onChange={onGroupChange}
          label={`Группа${requiredMark}`}
          disabled={disabled}
          error={!!groupError}
        >
          {AVAILABLE_GROUPS.map((group) => (
            <MenuItem key={group.value} value={group.value}>
              {group.label}
            </MenuItem>
          ))}
        </StyledSelect>
        <FormHelperText error={!!groupError}>
          {groupError || "Выберите вашу группу"}
        </FormHelperText>
      </StyledFormControl>
    </>
  );
};