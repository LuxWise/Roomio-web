"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Ghost } from "lucide-react";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import { useTranslations } from "next-intl";

const NotFoundPage = () => {
  const t = useTranslations("Notfound");
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-400">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md mt-10 mb-10">
        <Ghost className="w-24 h-24 text-blue-400 mb-6 animate-bounce" />
        <Typography
          variant="h1"
          className="text-5xl font-extrabold text-blue-700 mb-2 drop-shadow-lg"
        >
          404
        </Typography>
        <Typography
          variant="h3"
          className="text-2xl font-semibold text-gray-800 mb-2"
        >
          {t("title")}
        </Typography>
        <Typography variant="body" className="text-gray-500 mb-8 text-center">
          {t("descriptcion")}
          <br /> {t("descriptcion2")}
        </Typography>
        <Button
          bgColor="blue"
          color="white"
          rounded="xl"
          onClick={handleHome}
          text="Go to Home"
          className="px-10 py-3 shadow-lg hover:bg-blue-700 transition"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
