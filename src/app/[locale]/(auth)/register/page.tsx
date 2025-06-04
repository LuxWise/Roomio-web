"use client";
import Typography from "@/components/atoms/Typography";
import { InputForm } from "@/components/molecules/InputForm";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import LayoutLogin from "@/layout/Login/layoutLogin";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Register {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const isLight = useTheme(state => state.theme);
  const t = useTranslations("Register");
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = async (data: Register) => {
    if (data.password !== data.confirmPassword) {
      setError(t("passwordsNoMatch") || "Passwords do not match");
      return;
    }
    await register({
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
  };

  const formFields = [
    { name: "name", type: "text", placeholder: t("name") },
    { name: "lastname", type: "text", placeholder: t("lastname") },
    {
      name: "email",
      type: "email",
      placeholder: t("email"),
    },
    {
      name: "phone",
      type: "tel",
      placeholder: t("phone"),
    },
    {
      name: "password",
      type: "password",
      placeholder: t("password"),
    },

    {
      name: "confirmPassword",
      type: "password",
      placeholder: t("rePassword"),
    },
  ];

  const bgMain = isLight
    ? "bg-conic-180 from-sky-300 via-sky-50 to-sky-300"
    : "bg-[#181c25]";

  return (
    <div
      className={`flex flex-col items-center h-screen ${bgMain} transition-colors duration-500 `}
    >
      <LayoutLogin>
        <section className="flex flex-col gap-2 md:w-3/6 lg:w-2/6 h-full items-center pt-20 px-10 bg-white">
          <div className="flex flex-col items-center mb-8 ">
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
          {error && <div className="mb-2 text-red-500 text-sm">{error}</div>}
          <InputForm
            title={t("titleForm")}
            titleButton={t("titleButtom")}
            fields={formFields}
            initialValues={{
              name: "",
              lastname: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleRegister}
            className="flex flex-col justify-center items-center  "
          />
          <div className="flex gap-2">
            <Typography variant="span">{t("question")}</Typography>
            <div onClick={handleLogin}>
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

export default RegisterPage;
