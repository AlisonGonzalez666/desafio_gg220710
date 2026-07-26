import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // El '**' le da permiso a CUALQUIER página de internet
      },
    ],
  },
};

export default nextConfig;