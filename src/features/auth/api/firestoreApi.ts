import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { UserData } from "../../../shared/types/user";
import { User } from "firebase/auth";

export const createUserInFirestore = async (
  user: User,
  groupId: string = "default_group",
  email: string,
  role: "student" | "teacher" = "student",
  studentNumber?: string
): Promise<void> => {
  try {
    // Валидация входных данных
    console.log("user----------", groupId);
    if (!user || !user.uid) {
      throw new Error("Invalid user object");
    }

    // Подготовка данных пользователя
    const userData: UserData = {
      email: email || "",
      studentId: user.uid,
      studentNumber: studentNumber || "",
      groupId,
      role,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    };

    // Создаём документ пользователя
    await setDoc(doc(db, "users", user.uid), userData);

    // Для студентов создаём начальный прогресс
    if (role === "student") {
      const progressData = {
        userId: user.uid,
        answers: {},
        score: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        groupId, // Добавляем groupId в прогресс
      };

      await setDoc(doc(db, "progress", `progress_${user.uid}`), progressData);
    }

    console.log("User document successfully created!");
  } catch (error) {
    console.error("Error in createUserInFirestore:", error);
    throw new Error(
      `Failed to create user: ${error instanceof Error ? error.message : String(error)}`
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
