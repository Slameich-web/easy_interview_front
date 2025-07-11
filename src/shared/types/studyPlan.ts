export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  topics: string[];
  createdAt?: Date | unknown; // Date object or Firestore Timestamp
  updatedAt?: Date | unknown; // Date object or Firestore Timestamp
}

export interface StudyPlanFormData {
  name: string;
  description: string;
  topics: string[];
}