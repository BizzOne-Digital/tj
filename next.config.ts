import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Vercel from bundling the entire public/ folder into serverless functions.
  // public/ is served as static assets; fs reads happen only at build time.
  outputFileTracingExcludes: {
    "*": ["public/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      { pathname: "/api/uploads/**" },
      { pathname: "/staff/**" },
      { pathname: "/sponsors/**" },
      { pathname: "/images/**" },
      { pathname: "/brand/**" },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mountiesyouthbasketball.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
};

export default nextConfig;
