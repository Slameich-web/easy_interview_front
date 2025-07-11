import { useState, useEffect, useCallback } from "react";
import { StudyPlan } from "../../../shared/types/studyPlan";
import { getAllStudyPlans } from "../api/studyPlansApi";

export const useStudyPlans = () => {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStudyPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const plans = await getAllStudyPlans();
      setStudyPlans(plans);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Произошла ошибка");
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