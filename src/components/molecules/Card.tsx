import React from "react";
import Typography from "../atoms/Typography";

interface CardProps {
  title: string;
  description: string;
  className?: string;
  textColor?: string;
}

const Card = ({ title, description, className, textColor }: CardProps) => {
  return (
    <div
      className={`flex flex-col items-center rounded-xl p-6 shadow-md ${className}`}
    >
      <Typography
        variant="h5"
        className={`font-bold mb-2 ${textColor ? textColor : `text-gray-900`}`}
      >
        {title}
      </Typography>
      <Typography
        variant="body"
        className={`text-center ${textColor ? textColor : `text-gray-700`} `}
      >
        {description}
      </Typography>
    </div>
  );
};

export default Card;
