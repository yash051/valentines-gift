import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
  // Move it here (top-level)
  allowedDevOrigins: ["*"], 
  
  /* Other config options */
  experimental: {
    // Remove allowedDevOrigins from here
  },

};

export default nextConfig;