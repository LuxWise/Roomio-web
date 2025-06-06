"use client";

import {
  googleLogin,
  login,
  register,
  registerCode,
} from "@/services/AuthServices";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";

interface Login {
  email: string;
  password: string;
}

interface GoogleLogin {
  token: string;
}

interface RegisterCode {
  email: string;
  locale: string;
}

interface Register {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  code: string;
}

interface AuthContextType {
  user: string | null;
  login: ({ email, password }: Login) => Promise<boolean>;
  googleLogin: ({ token }: GoogleLogin) => Promise<void>;
  registerCode: ({ email }: RegisterCode) => Promise<void>;
  register: ({
    name,
    lastname,
    email,
    phone,
    password,
    code,
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
  const router = useRouter();

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

  const handleRegisterCode = async ({ email, locale }: RegisterCode) => {
    try {
      await registerCode({ email, locale });
      router.push("/register/code");
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
    code,
  }: Register) => {
    try {
      await register({
        name,
        lastname,
        email,
        phone,
        password,
        code,
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
        registerCode: handleRegisterCode,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
