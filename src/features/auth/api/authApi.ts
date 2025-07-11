import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { AuthCredentials, AuthResult } from "../../../shared/types/user";
import { createUserInFirestore } from "./firestoreApi";

const auth = getAuth();

setPersistence(auth, browserLocalPersistence);

export const signIn = async ({
  email,
  password,
}: Pick<AuthCredentials, "email" | "password">): Promise<AuthResult> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error) {
    throw new Error(
      `Ошибка входа: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`
    );
  }
};

export const signUp = async ({
  email,
  password,
  groupId,
  studentNumber,
  role = "student",
}: AuthCredentials): Promise<AuthResult> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Создаем пользователя в Firestore после успешной регистрации
    await createUserInFirestore(
      result.user.uid,
      email,
      groupId,
      role,
      studentNumber
    );

    return { user: result.user };
  } catch (error) {
    throw new Error(
      `Ошибка регистрации: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`
    );
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(
      `Ошибка выхода: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`
    );
  }
};
