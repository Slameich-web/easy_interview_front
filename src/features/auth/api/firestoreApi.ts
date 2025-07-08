import { 
  doc, 
  setDoc, 
  getDoc,
  Timestamp 
} from "firebase/firestore";
import { db } from "../../../firebase";
import { UserData } from "../../../shared/types/user";
import { generateStudentId } from "../../../shared/utils/studentIdGenerator";
import { DEFAULT_GROUP } from "../../../shared/constants/groups";

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
      createdAt: Timestamp.now(),
      role,
    };

    // Сохраняем пользователя с UID как ID документа
    await setDoc(userDocRef, userData);
    
    console.log("Пользователь успешно создан в Firestore:", {
      uid,
      studentId,
      email,
    });
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
export const getUserFromFirestore = async (uid: string): Promise<UserData | null> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
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
  updates: Partial<Omit<UserData, 'createdAt'>>
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