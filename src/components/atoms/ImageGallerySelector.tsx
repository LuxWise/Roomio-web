import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageGallerySelectorProps {
  images: string[];
  altText?: string;
  className?: string;
}

const Skeleton = ({ width, height }: { width: number; height: number }) => (
  <div
    className="bg-gray-200 animate-pulse rounded-lg mb-4"
    style={{ width, height }}
  />
);

const ImageGallerySelector: React.FC<ImageGallerySelectorProps> = ({
  images,
  altText = "Gallery Image",
  className = "",
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const mainWidth = 500;
  const mainHeight = 300;

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0 || !selectedImage) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <Skeleton width={mainWidth} height={mainHeight} />
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} width={96} height={64} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Imagen principal */}
      <div
        className="border-2 border-blue-400 rounded-lg overflow-hidden mb-4"
        style={{ width: mainWidth, height: mainHeight }}
      >
        <Image
          src={selectedImage}
          alt={altText}
          width={mainWidth}
          height={mainHeight}
          className="object-cover w-full h-full rounded-lg"
          unoptimized
        />
      </div>

      {/* Miniaturas */}
      <div className="flex gap-4 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`rounded-xl overflow-hidden border-2 ${
              selectedImage === img ? "border-blue-400" : "border-transparent"
            } transition-all duration-200`}
          >
            <Image
              src={img}
              alt={`${altText} thumbnail ${index + 1}`}
              width={96}
              height={64}
              className="object-cover w-24 h-16"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallerySelector;
