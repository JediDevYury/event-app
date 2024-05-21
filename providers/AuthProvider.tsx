import axios from "axios";
import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import 'core-js/stable/atob';
import {jwtDecode} from "jwt-decode";

let API_URL = process.env.EXPO_PUBLIC_API_URL;
export const JWT_KEY = 'user-token';

export interface UserData {
  id: number;
  email: string;
  name: string;
}

type AuthProps = {
  token: string | null;
  onRegister: (email: string, password: string, name: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<void>;
  initialized: boolean;
  getUserData: () => any;
};

const AuthContext = createContext<Partial<AuthProps>>({});

export function useAuth() {
  if(!AuthContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, { email, password });
      const accessToken = result.data.accessToken;
      setToken(accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      await SecureStore.setItemAsync(JWT_KEY, accessToken);
      return result;
    } catch (error: any) {
      throw { error: true, message: error.response.data.msg };
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/register`, { email, password, name });
      return result;
    } catch (error: any) {
      throw { error: true, message: error.response.data.msg };
    }
  };

  const handleLogout = async () => {
    setToken(null);
    await SecureStore.deleteItemAsync(JWT_KEY);
    axios.defaults.headers.common['Authorization'] = '';
  };

  const getUserData = (): UserData | null => {
    if (!token) return null;
    return jwtDecode(token)
  };

  const loadToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync(JWT_KEY);
      if (storedToken) {
        setToken(storedToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
      setInitialized(true);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const value = {
    initialized,
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
    token,
    getUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
