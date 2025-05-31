import React from "react";

type variants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "span";
type colors = "blue" | "red" | "green" | "white" | "black" | "gray";
interface TypographyProps {
  variant?: variants;
  color?: colors;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<variants, string> = {
  h1: "text-5xl font-bold",
  h2: "text-4xl font-semibold",
  h3: "text-3xl font-semibold",
  h4: "text-2xl font-medium",
  h5: "text-xl font-medium",
  h6: "text-lg font-medium",
  body: "text-base",
  span: "text-sm text-gray-500",
};

const colorClasses: Record<colors, string> = {
  blue: "text-sky-700",
  green: "text-green-700",
  red: "text-red-700",
  white: "text-white",
  black: "text-black",
  gray: "text-gray-700",
};

const Typography = ({
  variant = "body",
  color = "black",
  className = "",
  children,
}: TypographyProps) => {
  const Tag = variant.startsWith("h") ? variant : "span";
  return (
    <Tag
      className={`${variantClasses[variant]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Typography;
