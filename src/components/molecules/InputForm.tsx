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
}

export const InputForm = <T extends Record<string, any>>({
  title,
  titleButton,
  className,
  onSubmit,
  fields,
  initialValues,
}: InputFormProps<T>) => {
  const [value, setValue] = useState<T>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);

  const updateValues = (property: string, val: string) => {
    setValue(prev => ({
      ...prev,
      [property]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(value);
    setValue(initialValues);
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
      {fields.map(field => (
        <Input
          key={field.name}
          type={field.type}
          placeholder={field.placeholder}
          bgColor="white"
          color="black"
          className="w-full border-[#0f43b8] text-sm"
          value={value[field.name] || ""}
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
