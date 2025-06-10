"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Typography from "@/components/atoms/Typography";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import LayoutLogin from "@/layout/Login/layoutLogin";
import { InputForm } from "@/components/molecules/InputForm";
import { SyncLoader } from "react-spinners";
import Breadcrumb from "@/components/atoms/breadcrumb";

interface Register {
  email: string;
}

const RegisterPage = () => {
  const isLight = useTheme(state => state.theme);
  const t = useTranslations("RegisterCode");
  const router = useRouter();
  const { registerCode } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "es";

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = async (data: Register) => {
    setLoading(true);
    setError(null);
    const action = async () => {
      await registerCode({
        email: data.email,
        locale: currentLocale,
      });
      setLoading(false);
    };
    action();
  };

  const formFields = [
    {
      name: "email",
      type: "email",
      placeholder: t("email"),
    },
  ];

  const bgMain = isLight
    ? " bg-gradient-to-r from-sky-100 via-sky-100 to-sky-600"
    : " bg-gradient-to-r from-[#181c25] to-sky-800";
  const loaderColor = isLight ? "#1d63ed" : "#181c25";

  return (
    <div
      className={`flex flex-col items-center h-screen ${bgMain} transition-colors duration-500 `}
    >
      <LayoutLogin>
        <section className="flex flex-col gap-2 md:w-3/6 lg:w-2/6 h-full items-center pt-40 px-10 bg-white">
          {loading ? (
            <section className="flex flex-col w-full h-full justify-center items-center">
              <SyncLoader color={loaderColor} />
            </section>
          ) : (
            <>
              <div className="flex flex-col items-center mb-8 ">
                <Typography
                  variant="h2"
                  className="font-bold text-[#1d63ed] mb-2"
                >
                  {t("title")}
                </Typography>
                <Typography
                  variant="h6"
                  className="text-gray-600 text-center max-w-xl"
                >
                  {t("descriptcion")}
                </Typography>
              </div>
              {error && (
                <div className="mb-2 text-red-500 text-sm">{error}</div>
              )}
              <InputForm
                title={t("titleForm")}
                titleButton={t("titleButtom")}
                fields={formFields}
                initialValues={{ email: "" }}
                onSubmit={handleRegister}
                className="flex flex-col justify-center items-center  "
              />
              <div className="flex gap-2">
                <Typography variant="span">{t("question")}</Typography>
                <div onClick={handleLogin}>
                  <Typography
                    variant="h6"
                    color="blue"
                    className="cursor-pointer"
                  >
                    {t("answer")}
                  </Typography>
                </div>
              </div>
            </>
          )}
        </section>
      </LayoutLogin>
    </div>
  );
};

export default RegisterPage;
