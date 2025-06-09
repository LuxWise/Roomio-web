"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";
import LayoutLogin from "@/layout/Login/layoutLogin";
import { useTranslations } from "next-intl";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";

const ReservationSuccessPage = () => {
  const t = useTranslations("ReservationSuccess");
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50">
      {" "}
      <LayoutLogin>
        <div className="flex flex-col justify-center items-center w-full max-w-md sm:max-w-lg md:max-w-xl  mx-auto bg-white/90 rounded-3xl shadow-2xl py-10 px-4 sm:py-14 sm:px-8 mt-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center justify-center rounded-full bg-green-100 p-5 sm:p-6 shadow-lg">
              <CircleCheck
                color="#22c55e"
                className="w-12 h-12 sm:w-20 sm:h-20"
              />
            </span>
          </div>
          <Typography
            variant="h4"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-700 mb-2 text-center"
          >
            {t("title")}
          </Typography>
          <Typography
            variant="h6"
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 text-center"
          >
            {t("description")}
            <br />
            {t("description2")}
            <br />
            {t("description3")}
          </Typography>
          <Button
            bgColor="blue"
            color="white"
            rounded="xl"
            onClick={handleHome}
            text={t("button")}
            className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg font-semibold shadow-md hover:bg-blue-700 transition"
          />
        </div>
      </LayoutLogin>
    </div>
  );
};

export default ReservationSuccessPage;
