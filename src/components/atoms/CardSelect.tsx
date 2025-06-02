import React from "react";
import Typography from "./Typography";

type TextColors = "blue" | "red" | "green" | "white" | "black" | "gray";
type BorderColors = "blue" | "white" | "black";

interface CardSelectProps {
  title: string;
  text: string;
  textColor: TextColors;
  boderColor: BorderColors;
  select?: boolean;
  onClick?: () => void;
}

const borderColors: Record<BorderColors, string> = {
  blue: "border-[#587aff]",
  black: "border-black",
  white: "border-white",
};

const CardSelect = ({
  title,
  text,
  textColor,
  boderColor,
  select,
  onClick,
}: CardSelectProps) => {
  const selectedBg = select
    ? "bg-blue-100 shadow-md rounded-4xl"
    : `border-r-2  ${borderColors[boderColor]}`;
  const selectedText = select ? "black" : textColor;

  return (
    <div
      className={`grid grid-cols-1 grid-rows-2 w-full pl-4 pr-12 py-1 cursor-pointer ${selectedBg}`}
      onClick={onClick}
    >
      <Typography variant="h6" color={selectedText}>
        {title}
      </Typography>
      <Typography variant="span" color={selectedText}>
        {text}
      </Typography>
    </div>
  );
};

export default CardSelect;
