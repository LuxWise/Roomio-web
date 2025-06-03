import React from "react";
import Typography from "../atoms/Typography";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type shadow = "blue" | "black" | "white";

interface CardProps {
  name: string;
  ubication: string;
  price: string;
  className?: string;
  textColor?: string;
  img: string | StaticImport;
  shadow?: shadow;
}

const shadows: Record<shadow, string> = {
  blue: "shadow-[#4c7cda]",
  black: "shadow-[#000]",
  white: "shadow-[#c7c7c7]",
};

const Card = ({
  name,
  ubication,
  price,
  className,
  textColor,
  img,
  shadow,
}: CardProps) => {
  return (
    <div
      className={`flex flex-col px-5 py-2  gap-y-5 rounded-xl ${className}}`}
    >
      <div className="relative cursor-pointer">
        <Image
          src={img}
          alt=""
          width={450}
          height={400}
          unoptimized
          className={`rounded-2xl hover:shadow-lg hover: transition-all duration-300 ${
            shadow && shadows[shadow]
          }`}
        />
        <div className="absolute bottom-5 left-4 bg-white px-2 rounded-lg ">
          <Typography variant="h5">{name}</Typography>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <Typography
          variant="h5"
          className={`${textColor ? textColor : `text-gray-900`}`}
        >
          {ubication}
        </Typography>
        <Typography
          variant="h6"
          className={`${textColor ? textColor : `text-gray-700`} `}
        >
          {price}
        </Typography>
      </div>
    </div>
  );
};

export default Card;
