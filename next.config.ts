import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.myanimelist.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net/anime/",

        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
