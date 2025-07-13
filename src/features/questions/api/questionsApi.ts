import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Question, QuestionFormData } from "../../../shared/types/question";

const COLLECTION_NAME = "questions";

// Получить все вопросы для конкретной темы
export const getQuestionsByTopicId = async (topicId: string): Promise<Question[]> => {
  try {
    const questionsRef = collection(db, COLLECTION_NAME);
    const q = query(questionsRef, where("topicId", "==", topicId));
    const querySnapshot = await getDocs(q);

    const questions: Question[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      questions.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Question);
    });

    console.log(`Загружено вопросов для темы ${topicId}:`, questions.length);
    return questions;
  } catch (error) {
    console.error("Ошибка при получении вопросов:", error);
    throw new Error(
      `Ошибка загрузки вопросов: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Получить все вопросы
export const getAllQuestions = async (): Promise<Question[]> => {
  try {
    const questionsRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(questionsRef);

    const questions: Question[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      questions.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Question);
    });

    console.log("Загружено всех вопросов:", questions.length);
    return questions;
  } catch (error) {
    console.error("Ошибка при получении всех вопросов:", error);
    throw new Error(
      `Ошибка загрузки вопросов: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Получить вопрос по ID
export const getQuestionById = async (id: string): Promise<Question | null> => {
  try {
    const questionRef = doc(db, COLLECTION_NAME, id);
    const questionDoc = await getDoc(questionRef);

    if (questionDoc.exists()) {
      const data = questionDoc.data();
      return {
        id: questionDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Question;
    }

    return null;
  } catch (error) {
    console.error("Ошибка при получении вопроса:", error);
    throw new Error(
      `Ошибка загрузки вопроса: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Создать новый вопрос
export const createQuestion = async (data: QuestionFormData): Promise<Question> => {
  try {
    const questionData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), questionData);

    return {
      id: docRef.id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Question;
  } catch (error) {
    console.error("Ошибка при создании вопроса:", error);
    throw new Error(
      `Ошибка создания вопроса: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Обновить вопрос
export const updateQuestion = async (
  id: string,
  data: Partial<QuestionFormData>
): Promise<void> => {
  try {
    const questionRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(questionRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Ошибка при обновлении вопроса:", error);
    throw new Error(
      `Ошибка обновления вопроса: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Удалить вопрос
export const deleteQuestion = async (id: string): Promise<void> => {
  try {
    const questionRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(questionRef);
  } catch (error) {
    console.error("Ошибка при удалении вопроса:", error);
    throw new Error(
      `Ошибка удаления вопроса: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};