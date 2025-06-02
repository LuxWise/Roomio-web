"use client";
import Card from "@/components/molecules/Card";
import React from "react";
import { InputForm } from "@/components/molecules/InputForm";
import { useDropzone } from "react-dropzone";
import Typography from "@/components/atoms/Typography";
import useTheme from "@/hooks/useTheme";
import LayoutHome from "@/layout/Home/layoutHome";

const ContactPage = () => {
  const isLight = useTheme(state => state.theme);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone();

  const setForm = async (value: {
    name: string;
    lastname: string;
    email: string;
    subject?: string;
    text?: string;
  }) => {
    const formData = new FormData();
    formData.append("email", value.email);
    formData.append(
      "subject",
      value.subject || "Solicitud de información hotelera"
    );
    formData.append(
      "text",
      value.text ||
        `Consulta de ${value.name} ${value.lastname} sobre servicios hoteleros`
    );

    if (acceptedFiles.length > 0) {
      formData.append("file", acceptedFiles[0], acceptedFiles[0].name);
    }

    await fetch("/api/data", {
      method: "POST",
      body: formData,
    });
  };

  const contactBg = isLight ? "bg-[#1a2634]" : "bg-[#232946]";
  const contactCardBg = isLight ? "bg-[#22304a]" : "bg-[#181c25]";
  const contactText = isLight ? "text-white" : "text-gray-200";

  return (
    <LayoutHome>
      <section
        className={`flex w-full h-full ${contactBg} py-20 transition-colors duration-500`}
      >
        <div className="w-2/6 ml-14 flex flex-col justify-center items-center">
          <Typography variant="h3" color="white" className="mb-6 p-6 font-bold">
            ¿Buscas gestionar tu alojamiento como un profesional?
          </Typography>
          <Typography
            variant="body"
            color="white"
            className="mb-8 px-10 text-justify"
          >
            Ofrecemos soluciones integrales para la gestión de hoteles,
            apartamentos turísticos y propiedades vacacionales, al estilo de
            Airbnb y Booking. Completa el formulario y te enviaremos toda la
            información sobre nuestros servicios, tarifas y cómo podemos
            ayudarte a maximizar tus reservas y simplificar la administración de
            tu alojamiento.
          </Typography>
          <InputForm
            title="Solicita información de servicios"
            titleButton="Enviar consulta"
            onAdd={setForm}
            className="hover:shadow-xl hover:shadow-slate-600 transition-all duration-300"
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
                Adjunta documentos o imágenes de tu propiedad (opcional)
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
              title="Gestión de Reservas"
              description="Centraliza y automatiza tus reservas desde múltiples plataformas como Airbnb y Booking."
              className={`${contactCardBg}  shadow-lg`}
              textColor={contactText}
            />
            <Card
              title="Optimización de Tarifas"
              description="Ajuste dinámico de precios para maximizar ocupación y rentabilidad."
              className={`${contactCardBg} shadow-lg`}
              textColor={contactText}
            />
            <Card
              title="Comunicación con Huéspedes"
              description="Automatiza mensajes, confirmaciones y atención personalizada a tus huéspedes."
              className={`${contactCardBg} shadow-lg`}
              textColor={contactText}
            />
            <Card
              title="Reportes y Estadísticas"
              description="Accede a reportes detallados sobre ingresos, ocupación y desempeño de tu propiedad."
              className={`${contactCardBg}  shadow-lg`}
              textColor={contactText}
            />
          </div>
        </div>
      </section>
    </LayoutHome>
  );
};

export default ContactPage;
