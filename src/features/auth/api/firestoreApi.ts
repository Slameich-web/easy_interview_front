import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { UserData } from "../../../shared/types/user";
import { generateStudentId } from "../../../shared/utils/studentIdGenerator";
import { DEFAULT_GROUP } from "../../../shared/constants/groups";
import { Progress } from "../../../shared/types/progress";

// Создание пользователя в Firestore
export const createUserInFirestore = async (
  uid: string,
  email: string,
  groupId?: string,
  role: "student" | "teacher" = "student",
  studentNumber?: string
): Promise<void> => {
  try {
    // Проверяем, существует ли уже пользователь
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("Пользователь уже существует в Firestore");
      return;
    }

    // Генерируем уникальный студенческий ID
    const studentId = await generateStudentId();

    // Создаем данные пользователя
    const userData: UserData = {
      email,
      studentId,
      studentNumber: studentNumber || undefined,
      groupId: groupId || DEFAULT_GROUP,
      createdAt: serverTimestamp(),
      role,
    };

    // Сохраняем пользователя с UID как ID документа
    await setDoc(userDocRef, userData);
    // Создаем начальный прогресс для пользователя
    if (role === "student") {
      const initialProgress: Progress = {
        id: `${uid}_default`,
        answers: {},
        score: 0,
        lastPractice: null,
        studentId,
        userId: uid,
        topicId: "default_topic", // Или другой начальный topicId
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const progressRef = doc(db, "progress", initialProgress.id);
      await setDoc(progressRef, initialProgress);
    }

    console.log(
      "Пользователь и начальный прогресс успешно созданы в Firestore:",
      {
        uid,
        studentId,
        email,
      }
    );
  } catch (error) {
    console.error("Ошибка при создании пользователя в Firestore:", error);
    throw new Error(
      `Ошибка создания профиля пользователя: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Получение данных пользователя из Firestore
export const getUserFromFirestore = async (
  uid: string
): Promise<UserData | null> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();

      // Преобразуем Firestore Timestamp в обычную дату для сериализации
      return {
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
      } as UserData;
    }

    return null;
  } catch (error) {
    console.error("Ошибка при получении пользователя из Firestore:", error);
    throw new Error(
      `Ошибка получения данных пользователя: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Обновление данных пользователя
export const updateUserInFirestore = async (
  uid: string,
  updates: Partial<Omit<UserData, "createdAt">>
): Promise<void> => {
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, updates, { merge: true });

    console.log("Данные пользователя обновлены:", updates);
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    throw new Error(
      `Ошибка обновления данных пользователя: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};
