"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Typography from "@/components/atoms/Typography";
import useTheme from "@/hooks/useTheme";
import Logo from "@/public/svg/Logo.svg";
import useScroll from "@/hooks/useScroll";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { IoEarth } from "react-icons/io5";
import { useTranslations } from "next-intl";
import SelectList from "@/components/atoms/SelectList";
import Button from "@/components/atoms/Button";

interface LayoutHomeProps {
  children: ReactNode;
}

function LayoutHome({ children }: LayoutHomeProps) {
  const [openLenguage, setOpenLenguage] = useState(false);
  const isLight = useTheme(state => state.theme);
  const setTheme = useTheme(state => state.setTheme);
  const toggleTheme = useTheme(state => state.toggleTheme);
  const scroll = useScroll(state => state.scroll);
  const setScroll = useScroll(state => state.setScroll);
  const t = useTranslations("HomeLayout");
  const router = useRouter();
  const pathname = usePathname();

  const phrases = [t("phrase1"), t("phrase2"), t("phrase3")];
  const [phrase, setPhrase] = useState<number>(0);

  const currentLocale = pathname.split("/")[1] || "es";

  const handleHome = () => router.push("/");
  const handleLenguage = () => setOpenLenguage(prev => !prev);

  const changeLenguage = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored !== null) setTheme(JSON.parse(stored));
    }
  }, [setTheme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(prev => (prev + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScroll(offset > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScroll]);

  const bgHeaderImg = isLight ? "bg-[#ffffff00]" : "bg-[#fff]";
  const bgHeader = isLight
    ? "bg-gradient-to-r from-[#4c7cda] to-[#022a8e]"
    : "bg-gradient-to-r from-[#232946] to-[#121629]";
  const bgLenguage = isLight ? "bg-[#4c7cda]" : "bg-[#232946]";

  return (
    <div className="w-full h-full">
      <header
        className={`fixed top-0 z-30 flex flex-row justify-between items-center pl-10 pr-16 py-5 w-full transition-colors duration-500 ${
          scroll ? "bg-white" : bgHeader
        }`}
      >
        <section className="flex gap-5 justify-center items-center">
          <Image
            src={Logo}
            alt="Logo"
            className={`w-36 rounded-full ${bgHeaderImg} cursor-pointer`}
            onClick={handleHome}
          />
          <div>
            <Typography
              variant="h6"
              className={`select-none ${scroll ? "text-black" : "text-white"}`}
            >
              {phrases[phrase]}
            </Typography>
          </div>
        </section>

        <section className="flex gap-10 items-center">
          <Typography
            variant="h5"
            color={scroll ? "black" : "white"}
            className="cursor-pointer"
          >
            {t("firstLink")}
          </Typography>
          <Typography
            variant="h5"
            color={scroll ? "black" : "white"}
            className="cursor-pointer"
          >
            {t("secondLink")}
          </Typography>
          <div className={`rounded-4xl p-3 ${bgLenguage} cursor-pointer`}>
            <IoEarth
              className="text-2xl"
              color="#FFFFFF"
              onClick={handleLenguage}
            />
            {openLenguage && (
              <SelectList
                items={["es", "en"]}
                selected={currentLocale}
                onSelect={locale => changeLenguage(locale)}
                className="mt-6 bg-[#232946] py-4 px-2 rounded-2xl"
              />
            )}
          </div>

          {isLight ? (
            <Sun
              color={scroll ? "#000" : "#FFF"}
              onClick={toggleTheme}
              className="cursor-pointer"
            />
          ) : (
            <Moon
              color={scroll ? "#000" : "#FFF"}
              onClick={toggleTheme}
              className="cursor-pointer"
            />
          )}
          <div className="flex gap-5">
            <Button text={t("register")} bgColor="blue" color="white" />
            <Button text={t("login")} bgColor="blue" color="white" />
          </div>
        </section>
      </header>
      {children}
    </div>
  );
}

export default LayoutHome;
