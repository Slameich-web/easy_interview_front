import { useState, useEffect, useCallback } from "react";
import { StudyPlan } from "../../../shared/types/studyPlan";
import { getAllStudyPlans } from "../api/studyPlansApi";

// Тестовые данные для демонстрации
const MOCK_STUDY_PLANS: StudyPlan[] = [
  {
    id: "1",
    name: "React для начинающих",
    description: "Изучите основы React.js с нуля. Создавайте интерактивные пользовательские интерфейсы с помощью компонентов, состояния и хуков.",
    topics: ["JSX", "Компоненты", "Props", "State", "Hooks", "Event Handling", "Conditional Rendering", "Lists"],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: "2", 
    name: "TypeScript Advanced",
    description: "Продвинутые концепции TypeScript для профессиональной разработки. Типы, дженерики, декораторы и многое другое.",
    topics: ["Generic Types", "Utility Types", "Decorators", "Modules", "Namespaces", "Advanced Types", "Type Guards", "Conditional Types"],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: "3",
    name: "Node.js Backend",
    description: "Создание серверных приложений с Node.js. Express, базы данных, аутентификация и развертывание.",
    topics: ["Express.js", "MongoDB", "Authentication", "REST API", "Middleware", "Error Handling", "Testing", "Deployment"],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: "4",
    name: "Vue.js Fundamentals", 
    description: "Основы Vue.js фреймворка. Реактивность, компоненты, роутинг и управление состоянием с Vuex.",
    topics: ["Vue Instance", "Templates", "Directives", "Components", "Vue Router", "Vuex", "Composition API", "Lifecycle"],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: "5",
    name: "Python для Data Science",
    description: "Анализ данных с Python. Pandas, NumPy, Matplotlib и машинное обучение с scikit-learn.",
    topics: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "Data Cleaning", "Machine Learning", "Scikit-learn"],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: "6",
    name: "Docker & DevOps",
    description: "Контейнеризация приложений с Docker. CI/CD, Kubernetes и современные DevOps практики.",
    topics: ["Docker", "Dockerfile", "Docker Compose", "Kubernetes", "CI/CD", "GitHub Actions", "AWS", "Monitoring"],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
];

export const useStudyPlans = () => {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStudyPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Пытаемся загрузить из Firestore
      try {
        const plans = await getAllStudyPlans();
        setStudyPlans(plans.length > 0 ? plans : MOCK_STUDY_PLANS);
      } catch (firestoreError) {
        // Если Firestore недоступен, используем тестовые данные
        console.warn("Firestore недоступен, используем тестовые данные:", firestoreError);
        setStudyPlans(MOCK_STUDY_PLANS);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Произошла ошибка");
      // В случае ошибки тоже показываем тестовые данные
      setStudyPlans(MOCK_STUDY_PLANS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudyPlans();
  }, [loadStudyPlans]);

  const refreshStudyPlans = useCallback(() => {
    loadStudyPlans();
  }, [loadStudyPlans]);

  return {
    studyPlans,
    isLoading,
    error,
    refreshStudyPlans,
  };
};