export interface User {
  email: string | null;
  token: string | null;
  id: string | null;
}

export interface UserState extends User {}