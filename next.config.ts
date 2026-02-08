import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Move it here (top-level)
  allowedDevOrigins: ["*"], 
  
  /* Other config options */
  experimental: {
    // Remove allowedDevOrigins from here
  },
};

export default nextConfig;