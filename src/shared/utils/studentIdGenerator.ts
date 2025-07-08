import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const generateStudentId = async (): Promise<string> => {
  const currentYear = new Date().getFullYear();
  const baseId = `ST-${currentYear}-`;

  try {
    // Получаем всех пользователей с ID текущего года
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("studentId", ">=", baseId),
      where("studentId", "<", `ST-${currentYear + 1}-`)
    );
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
  } catch (error) {
    console.error("Ошибка при генерации студенческого ID:", error);
    // Fallback: генерируем ID на основе времени
    const timestamp = Date.now().toString().slice(-6);
    return `${baseId}${timestamp}`;
  }
};
