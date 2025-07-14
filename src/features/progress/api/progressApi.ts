import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Progress, Answer } from "../../../shared/types/progress";

const COLLECTION_NAME = "progress";

// Получить прогресс пользователя по теме
export const getProgressByUserAndTopic = async (
  userId: string,
  topicId: string
): Promise<Progress | null> => {
  try {
    console.log(
      "API: Получаем прогресс для пользователя:",
      userId,
      "тема:",
      topicId
    );

    const progressRef = collection(db, COLLECTION_NAME);
    const q = query(
      progressRef,
      where("userId", "==", userId),
      where("topicId", "==", topicId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      const progress = {
        id: doc.id,
        ...data,
        lastPractice: data.lastPractice?.toDate?.() || data.lastPractice,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Progress;

      console.log("API: Найден прогресс:", progress);
      return progress;
    }

    console.log("API: Прогресс не найден");
    return null;
  } catch (error) {
    console.error("Ошибка при получении прогресса:", error);
    throw new Error(
      `Ошибка загрузки прогресса: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Создать или обновить прогресс
export const upsertProgress = async (
  userId: string,
  topicId: string,
  studentId: string,
  newAnswer: Answer | null, // Может быть null при сбросе
  currentScore: number,
  questionIdToRemove?: string // Новый параметр для удаления вопроса
): Promise<void> => {
  try {
    console.log("API: Обновляем прогресс:", {
      userId,
      topicId,
      newAnswer,
      currentScore,
      questionIdToRemove,
    });

    // Получаем существующий прогресс
    const existingProgress = await getProgressByUserAndTopic(userId, topicId);

    let updatedAnswers: Record<string, Answer> = {};
    let progressId: string;

    if (existingProgress) {
      // Копируем существующие ответы
      updatedAnswers = { ...existingProgress.answers };

      // Удаляем вопрос, если нужно
      if (questionIdToRemove && updatedAnswers[questionIdToRemove]) {
        delete updatedAnswers[questionIdToRemove];
      }

      // Добавляем новый ответ (если он есть)
      if (newAnswer) {
        updatedAnswers[newAnswer.questionId] = newAnswer;
      }

      progressId = existingProgress.id;
    } else {
      // Создаем новый прогресс только если есть новый ответ
      if (!newAnswer) {
        throw new Error("Нельзя создать пустой прогресс");
      }
      updatedAnswers = {
        [newAnswer.questionId]: newAnswer,
      };
      progressId = `${userId}_${topicId}`;
    }

    const progressData = {
      answers: updatedAnswers,
      lastPractice: serverTimestamp(),
      score: currentScore,
      studentId,
      topicId,
      userId,
      updatedAt: serverTimestamp(),
      ...(existingProgress ? {} : { createdAt: serverTimestamp() }),
    };

    const progressRef = doc(db, COLLECTION_NAME, progressId);
    await setDoc(progressRef, progressData, { merge: true });

    console.log("API: Прогресс успешно обновлен");
  } catch (error) {
    console.error("Ошибка при обновлении прогресса:", error);
    throw new Error(
      `Ошибка сохранения прогресса: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Новая функция: сбросить прогресс по конкретному вопросу
export const resetQuestionProgress = async (
  userId: string,
  topicId: string,
  studentId: string,
  questionId: string
): Promise<void> => {
  try {
    console.log("API: Сбрасываем прогресс по вопросу:", questionId);

    // Получаем текущий прогресс
    const existingProgress = await getProgressByUserAndTopic(userId, topicId);
    if (!existingProgress || !existingProgress.answers[questionId]) {
      console.log("Прогресс по вопросу не найден, ничего сбрасывать не нужно");
      return;
    }

    // Удаляем вопрос и пересчитываем счет
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [questionId]: _, ...remainingAnswers } = existingProgress.answers;
    const correctAnswers = Object.values(remainingAnswers).filter(
      (a) => a.isCorrect
    ).length;
    const totalAnswers = Object.keys(remainingAnswers).length;
    const newScore =
      totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

    // Обновляем с null вместо нового ответа и указанием вопроса для удаления
    await upsertProgress(
      userId,
      topicId,
      studentId,
      null,
      newScore,
      questionId
    );

    console.log("API: Прогресс по вопросу успешно сброшен");
  } catch (error) {
    console.error("Ошибка при сбросе прогресса по вопросу:", error);
    throw new Error(
      `Ошибка сброса прогресса: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Получить все прогрессы пользователя
export const getAllProgressByUser = async (
  userId: string
): Promise<Progress[]> => {
  try {
    const progressRef = collection(db, COLLECTION_NAME);
    const q = query(progressRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const progresses: Progress[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      progresses.push({
        id: doc.id,
        ...data,
        lastPractice: data.lastPractice?.toDate?.() || data.lastPractice,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Progress);
    });

    console.log("Загружено прогрессов пользователя:", progresses.length);
    return progresses;
  } catch (error) {
    console.error("Ошибка при получении прогрессов:", error);
    throw new Error(
      `Ошибка загрузки прогрессов: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};
