import React, { useState } from "react";
import Typography from "../atoms/Typography";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { BarLoader } from "react-spinners";

interface FieldConfig {
  name: string;
  type: string;
  placeholder: string;
}

interface InputFormProps<T> {
  title: string;
  titleButton: string;
  fields: FieldConfig[];
  onSubmit: (value: T) => Promise<void>;
  className?: string;
  initialValues: T;
  showCodeSection?: boolean; // NUEVA PROP
  codeLabel?: string; // Etiqueta opcional para el código
}

export const InputForm = <T extends Record<string, unknown>>({
  title,
  titleButton,
  className,
  onSubmit,
  fields,
  initialValues,
  showCodeSection = false,
  codeLabel = "Ingresa el código de 6 dígitos",
}: InputFormProps<T>) => {
  const [value, setValue] = useState<T>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const updateValues = (property: string, val: string) => {
    setValue(prev => ({
      ...prev,
      [property]: val,
    }));
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 6) setCode(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Si se muestra la sección de código, lo agregamos al value
    let submitValue = value;
    if (showCodeSection) {
      submitValue = { ...value, code } as T;
    }
    await onSubmit(submitValue);
    setValue(initialValues);
    setCode("");
    setLoading(false);
  };

  return (
    <form
      className={`flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow w-full max-w-lg border-2 border-gray-300 ${className}`}
      onSubmit={handleSubmit}
    >
      <Typography variant="h2" color="blue" className="mb-2">
        {title}
      </Typography>

      {showCodeSection && (
        <div className="flex flex-col items-center mb-2 w-full">
          <label className="mb-2 text-gray-700 font-semibold">
            {codeLabel}
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            value={code}
            onChange={handleCodeChange}
            className="border border-[#0f43b8] rounded px-4 py-2 text-center text-lg tracking-widest w-40 outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="______"
          />
        </div>
      )}

      {fields.map(field => (
        <Input
          key={field.name}
          type={field.type}
          placeholder={field.placeholder}
          bgColor="white"
          color="black"
          className="w-full border-[#0f43b8] text-sm"
          value={
            typeof value[field.name] === "string" ||
            typeof value[field.name] === "number"
              ? (value[field.name] as string | number)
              : ""
          }
          onChange={e => updateValues(field.name, e.target.value)}
        />
      ))}

      {loading ? (
        <BarLoader color="#FFF" />
      ) : (
        <Button
          rounded="md"
          bgColor="blue"
          color="white"
          text={titleButton}
          className=" bg-[#1d63ed] w-full mt-2 text-xl font-bold "
        />
      )}
    </form>
  );
};
