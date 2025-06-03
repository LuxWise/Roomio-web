import React from "react";
import Typography from "./Typography";

type bgColors = "blue" | "red" | "green" | "white";
type colors = "blue" | "red" | "green" | "white" | "black";
type rounded = "sm" | "md" | "lg" | "xl";

interface buttonProps {
  bgColor: bgColors;
  color: colors;
  text: string;
  className?: string;
  rounded: rounded;
  onClick?: () => void;
}

const bgColors: Record<bgColors, string> = {
  blue: "bg-[#1d63ed]",
  green: "bg-green-600",
  red: "bg-red-500",
  white: "bg-white",
};

const colors: Record<colors, string> = {
  blue: "text-sky-500",
  green: "text-green-600",
  red: "text-red-500",
  white: "text-white",
  black: "text-black",
};

const roundeds: Record<rounded, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const Button = ({
  bgColor,
  color,
  text,
  className,
  rounded,
  onClick,
}: buttonProps) => {
  return (
    <button
      className={`${bgColors[bgColor]} ${colors[color]} ${roundeds[rounded]} ${className} min-w-12 px-2 py-1 transition-all duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <Typography variant="h6">{text}</Typography>
    </button>
  );
};

export default Button;
