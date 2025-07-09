import {
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { AVAILABLE_GROUPS } from "../../constants/groups";
import { StyledTextField, StyledSelect, StyledFormControl } from "../StyledComponents";

interface StudentFieldsProps {
  studentNumber: string;
  selectedGroup: string;
  studentNumberError: string;
  groupError: string;
  onStudentNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGroupChange: (event: SelectChangeEvent<unknown>) => void;
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
        style={{ height: "86px" }}
        value={studentNumber}
        onChange={onStudentNumberChange}
        placeholder={`Номер студенческого билета${requiredMark}`}
        disabled={disabled}
        error={!!studentNumberError}
        helperText={studentNumberError}
        fullWidth
        variant="outlined"
      />

      <StyledFormControl fullWidth>
        <InputLabel error={!!groupError}>Группа{requiredMark}</InputLabel>
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
        <FormHelperText error={!!groupError}>{groupError}</FormHelperText>
      </StyledFormControl>
    </>
  );
};
