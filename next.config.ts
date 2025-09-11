import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/movie-web-scraper',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;