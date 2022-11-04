import React, { useCallback, useEffect, useState } from "react";
import api from "@services/api";
import { User } from "@/types/user";
import * as localStorage from "@services/localStorage";

export type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (data: { login: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = React.createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadStorageData = useCallback(async () => {
    setLoading(true);
    const storedToken = await localStorage.getItem("token");
    const storedUser = await localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadStorageData();
  }, [loadStorageData]);

  const login = useCallback(
    async (ctx: { login: string; password: string }) => {
      try {
        setLoading(true);
        const { login, password } = ctx;

        const { data } = await api.login({ login, password });

        const { token, user: signedUser } = data;

        await localStorage.setItem("token", token);
        await localStorage.setItem("user", JSON.stringify(signedUser));

        setToken(token);
        setUser(signedUser);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await localStorage.removeItem("token");
      await localStorage.removeItem("user");

      setToken(null);
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
