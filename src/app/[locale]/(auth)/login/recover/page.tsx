"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import LayoutLogin from "@/layout/Login/layoutLogin";
import { InputForm } from "@/components/molecules/InputForm";
import { SyncLoader } from "react-spinners";

interface RecoverCode {
  email: string;
}

const RecoverPage = () => {
  const isLight = useTheme(state => state.theme);
  const t = useTranslations("Recover");
  const { recoverCode } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "es";

  const handleRecoverCode = async (data: RecoverCode) => {
    setLoading(true);
    const action = async () => {
      await recoverCode({
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
    ? "bg-conic-180 from-sky-300 via-sky-50 to-sky-300"
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
              <InputForm
                title={t("titleForm")}
                titleButton={t("titleButtom")}
                fields={formFields}
                initialValues={{ email: "" }}
                onSubmit={handleRecoverCode}
                className="flex flex-col justify-center items-center  "
              />
            </>
          )}
        </section>
      </LayoutLogin>
    </div>
  );
};

export default RecoverPage;
