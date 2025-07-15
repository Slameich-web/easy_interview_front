import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";

export const generateStudentId = async (): Promise<string> => {
  const currentYear = new Date().getFullYear();
  const basePrefix = `ST-${currentYear}-`;

  try {
    // Создаем ссылку на коллекцию пользователей
    const usersRef = collection(db, "users");

    // Оптимизированный запрос для получения только последнего ID
    const q = query(
      usersRef,
      where("studentId", ">=", basePrefix),
      where("studentId", "<", `ST-${currentYear}-z`), // z - последний символ в сортировке
      orderBy("studentId", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    let nextNumber = 1; // Начинаем с 1, если нет существующих ID

    if (!querySnapshot.empty) {
      const lastStudentId = querySnapshot.docs[0].data().studentId;
      const lastNumber = parseInt(lastStudentId.split("-")[2] || "0", 10);
      nextNumber = lastNumber + 1;
    }

    // Форматируем номер с ведущими нулями (0001)
    const paddedNumber = nextNumber.toString().padStart(4, "0");
    return `${basePrefix}${paddedNumber}`;
  } catch (error) {
    console.error("Ошибка генерации студенческого ID:", error);

    // Fallback: генерация временного ID
    const timestamp = Date.now().toString().slice(-6);
    return `${basePrefix}TEMP-${timestamp}`;
  }
};
