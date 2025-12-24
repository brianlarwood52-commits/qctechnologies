import type { NextConfig } from "next";
// @ts-ignore - next-pwa doesn't have TypeScript definitions
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export', // Static export for cPanel
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  // Add empty turbopack config to allow webpack-based plugins
  turbopack: {},
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  buildExcludes: [/middleware-manifest\.json$/],
  sw: "sw.js",
});

export default pwaConfig(nextConfig);

