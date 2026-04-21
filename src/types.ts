
export enum UserRole {
  ADMIN = 'admin',
  EMPLOYER = 'employer',
  WORKER = 'worker',
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface SystemSettings {
  primaryCurrency: string;
  commissionRate: number;
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
