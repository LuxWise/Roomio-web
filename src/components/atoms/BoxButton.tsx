import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

type bgColors = "blue" | "red" | "green" | "white";
type colors = "blue" | "red" | "green" | "white" | "black";
type shadow = "blue" | "black" | "white";

interface BoxButtonProps {
  bgColor: bgColors;
  color: colors;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  shadow?: shadow;
  className?: string;
  onClick?: () => void;
}

const bgColors: Record<bgColors, string> = {
  blue: "bg-[#587aff]",
  green: "bg-green-600",
  red: "bg-red-500",
  white: "bg-white",
};

const colors: Record<colors, string> = {
  blue: "#587aff",
  green: "text-green-600",
  red: "text-red-500",
  white: "#FFF",
  black: "#000",
};

const shadows: Record<shadow, string> = {
  blue: "shadow-blue-400",
  black: "",
  white: "",
};

const BoxButton = ({
  bgColor,
  color,
  icon: Icon,
  shadow,
  className,
  onClick,
}: BoxButtonProps) => {
  return (
    <div
      className={`${bgColors[bgColor]} ${
        shadow && `shadow ${shadows[shadow]}`
      }  ${className} min-w-12 min-h-12 p-3 rounded-xl  transition-all duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <Icon color={colors[color]} />
    </div>
  );
};

export default BoxButton;
