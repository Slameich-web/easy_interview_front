import { useState, useEffect, useCallback } from "react";
import { Topic } from "../../../shared/types/topic";
import { getTopicsByPlanId } from "../api/topicsApi";

export const useTopics = (planId: string) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTopics = useCallback(async () => {
    if (!planId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const topicsData = await getTopicsByPlanId(planId);
      setTopics(topicsData);
    } catch (error) {
      console.error("Ошибка при загрузке тем:", error);
      setError(error instanceof Error ? error.message : "Произошла ошибка");
      setTopics([]);
    } finally {
      setIsLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  const refreshTopics = useCallback(() => {
    loadTopics();
  }, [loadTopics]);

  return {
    topics,
    isLoading,
    error,
    refreshTopics,
  };
};