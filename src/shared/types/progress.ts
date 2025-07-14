export interface Answer {
  isCorrect: boolean;
  questionId: string;
}

export interface Progress {
  id: string;
  answers: Record<string, Answer>; // map с questionId как ключом
  lastPractice: Date | unknown; // Firestore Timestamp
  score: number;
  studentId: string;
  topicId: string;
  userId: string;
  createdAt?: Date | unknown;
  updatedAt?: Date | unknown;
}

export interface ProgressFormData {
  answers: Record<string, Answer>;
  lastPractice: Date;
  score: number;
  studentId: string;
  topicId: string;
  userId: string;
}

export interface AnswerSubmission {
  questionId: string;
  isCorrect: boolean;
  topicId: string;
}