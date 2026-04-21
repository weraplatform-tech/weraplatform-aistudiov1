
export enum UserRole {
  ADMIN = 'admin',
  EMPLOYER = 'employer',
  WORKER = 'worker',
}

// Ensure this matches the existing user session structure expected by App
export interface UserSession {
  id: string;
  email: string;
  role: UserRole;
  user_metadata?: {
    role?: UserRole;
  };
}
