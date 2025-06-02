import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://roomio.blob.core.windows.net/roomio-hotels/**"),
    ],
  },
};

export default nextConfig;
