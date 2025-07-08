import { useState, useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";
import { StudentFormData } from "../types/user";

interface UseStudentFormProps {
  isRequired?: boolean;
}

export const useStudentForm = ({ isRequired = false }: UseStudentFormProps = {}) => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupError, setGroupError] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentNumberError, setStudentNumberError] = useState("");

  const handleGroupChange = useCallback((event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedGroup(value);
    
    if (value || !isRequired) {
      setGroupError("");
    } else if (isRequired && !value) {
      setGroupError("Выбор группы обязателен");
    }
  }, [isRequired]);

  const handleStudentNumberChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStudentNumber(value);
    
    if (isRequired) {
      if (!value.trim()) {
        setStudentNumberError("Номер студенческого билета обязателен");
      } else {
        setStudentNumberError("");
      }
    }
  }, [isRequired]);

  const validateStudentFields = useCallback(() => {
    if (!isRequired) return true;
    
    let isValid = true;
    
    if (!studentNumber.trim()) {
      setStudentNumberError("Номер студенческого билета обязателен");
      isValid = false;
    }
    
    if (!selectedGroup) {
      setGroupError("Выбор группы обязателен");
      isValid = false;
    }
    
    return isValid;
  }, [isRequired, studentNumber, selectedGroup]);

  const resetStudentForm = useCallback(() => {
    setSelectedGroup("");
    setGroupError("");
    setStudentNumber("");
    setStudentNumberError("");
  }, []);

  const isStudentFormValid = !isRequired || (
    selectedGroup && 
    studentNumber.trim() && 
    !studentNumberError && 
    !groupError
  );

  return {
    // Values
    selectedGroup,
    studentNumber,
    
    // Errors
    groupError,
    studentNumberError,
    
    // Handlers
    handleGroupChange,
    handleStudentNumberChange,
    
    // Validation
    validateStudentFields,
    isStudentFormValid,
    resetStudentForm,
  };
};