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
import { Topic, TopicFormData } from "../../../shared/types/topic";

const COLLECTION_NAME = "topics";

// Получить все темы для конкретного учебного плана
export const getTopicsByPlanId = async (planId: string): Promise<Topic[]> => {
  try {
    const topicsRef = collection(db, COLLECTION_NAME);
    const q = query(topicsRef, where("planId", "==", planId));
    const querySnapshot = await getDocs(q);

    const topics: Topic[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      topics.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Topic);
    });

    console.log(`Загружено тем для плана ${planId}:`, topics.length);
    return topics;
  } catch (error) {
    console.error("Ошибка при получении тем:", error);
    throw new Error(
      `Ошибка загрузки тем: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Получить все темы
export const getAllTopics = async (): Promise<Topic[]> => {
  try {
    const topicsRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(topicsRef);

    const topics: Topic[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      topics.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Topic);
    });

    console.log("Загружено всех тем:", topics.length);
    return topics;
  } catch (error) {
    console.error("Ошибка при получении всех тем:", error);
    throw new Error(
      `Ошибка загрузки тем: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Получить тему по ID
export const getTopicById = async (id: string): Promise<Topic | null> => {
  try {
    const topicRef = doc(db, COLLECTION_NAME, id);
    const topicDoc = await getDoc(topicRef);

    if (topicDoc.exists()) {
      const data = topicDoc.data();
      return {
        id: topicDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Topic;
    }

    return null;
  } catch (error) {
    console.error("Ошибка при получении темы:", error);
    throw new Error(
      `Ошибка загрузки темы: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Создать новую тему
export const createTopic = async (data: TopicFormData): Promise<Topic> => {
  try {
    const topicData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), topicData);

    return {
      id: docRef.id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Topic;
  } catch (error) {
    console.error("Ошибка при создании темы:", error);
    throw new Error(
      `Ошибка создания темы: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Обновить тему
export const updateTopic = async (
  id: string,
  data: Partial<TopicFormData>
): Promise<void> => {
  try {
    const topicRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(topicRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Ошибка при обновлении темы:", error);
    throw new Error(
      `Ошибка обновления темы: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Удалить тему
export const deleteTopic = async (id: string): Promise<void> => {
  try {
    const topicRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(topicRef);
  } catch (error) {
    console.error("Ошибка при удалении темы:", error);
    throw new Error(
      `Ошибка удаления темы: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};