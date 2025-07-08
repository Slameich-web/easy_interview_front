import { 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDoc,
  query,
  where,
  getDocs,
  Timestamp 
} from "firebase/firestore";
import { db } from "../../../firebase";

export interface UserData {
  email: string;
  studentId: string;
  studentNumber?: string;
  groupId: string;
  createdAt: Timestamp;
  role?: "student" | "teacher";
}

// Генерация уникального студенческого ID
const generateStudentId = async (): Promise<string> => {
  const currentYear = new Date().getFullYear();
  const baseId = `ST-${currentYear}-`;
  
  // Получаем всех пользователей с ID текущего года
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("studentId", ">=", baseId), where("studentId", "<", `ST-${currentYear + 1}-`));
  const querySnapshot = await getDocs(q);
  
  // Находим максимальный номер
  let maxNumber = 0;
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const idParts = data.studentId.split("-");
    if (idParts.length === 3) {
      const number = parseInt(idParts[2], 10);
      if (number > maxNumber) {
        maxNumber = number;
      }
    }
  });
  
  // Генерируем новый ID
  const newNumber = maxNumber + 1;
  return `${baseId}${newNumber.toString().padStart(3, "0")}`;
};

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
      groupId: groupId || "group_fe2024", // Fallback на дефолтную группу
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