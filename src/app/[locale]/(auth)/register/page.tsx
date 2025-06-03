"use client";
import Typography from "@/components/atoms/Typography";
import { InputForm } from "@/components/molecules/InputForm";
import useTheme from "@/hooks/useTheme";
import LayoutLogin from "@/layout/Login/layoutLogin";
import React from "react";

const RegisterPage = () => {
  const isLight = useTheme(state => state.theme);

  const bgMain = isLight
    ? "bg-conic-180 from-sky-300 via-sky-50 to-sky-300"
    : "bg-[#181c25]";

  return (
    <div
      className={`flex flex-col items-center h-screen ${bgMain} transition-colors duration-500 `}
    >
      <LayoutLogin>
        <section className="flex flex-col w-2/6 h-full items-center pt-36 px-10 bg-white">
          <div className="flex flex-col items-center mb-8 ">
            <Typography variant="h2" className="font-bold text-[#1d63ed] mb-2">
              ¡Crea tu cuenta!
            </Typography>
            <Typography
              variant="h6"
              className="text-gray-600 text-center max-w-xl"
            >
              Regístrate para acceder a todos nuestros servicios. Por favor,
              completa el siguiente formulario con tus datos.
            </Typography>
          </div>
          <InputForm
            title="Registro de Usuario"
            titleButton="Registrarme en Roomio"
            fields={[
              { name: "name", type: "text", placeholder: "Nombre" },
              { name: "lastname", type: "text", placeholder: "Apellido" },
              {
                name: "email",
                type: "email",
                placeholder: "Correo electrónico",
              },
              { name: "password", type: "password", placeholder: "Contraseña" },
              {
                name: "confirmPassword",
                type: "password",
                placeholder: "Confirmar contraseña",
              },
            ]}
            initialValues={{
              name: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={async data => {
              console.log(data);
            }}
            className="   flex flex-col justify-center items-center  "
          />
        </section>
      </LayoutLogin>
    </div>
  );
};

export default RegisterPage;
