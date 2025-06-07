"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";
import LayoutLogin from "@/layout/Login/layoutLogin";
import { useTranslations } from "next-intl";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";

const RegisterSuccessPage = () => {
  const t = useTranslations("RecoverSuccess");
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50">
      <LayoutLogin>
        <div className="flex flex-col justify-center h-screen w-full bg-radial from-white from-20% to-[#729aeb] items-center">
          <CircleCheck color="#05df46" className="w-18 h-18 bg-gree" />
          <Typography
            variant="h2"
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            {t("title")}
          </Typography>
          <Typography variant="h6" className="text-gray-600 mb-6 text-center">
            {t("descriptcion")}
          </Typography>

          <Button
            bgColor="blue"
            color="white"
            rounded="xl"
            onClick={handleLogin}
            text={t("titleButtom")}
            className="px-10 py-3"
          />
        </div>
      </LayoutLogin>
    </div>
  );
};

export default RegisterSuccessPage;
