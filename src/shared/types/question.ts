export interface Question {
  id: string;
  text: string;
  difficulty: string;
  modelAnswer: string;
  educationalMaterialsText: string;
  educationalMaterialsLinks: string[];
  topicId: string;
  queue: number;
  createdAt?: Date | unknown;
  updatedAt?: Date | unknown;
}

export interface QuestionFormData {
  text: string;
  difficulty: string;
  modelAnswer: string;
  educationalMaterialsText: string;
  educationalMaterialsLinks: string[];
  topicId: string;
  queue: number;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy: 'Легкий',
  medium: 'Средний',
  hard: 'Сложный'
};

export const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  easy: '#4caf50',
  medium: '#ff9800', 
  hard: '#f44336'
};