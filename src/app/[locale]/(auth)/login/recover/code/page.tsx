"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import LayoutLogin from "@/layout/Login/layoutLogin";
import { InputForm } from "@/components/molecules/InputForm";
import { SyncLoader } from "react-spinners";

interface Register {
  password: string;
  newPassword: string;
  code: string;
}

const RecoverPage = () => {
  const isLight = useTheme(state => state.theme);
  const t = useTranslations("RecoverCode");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { recoverPassword } = useAuth();

  const handleRecoverPassword = async (data: Register) => {
    setLoading(true);

    if (data.password !== data.newPassword) {
      setError(t("passwordsNoMatch") || "Passwords do not match");
      return;
    }
    const action = async () => {
      const email = localStorage.getItem("email");

      await recoverPassword({
        email: email!,
        newPassword: data.newPassword,
        code: data.code,
      });
      setLoading(false);
    };
    action();
  };

  const formFields = [
    {
      name: "password",
      type: "password",
      placeholder: t("password"),
    },
    {
      name: "newPassword",
      type: "password",
      placeholder: t("newPassword"),
    },
  ];

  const bgMain = isLight
    ? " bg-gradient-to-r from-sky-100 via-sky-100 to-sky-600"
    : "bg-[#181c25]";
  const loaderColor = isLight ? "#1d63ed" : "#181c25";

  return (
    <div
      className={`flex flex-col items-center h-screen ${bgMain} transition-colors duration-500 `}
    >
      <LayoutLogin>
        <section className="flex flex-col gap-2 md:w-3/6 lg:w-2/6 h-full items-center justify-center px-10 bg-white">
          {loading ? (
            <section className="flex flex-col w-full h-full justify-center items-center">
              <SyncLoader color={loaderColor} />
            </section>
          ) : (
            <>
              {error && (
                <div className="w-full flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 shadow-sm animate-fade-in">
                  <svg
                    className="w-6 h-6 text-red-500 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4m0 4h.01"
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
                  password: "",
                  newPassword: "",
                  code: "",
                }}
                onSubmit={handleRecoverPassword}
                className="flex flex-col justify-center items-center"
                showCodeSection={true}
                codeLabel={t("titleCode")}
              />
            </>
          )}
        </section>
      </LayoutLogin>
    </div>
  );
};

export default RecoverPage;
