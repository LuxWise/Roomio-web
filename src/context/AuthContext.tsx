"use client";

import {
  googleLogin,
  login,
  recoverCode,
  recoverPassword,
  register,
  registerCode,
} from "@/services/AuthServices";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

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

interface RecoverCode {
  email: string;
  locale: string;
}

interface RecoverPassword {
  email: string;
  newPassword: string;
  code: string;
}

interface Register {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  code: string;
  locale: string;
}

interface AuthContextType {
  user: string | null;
  login: ({ email, password }: Login) => Promise<boolean>;
  recoverCode: ({ email }: RecoverCode) => Promise<void>;
  recoverPassword: ({
    email,
    newPassword,
    code,
  }: RecoverPassword) => Promise<void>;
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

  useEffect(() => {
    const getIsLogged = () => {
      if (typeof document !== "undefined") {
        const cookies = document.cookie.split("; ");
        const isLoggedCookie = cookies.find(c => c.startsWith("isLogged="));
        if (isLoggedCookie) {
          const value = isLoggedCookie.split("=")[1];
          if (value === "true") {
            setUser("User Authenticated");
          } else {
            setUser(null);
          }
        }
      }
    };

    getIsLogged();
  }, []);

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

  const handleRecoverCode = async ({
    email,
    locale,
  }: RecoverCode): Promise<void> => {
    try {
      await recoverCode({ email, locale });
      localStorage.setItem("email", email);
      router.push("/login/recover/code");
    } catch (error) {
      localStorage.removeItem("email");
      console.log(error);
    }
  };

  const handleRecoverPassword = async ({
    email,
    newPassword,
    code,
  }: RecoverPassword): Promise<void> => {
    try {
      await recoverPassword({ email, newPassword, code });
      router.push("/login/recover/success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async ({ token }: GoogleLogin): Promise<void> => {
    try {
      await googleLogin({ token });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterCode = async ({ email, locale }: RegisterCode) => {
    try {
      await registerCode({ email, locale });
      localStorage.setItem("email", email);
      router.push("/register/code");
    } catch (error) {
      localStorage.removeItem("email");
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
    locale,
  }: Register) => {
    try {
      await register({
        name,
        lastname,
        email,
        phone,
        password,
        code,
        locale,
      });
      router.push("/register/success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        recoverCode: handleRecoverCode,
        recoverPassword: handleRecoverPassword,
        googleLogin: handleGoogleLogin,
        registerCode: handleRegisterCode,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
