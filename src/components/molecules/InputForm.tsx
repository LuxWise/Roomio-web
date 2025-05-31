import React, { useState } from "react";
import Typography from "../atoms/Typography";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface InputFormProps {
  title: string;
  titleButton: string;
  onAdd: (value: {
    name: string;
    lastname: string;
    email: string;
  }) => Promise<void>;
  className?: string;
}

export const InputForm = ({
  title,
  titleButton,
  className,
  onAdd,
}: InputFormProps) => {
  const [value, setValue] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  const updateValues = (property: string, value: string) => {
    setValue(prevObjet => ({
      ...prevObjet,
      [property]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.email.trim() || !value.lastname.trim() || !value.name.trim())
      return;
    await onAdd(value);
    setValue({
      name: "",
      lastname: "",
      email: "",
    });
  };

  return (
    <form
      className={`flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow w-full max-w-lg border-2 border-gray-300 ${className}`}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" color="blue" className=" text-[#1d63ed] mb-2">
        {title}
      </Typography>
      <Input
        type="text"
        placeholder="Nombre"
        bgColor="white"
        color="black"
        className="w-full border-[#0f43b8]"
        value={value.name}
        onChange={e => updateValues("name", e.target.value)}
      />
      <Input
        type="text"
        placeholder="Apellido"
        bgColor="white"
        color="black"
        className="w-full border-[#0f43b8]"
        value={value.lastname}
        onChange={e => updateValues("lastname", e.target.value)}
      />
      <Input
        type="email"
        placeholder="Correo"
        bgColor="white"
        color="black"
        className="w-full border-[#0f43b8]"
        value={value.email}
        onChange={e => updateValues("email", e.target.value)}
      />

      <Button
        bgColor="blue"
        color="white"
        text={titleButton}
        className=" bg-[#1d63ed] w-full mt-2 "
      />
    </form>
  );
};
