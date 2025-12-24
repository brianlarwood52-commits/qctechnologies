import type { NextConfig } from "next";
// @ts-ignore - next-pwa doesn't have TypeScript definitions
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  // Fix workspace root warning - only set in development
  // On Netlify, let Next.js auto-detect the root
  ...(process.env.NODE_ENV === 'development' ? { outputFileTracingRoot: process.cwd() } : {}),
  images: {
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
    // Optimize images
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Add empty turbopack config to allow webpack-based plugins
  turbopack: {},
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false, // Always enabled - works in dev and prod
  buildExcludes: [/middleware-manifest\.json$/],
  sw: "sw.js",
});

export default pwaConfig(nextConfig);

