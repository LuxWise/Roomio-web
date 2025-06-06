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
  code: string;
}

const RegisterCodePage = () => {
  const isLight = useTheme(state => state.theme);
  const t = useTranslations("Register");
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);

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
      code: data.code,
    });
  };

  const formFields = [
    { name: "name", type: "text", placeholder: t("name") },
    { name: "lastname", type: "text", placeholder: t("lastname") },
    { name: "email", type: "email", placeholder: t("email") },
    { name: "phone", type: "tel", placeholder: t("phone") },
    { name: "password", type: "password", placeholder: t("password") },
    { name: "confirmPassword", type: "password", placeholder: t("rePassword") },
  ];

  const bgMain = isLight
    ? "bg-conic-180 from-sky-300 via-sky-50 to-sky-300"
    : "bg-[#181c25]";

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${bgMain} transition-colors duration-500 `}
    >
      <LayoutLogin>
        <section
          className={`flex flex-col  gap-2 md:w-3/6 lg:w-2/6 h-full items-center px-10 bg-white ${
            error ? "pt-24" : "pt-32"
          } `}
        >
          {error && (
            <div className="flex items-center gap-2 mb-2 px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded shadow-sm w-full text-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <span className="font-semibold">{error}</span>
            </div>
          )}
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
              code: "",
            }}
            showCodeSection={true}
            codeLabel={t("titleCode")}
            onSubmit={handleRegister}
            className="flex flex-col justify-center items-center  "
          />
        </section>
      </LayoutLogin>
    </div>
  );
};

export default RegisterCodePage;
