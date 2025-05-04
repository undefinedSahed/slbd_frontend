import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('http://res.cloudinary.com/**')],
  },
};

export default nextConfig;
