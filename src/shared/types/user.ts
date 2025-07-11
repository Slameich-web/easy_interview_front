export interface UserData {
  email: string;
  studentId: string;
  studentNumber?: string;
  groupId: string;
  createdAt: Date | unknown; // Date object or Firestore Timestamp
  role?: "student" | "teacher";
}

export interface AuthCredentials {
  email: string;
  password: string;
  groupId?: string;
  studentNumber?: string;
  role?: "student" | "teacher";
}

export interface AuthResult {
  user: {
    uid: string;
    email: string | null;
    refreshToken: string;
  };
}

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

export interface FormValidationState {
  email: string;
  password: string;
  confirmPassword: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  isFormValid: boolean;
}

export interface StudentFormData {
  selectedGroup: string;
  groupError: string;
  studentNumber: string;
  studentNumberError: string;
}
