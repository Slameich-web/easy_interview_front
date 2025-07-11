import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../../../firebase";
import { StudyPlan, StudyPlanFormData } from "../../../shared/types/studyPlan";

const COLLECTION_NAME = "studyPlans";

// Получить все учебные планы
export const getAllStudyPlans = async (): Promise<StudyPlan[]> => {
  try {
    const studyPlansRef = collection(db, COLLECTION_NAME);
    const q = query(studyPlansRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const studyPlans: StudyPlan[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      studyPlans.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as StudyPlan);
    });
    
    return studyPlans;
  } catch (error) {
    console.error("Ошибка при получении учебных планов:", error);
    throw new Error(
      `Ошибка загрузки учебных планов: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Получить учебный план по ID
export const getStudyPlanById = async (id: string): Promise<StudyPlan | null> => {
  try {
    const studyPlanRef = doc(db, COLLECTION_NAME, id);
    const studyPlanDoc = await getDoc(studyPlanRef);
    
    if (studyPlanDoc.exists()) {
      const data = studyPlanDoc.data();
      return {
        id: studyPlanDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as StudyPlan;
    }
    
    return null;
  } catch (error) {
    console.error("Ошибка при получении учебного плана:", error);
    throw new Error(
      `Ошибка загрузки учебного плана: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Создать новый учебный план
export const createStudyPlan = async (data: StudyPlanFormData): Promise<StudyPlan> => {
  try {
    const studyPlanData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), studyPlanData);
    
    // Для возврата используем текущую дату
    return {
      id: docRef.id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as StudyPlan;
  } catch (error) {
    console.error("Ошибка при создании учебного плана:", error);
    throw new Error(
      `Ошибка создания учебного плана: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Обновить учебный план
export const updateStudyPlan = async (
  id: string, 
  data: Partial<StudyPlanFormData>
): Promise<void> => {
  try {
    const studyPlanRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(studyPlanRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Ошибка при обновлении учебного плана:", error);
    throw new Error(
      `Ошибка обновления учебного плана: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};

// Удалить учебный план
export const deleteStudyPlan = async (id: string): Promise<void> => {
  try {
    const studyPlanRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(studyPlanRef);
  } catch (error) {
    console.error("Ошибка при удалении учебного плана:", error);
    throw new Error(
      `Ошибка удаления учебного плана: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};