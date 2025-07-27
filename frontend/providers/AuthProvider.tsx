'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/auth';
import { authService } from '@/services/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (data: {
    username: string;
    email: string;
    password: string;
    phone: string;
  }) => Promise<any>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof window !== 'undefined') {
          const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='))
            ?.split('=')[1];
          
          if (token) {
            const userData = await authService.me();
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ login: email, password });
    setUser(response.user);
    return response;
  };

  const register = async (data: {
    username: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    const response = await authService.register(data);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      if (typeof window !== 'undefined') {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('accessToken='))
          ?.split('=')[1];
        
        if (token) {
          const userData = await authService.me();
          setUser(userData);
        }
      }
    } catch (error) {
      console.error('User refresh failed:', error);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
}