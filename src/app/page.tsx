"use client";
import Image from "next/image";
import Typography from "@/components/atoms/Typography";
import Photo from "@/public/jpg/portfolio.jpg";
import Logo from "@/public/jpg/logo.jpg";
import { Sun, Moon, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import Card from "@/components/molecules/Card";
import { InputForm } from "@/components/molecules/InputForm";
import { useDropzone } from "react-dropzone";

export default function Home() {
  // Lee el tema guardado en localStorage al cargar
  const [theme, setTheme] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      return stored ? JSON.parse(stored) : true;
    }
    return true;
  });

  useEffect(() => {
    // Guarda el tema cada vez que cambia
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone();

  // Cambia setForm para enviar FormData con archivo
  const setForm = async (value: {
    name: string;
    lastname: string;
    email: string;
    subject?: string;
    text?: string;
  }) => {
    const formData = new FormData();
    formData.append("email", value.email);
    formData.append("subject", value.subject || "Contacto desde portafolio");
    formData.append(
      "text",
      value.text || `Mensaje de ${value.name} ${value.lastname}`
    );

    if (acceptedFiles.length > 0) {
      formData.append("file", acceptedFiles[0], acceptedFiles[0].name);
    }

    await fetch("/api/data", {
      method: "POST",
      body: formData,
    });
  };

  const handleTheme = () => {
    setTheme(prev => !prev);
  };

  const isLight = theme === true;
  const bgMain = isLight ? "bg-whit" : "bg-[#181c25]";
  const bgHeader = isLight
    ? "bg-gradient-to-r from-[#1f62ec] to-[#022a8e]"
    : "bg-gradient-to-r from-[#232946] to-[#121629]";
  const bgSection = isLight
    ? "bg-gradient-to-r from-[#1f62ec] to-[#022a8e]"
    : "bg-gradient-to-r from-[#232946] to-[#121629]";
  const cardBg = isLight ? "bg-[#e6f0fd]" : "bg-[#e6f0fd]";
  const cardText = isLight ? "text-gray-700" : "text-gray";
  const contactBg = isLight ? "bg-[#1a2634]" : "bg-[#232946]";
  const contactCardBg = isLight ? "bg-[#22304a]" : "bg-[#181c25]";
  const contactText = isLight ? "text-white" : "text-gray-200";

  return (
    <div
      className={`flex flex-col items-center h-screen ${bgMain} transition-colors duration-500`}
    >
      <header
        className={`flex flex-row justify-between items-center pl-10 pr-16 py-5 ${bgHeader} w-full transition-colors duration-500`}
      >
        <Image src={Logo} alt="Logo" className="w-14 h-14 rounded-full" />
        <section className="flex gap-10">
          <div className="grid grid-cols-3 grid-rows-1 gap-10 items-center justify-center cursor-pointer">
            <Typography variant="h5" color="white">
              Home
            </Typography>
            <Typography variant="h5" color="white">
              Contacto
            </Typography>
          </div>
          {isLight ? (
            <Sun
              color="#FFF"
              onClick={handleTheme}
              className="cursor-pointer"
            />
          ) : (
            <Moon
              color="#FFF"
              onClick={handleTheme}
              className="cursor-pointer"
            />
          )}
        </section>
      </header>

      <main
        className={`flex flex-col items-center w-full ${bgMain} transition-colors duration-500`}
      >
        <section
          className={`flex flex-row gap-10 justify-center items-center w-full py-10 ${bgSection} rounded-b-[12rem] select-none transition-colors duration-500`}
        >
          <div className="flex justify-center bg-gradient-to-r py-5">
            <Image
              src={Photo}
              alt="Foto de Juan Camilo"
              className="rounded-full w-44 h-44 shadow-lg border-4 border-white object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 ">
            <Typography variant="h1" color="white" className="text-7xl">
              Juan Camilo Sanchez
            </Typography>
            <Typography variant="h5" className="text-sky-100">
              Desarrollador Fullstack | Apasionado por la tecnología y el diseño
            </Typography>
            <div className="flex w-full gap-5 ">
              <Mail color="#FFF" className="cursor-pointer" />
              <Phone color="#FFF" className="cursor-pointer" />
              <Github color="#FFF" className="cursor-pointer" />
              <Linkedin color="#FFF" className="cursor-pointer" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 grid-rows-2 gap-x-10 gap-y-8 py-20 px-40">
          <Card
            title="Experiencia en Frontend"
            description="Domino tecnologías modernas como React, Next.js y Tailwind CSS para crear interfaces atractivas, responsivas y de alto rendimiento."
            className={`hover:shadow-lg hover:shadow-sky-300 transition-all duration-300 ${cardBg} ${cardText}`}
          />
          <Card
            title="Backend Sólido"
            description="Tengo experiencia desarrollando APIs robustas y seguras con Node.js, Express y bases de datos como MongoDB y PostgreSQL."
            className={`hover:shadow-lg hover:shadow-sky-300 transition-all duration-300 ${cardBg} ${cardText}`}
          />
          <Card
            title="Diseño UI/UX"
            description="Me enfoco en la experiencia del usuario, creando diseños intuitivos y visualmente agradables que mejoran la interacción y satisfacción."
            className={`hover:shadow-lg hover:shadow-sky-300 transition-all duration-300 ${cardBg} ${cardText}`}
          />
          <Card
            title="Trabajo en Equipo"
            description="Colaboro eficazmente en equipos multidisciplinarios, utilizando metodologías ágiles y herramientas de control de versiones como Git."
            className={`hover:shadow-lg hover:shadow-sky-300 transition-all duration-300 ${cardBg} ${cardText}`}
          />
        </section>

        <section
          className={`flex w-full ${contactBg} py-20 transition-colors duration-500`}
        >
          <div className="w-2/6 ml-14 flex flex-col justify-center items-center">
            <Typography
              variant="h3"
              color="white"
              className="mb-6 p-6 font-bold"
            >
              ¿Necesitas un desarrollo a medida?
            </Typography>
            <Typography
              variant="body"
              color="white"
              className="mb-8 px-10 text-justify"
            >
              Ofrezco servicios profesionales de desarrollo de software,
              aplicaciones web y soluciones digitales personalizadas. Si tienes
              una idea o proyecto, ¡contáctame y trabajemos juntos para hacerlo
              realidad!
            </Typography>
            <InputForm
              title="Envia tu cotizacion"
              titleButton="Enviar "
              onAdd={setForm}
              className="hover:shadow-xl hover:shadow-slate-600 transition-all duration-300  "
            />
            <div
              {...getRootProps()}
              className={`mt-6  p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
                isDragActive
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-400 bg-transparent"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-white">Suelta el archivo aquí...</p>
              ) : (
                <p className="text-white">
                  Arrastra y suelta archivos aquí, o haz clic para seleccionar
                  archivos
                </p>
              )}
              {acceptedFiles.length > 0 && (
                <ul className="mt-2 text-white text-sm">
                  {acceptedFiles.map(file => (
                    <li key={file.name}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="h-full w-4/6 flex flex-col justify-center items-center gap-8 px-10">
            <div className="grid grid-cols-2 gap-8 w-full">
              <Card
                title="Desarrollo Web Moderno"
                description="Construcción de sitios y aplicaciones web responsivas, rápidas y seguras, adaptadas a tus necesidades."
                className={`${contactCardBg}  shadow-lg`}
                textColor={contactText}
              />
              <Card
                title="Integración y Automatización"
                description="Automatización de procesos, integración de APIs y herramientas para optimizar tu negocio."
                className={`${contactCardBg} shadow-lg`}
                textColor={contactText}
              />
              <Card
                title="Consultoría y Soporte"
                description="Asesoría en tecnología, soporte continuo y acompañamiento en todo el ciclo de desarrollo."
                className={`${contactCardBg} shadow-lg`}
                textColor={contactText}
              />
              <Card
                title="Soluciones Personalizadas"
                description="Desarrollo de software a medida para empresas y emprendedores, enfocado en resultados y calidad."
                className={`${contactCardBg}  shadow-lg`}
                textColor={contactText}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
