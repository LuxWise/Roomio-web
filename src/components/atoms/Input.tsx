import React from "react";

type bgColors = "blue" | "red" | "green" | "white";
type colors = "blue" | "red" | "green" | "white" | "black";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  bgColor?: bgColors;
  color?: colors;
  className?: string;
}

const bgColors: Record<bgColors, string> = {
  blue: "bg-sky-100",
  green: "bg-green-100",
  red: "bg-red-100",
  white: "bg-white",
};

const colors: Record<colors, string> = {
  blue: "text-sky-700",
  green: "text-green-700",
  red: "text-red-700",
  white: "text-white",
  black: "text-black",
};

const Input = ({
  bgColor = "white",
  color = "black",
  className = "",
  ...props
}: InputProps) => {
  return (
    <input
      className={`rounded-lg px-4 py-2 border outline-none focus:ring-2 focus:ring-sky-400 ${bgColors[bgColor]} ${colors[color]} ${className}`}
      {...props}
    />
  );
};

export default Input;
