export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  topics: string[];
  createdAt?: unknown; // Firestore Timestamp
  updatedAt?: unknown; // Firestore Timestamp
}

export interface StudyPlanFormData {
  name: string;
  description: string;
  topics: string[];
}