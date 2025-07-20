export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: "CLIENT" | "ADMIN";
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone: string;
}
