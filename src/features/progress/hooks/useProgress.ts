import { useState, useEffect, useCallback } from "react";
import { Progress, Answer } from "../../../shared/types/progress";
import { getProgressByUserAndTopic, upsertProgress } from "../api/progressApi";
import { useAuth } from "../../../shared/hooks/useAuth";

export const useProgress = (topicId: string) => {
  const { id: userId, userData } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProgress = useCallback(async () => {
    if (!userId || !topicId) {
      setProgress(null);
      return;
    }

    console.log(
      "Загружаем прогресс для пользователя:",
      userId,
      "тема:",
      topicId
    );
    setIsLoading(true);
    setError(null);

    try {
      const progressData = await getProgressByUserAndTopic(userId, topicId);
      console.log("Загружен прогресс:", progressData);
      setProgress(progressData);
    } catch (error) {
      console.error("Ошибка при загрузке прогресса:", error);
      setError(error instanceof Error ? error.message : "Произошла ошибка");
      setProgress(null);
    } finally {
      setIsLoading(false);
    }
  }, [userId, topicId]);

  const submitAnswer = useCallback(
    async (questionId: string, isCorrect: boolean) => {
      if (!userId || !topicId || !userData?.studentId) {
        throw new Error("Недостаточно данных для сохранения ответа");
      }

      console.log("Отправляем ответ:", { questionId, isCorrect });

      try {
        const newAnswer: Answer = { questionId, isCorrect };

        // Вычисляем новый счет
        const currentAnswers = progress?.answers || {};
        const updatedAnswers = { ...currentAnswers, [questionId]: newAnswer };
        const correctAnswers = Object.values(updatedAnswers).filter(
          (a) => a.isCorrect
        ).length;
        const totalAnswers = Object.keys(updatedAnswers).length;
        const newScore =
          totalAnswers > 0
            ? Math.round((correctAnswers / totalAnswers) * 100)
            : 0;

        await upsertProgress(
          userId,
          topicId,
          userData.studentId,
          newAnswer,
          newScore
        );

        // Обновляем локальное состояние
        setProgress((prev) => ({
          id: prev?.id || `${userId}_${topicId}`,
          answers: updatedAnswers,
          lastPractice: new Date(),
          score: newScore,
          studentId: userData.studentId,
          topicId,
          userId,
          createdAt: prev?.createdAt || new Date(),
          updatedAt: new Date(),
        }));

        console.log("Ответ успешно сохранен, новый счет:", newScore);
      } catch (error) {
        console.error("Ошибка при сохранении ответа:", error);
        throw error;
      }
    },
    [userId, topicId, userData?.studentId, progress?.answers]
  );

  const resetQuestionProgress = useCallback(
    async (questionId: string) => {
      if (!userId || !topicId || !userData?.studentId) {
        throw new Error("Недостаточно данных для сброса прогресса");
      }

      console.log("Сбрасываем прогресс по вопросу:", questionId);

      try {
        // Удаляем ответ на конкретный вопрос
        const currentAnswers = progress?.answers || {};
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [questionId]: _, ...remainingAnswers } = currentAnswers;

        // Пересчитываем счет
        const correctAnswers = Object.values(remainingAnswers).filter(
          (a) => a.isCorrect
        ).length;
        const totalAnswers = Object.keys(remainingAnswers).length;
        const newScore =
          totalAnswers > 0
            ? Math.round((correctAnswers / totalAnswers) * 100)
            : 0;

        await upsertProgress(
          userId,
          topicId,
          userData.studentId,
          null, // Передаем null вместо нового ответа
          newScore
        );

        // Обновляем локальное состояние
        setProgress((prev) => ({
          id: prev?.id || `${userId}_${topicId}`,
          answers: remainingAnswers,
          lastPractice: new Date(),
          score: newScore,
          studentId: userData.studentId,
          topicId,
          userId,
          createdAt: prev?.createdAt || new Date(),
          updatedAt: new Date(),
        }));

        console.log("Прогресс по вопросу сброшен, новый счет:", newScore);
      } catch (error) {
        console.error("Ошибка при сбросе прогресса:", error);
        throw error;
      }
    },
    [userId, topicId, userData?.studentId, progress?.answers]
  );

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const refreshProgress = useCallback(() => {
    loadProgress();
  }, [loadProgress]);

  // Получить ответ на конкретный вопрос
  const getAnswerForQuestion = useCallback(
    (questionId: string): Answer | null => {
      return progress?.answers?.[questionId] || null;
    },
    [progress?.answers]
  );

  return {
    progress,
    isLoading,
    error,
    submitAnswer,
    refreshProgress,
    getAnswerForQuestion,
    resetQuestionProgress,
  };
};
