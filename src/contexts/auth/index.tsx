import React, { useCallback, useEffect, useState } from 'react';
import apiService from '@services/api';
import { User } from '@models/user';
import * as localStorage from '@services/localStorage';
import { apiInstance } from '@services/api/config';

export type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  requestLogin: (data: { login: string; password: string }) => Promise<void>;
  requestLogout: () => Promise<void>;
  requestUserInfo: () => Promise<void>;
};

export const AuthContext = React.createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadStorageData = useCallback(async () => {
    setLoading(true);
    const storedToken = await localStorage.getItem('token');
    const storedUser = await localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      apiInstance.defaults.headers.common.authorization = `Bearer ${storedToken}`;
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadStorageData();
  }, [loadStorageData]);

  const requestUserInfo = useCallback(async () => {
    // const response = await apiService.getUserById({ id: user?.id as number });
    const response = await apiService.getProfileByUserId({
      userId: String(user?.id),
    });

    const newUser = {
      ...user,
      profile: response.data,
    };
    setUser(newUser as User);
    await localStorage.setItem('user', JSON.stringify(newUser));
  }, [user]);

  const requestLogin = useCallback(
    async (ctx: { login: string; password: string }) => {
      try {
        setLoading(true);
        const { login, password } = ctx;

        const { data } = await apiService.postLogin({ login, password });

        const { token: requestToken, user: signedUser } = data;

        apiInstance.defaults.headers.common.authorization = `Bearer ${requestToken}`;
        await localStorage.setItem('token', requestToken);
        await localStorage.setItem('user', JSON.stringify(signedUser));

        setToken(requestToken);
        setUser(signedUser);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const requestLogout = useCallback(async () => {
    try {
      setLoading(true);
      await localStorage.removeItem('token');
      await localStorage.removeItem('user');

      setToken(null);
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        requestLogin,
        requestLogout,
        error,
        requestUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
};
