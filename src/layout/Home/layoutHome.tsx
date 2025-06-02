"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Typography from "@/components/atoms/Typography";
import useTheme from "@/hooks/useTheme";
import Logo from "@/public/svg/Logo.svg";
import useScroll from "@/hooks/useScroll";
import { Sun, Moon } from "lucide-react";
import { IoEarth } from "react-icons/io5";

interface LayoutHomeProps {
  children: ReactNode;
}

const phrases = [
  "Un destion para todos",
  "Una nueva aventura",
  "Viajar, conocer y disfrutar",
];

function LayoutHome({ children }: LayoutHomeProps) {
  const isLight = useTheme(state => state.theme);
  const setTheme = useTheme(state => state.setTheme);
  const toggleTheme = useTheme(state => state.toggleTheme);
  const scroll = useScroll(state => state.scroll);
  const setScroll = useScroll(state => state.setScroll);

  const [phrase, setPhrase] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored !== null) {
        setTheme(JSON.parse(stored));
      }
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
            className={`w-36 rounded-full ${bgHeaderImg}`}
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

        <section className="flex gap-10 ">
          <div className="grid grid-cols-3 grid-rows-1 gap-10 items-center justify-center">
            <Typography
              variant="h5"
              color={scroll ? "black" : "white"}
              className="cursor-pointer"
            >
              A donde vamos?
            </Typography>
            <Typography
              variant="h5"
              color={scroll ? "black" : "white"}
              className="cursor-pointer"
            >
              Roomio
            </Typography>
          </div>
          <IoEarth className="text-2xl" color={scroll ? "#000" : "#FFF"} />
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
        </section>
      </header>
      {children}
    </div>
  );
}

export default LayoutHome;
