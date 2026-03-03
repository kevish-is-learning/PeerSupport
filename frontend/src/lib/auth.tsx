'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { authApi } from '@/lib/api';

interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
  reputation: number;
  isVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }, []);

  const refreshUser = useCallback(async () => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    const storedToken = Cookies.get('accessToken');
    if (!storedToken) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await authApi.getMe(storedToken) as { data: User };
      setUser(res.data);
      setToken(storedToken);
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password }) as {
      data: { user: User; accessToken: string; refreshToken: string };
    };
    const { user: u, accessToken, refreshToken } = res.data;
    setUser(u);
    setToken(accessToken);
    Cookies.set('accessToken', accessToken, { expires: 1 });
    Cookies.set('refreshToken', refreshToken, { expires: 7 });
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await authApi.register({ username, email, password }) as {
      data: { user: User; accessToken: string; refreshToken: string };
    };
    const { user: u, accessToken, refreshToken } = res.data;
    setUser(u);
    setToken(accessToken);
    Cookies.set('accessToken', accessToken, { expires: 1 });
    Cookies.set('refreshToken', refreshToken, { expires: 7 });
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
