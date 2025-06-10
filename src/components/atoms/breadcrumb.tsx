import React from "react";
import Typography from "./Typography";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();

  return (
    <div className="absolute top-20 left-5 bg-sky-600 px-5 py-2 rounded-3xl">
      <Typography variant="h6" color="white">
        {pathname}
      </Typography>
    </div>
  );
};

export default Breadcrumb;
