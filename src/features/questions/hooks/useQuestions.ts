import { useState, useEffect, useCallback } from "react";
import { Question } from "../../../shared/types/question";
import { getQuestionsByTopicId } from "../api/questionsApi";

export const useQuestions = (topicId: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = useCallback(async () => {
    if (!topicId) {
      setQuestions([]);
      return;
    }
    
    console.log("Загружаем вопросы для темы:", topicId);
    setIsLoading(true);
    setError(null);
    
    try {
      const questionsData = await getQuestionsByTopicId(topicId);
      console.log("Загружено вопросов:", questionsData.length);
      setQuestions(questionsData);
    } catch (error) {
      console.error("Ошибка при загрузке вопросов:", error);
      setError(error instanceof Error ? error.message : "Произошла ошибка");
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [topicId]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const refreshQuestions = useCallback(() => {
    loadQuestions();
  }, [loadQuestions]);

  return {
    questions,
    isLoading,
    error,
    refreshQuestions,
  };
};