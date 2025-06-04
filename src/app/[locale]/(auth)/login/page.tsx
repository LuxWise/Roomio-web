"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import useTheme from "@/hooks/useTheme";
import LayoutLogin from "@/layout/Login/layoutLogin";
import useAuth from "@/hooks/useAuth";
import GoogleLoginButton from "@/components/atoms/GoogleLoginButton";
import { useTranslations } from "next-intl";
import { InputForm } from "@/components/molecules/InputForm";

interface Login {
  email: string;
  password: string;
}

const LoginPage = () => {
  const isLight = useTheme(state => state.theme);
  const t = useTranslations("Login");
  const { login } = useAuth();

  const handleForget = () => {
    console.log("forget");
  };

  const handleLogin = async (data: Login) => {
    await login({ email: data.email, password: data.password });
  };

  const formFields = [
    { name: "email", type: "text", placeholder: t("email") },
    { name: "password", type: "password", placeholder: t("password") },
  ];

  const bgMain = isLight
    ? "bg-conic-180 from-sky-300 via-sky-50 to-sky-300"
    : "bg-[#181c25]";

  return (
    <div
      className={`flex flex-col items-center h-screen ${bgMain} transition-colors duration-500`}
    >
      <LayoutLogin>
        <section className="flex flex-col gap-2 md:w-3/6 lg:w-2/6 h-full items-center pt-36 px-10 bg-white">
          <div className="flex flex-col items-center mb-8">
            <Typography variant="h2" className="font-bold text-[#1d63ed] mb-2">
              {t("title")}
            </Typography>
            <Typography
              variant="h6"
              className="text-gray-600 text-center max-w-xl"
            >
              {t("descriptcion")}
            </Typography>
          </div>
          <InputForm
            title={t("titleForm")}
            titleButton={t("titleButtom")}
            fields={formFields}
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center"
          />
          <GoogleLoginButton />
          <div className="flex gap-2">
            <Typography variant="span">{t("forget")}</Typography>
            <div onClick={handleForget}>
              <Typography variant="h6" color="blue" className="cursor-pointer">
                {t("answer")}
              </Typography>
            </div>
          </div>
        </section>
      </LayoutLogin>
    </div>
  );
};

export default LoginPage;
