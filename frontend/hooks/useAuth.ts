"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import api from "@/lib/api";
import { LoginFormData, RegisterFormData } from "@/lib/auth";

interface User {
  id: string;
  username: string;
  email: string;
  role: "CLIENT" | "ADMIN";
  balance: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
    await checkAuth();
  };
  initialize();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await api.get("/users/me");
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.remove("accessToken");
      localStorage.remove("refreshToken");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/login", data);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(response.data.user as User);

      toast.success(response.data.message || "Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/register", data);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(response.data.user as User);

      toast.success(response.data.message || "Account created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      router.push("/");
      toast.success("Logged out successfully");
    }
  };

  const value:AuthContextType  = { user, isLoading, login, register, logout,isAuthenticated  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
