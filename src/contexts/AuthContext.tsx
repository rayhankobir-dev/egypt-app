/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/types";
import axiosInstance from "@/api";
import {
  clearTokenFromCookies,
  getTokenFromCookies,
  setTokenInCookies,
} from "@/lib/utils";
import React, { createContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearAuth: () => void;
  isAuthenticating: boolean;
  isAuth: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  isAuthenticating: true,
  user: null,
  logout: () => {},
  login: async () => {},
  clearAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  const [token, setToken] = useState<string | undefined>(getTokenFromCookies());
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    setIsAuthenticating(true);
    try {
      const { data } = await axiosInstance.get("/user/profile");
      setUser(data.data.user);
      setIsAuth(true);
    } catch (error) {
      console.error("Error fetching user data, logging out.", error);
      clearAuth();
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      fetchUser();
    } else {
      setIsAuthenticating(false);
    }
  }, [fetchUser, token]);

  const login = async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const { data } = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      const newToken = data.data.token;
      setTokenInCookies(newToken);
      setToken(newToken);
      setUser(data.data.user);
      setIsAuth(true);

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newToken}`;
      toast.success(data.message);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = () => {
    clearAuth();
  };

  const clearAuth = () => {
    clearTokenFromCookies();
    setToken(undefined);
    setUser(null);
    setIsAuth(false);
    delete axiosInstance.defaults.headers.common["Authorization"];
    setIsAuthenticating(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, clearAuth, isAuth, isAuthenticating }}
    >
      {children}
    </AuthContext.Provider>
  );
};
