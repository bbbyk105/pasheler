// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // API Routesを使う場合はoutput: "export"を削除
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
