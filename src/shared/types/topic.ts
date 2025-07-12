export interface Topic {
  id: string;
  name: string;
  planId: string;
  questionsCount: number;
  createdAt?: Date | unknown;
  updatedAt?: Date | unknown;
}

export interface TopicFormData {
  name: string;
  planId: string;
  questionsCount: number;
}