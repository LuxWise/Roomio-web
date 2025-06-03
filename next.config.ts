// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "roomio.blob.core.windows.net",
        pathname: "/roomio-hotels/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
