import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
}

export class AuthService {
  private auth = getAuth();

  async signIn({ email, password }: AuthCredentials): Promise<AuthResult> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return { user: result.user };
    } catch (error) {
      throw new Error(`Ошибка входа: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    }
  }

  async signUp({ email, password }: AuthCredentials): Promise<AuthResult> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      return { user: result.user };
    } catch (error) {
      throw new Error(`Ошибка регистрации: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw new Error(`Ошибка выхода: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    }
  }
}

export const authService = new AuthService();