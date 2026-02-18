import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.automatech.ca",
      },
    ],
  },
};

export default nextConfig;
