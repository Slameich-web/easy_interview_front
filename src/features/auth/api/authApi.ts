import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
}

export const signIn = async ({
  email,
  password,
}: AuthCredentials): Promise<AuthResult> => {
  try {
    const auth = getAuth();
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
}: AuthCredentials): Promise<AuthResult> => {
  try {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error) {
    throw new Error(
      `Ошибка регистрации: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`
    );
  }
};

export const logout = async (): Promise<void> => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (error) {
    throw new Error(
      `Ошибка выхода: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`
    );
  }
};
