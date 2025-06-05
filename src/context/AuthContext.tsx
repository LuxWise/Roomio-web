"use client";

import { googleLogin, login, register } from "@/services/AuthServices";
import { createContext, ReactNode, useState } from "react";

interface Login {
  email: string;
  password: string;
}

interface GoogleLogin {
  token: string;
}

interface Register {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextType {
  user: string | null;
  login: ({ email, password }: Login) => Promise<boolean>;
  googleLogin: ({ token }: GoogleLogin) => Promise<void>;
  register: ({
    name,
    lastname,
    email,
    phone,
    password,
  }: Register) => Promise<void>;
  // logout: () => Promise<void>;
  // refresh: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = async ({ email, password }: Login): Promise<boolean> => {
    try {
      await login({ email, password });
      setUser("User Authenticated");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleGoogleLogin = async ({ token }: GoogleLogin): Promise<void> => {
    try {
      await googleLogin({ token });
      setUser("User Authenticated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async ({
    name,
    lastname,
    email,
    phone,
    password,
  }: Register) => {
    try {
      await register({
        name,
        lastname,
        email,
        phone,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        googleLogin: handleGoogleLogin,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
