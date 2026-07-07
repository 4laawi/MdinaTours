import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize barrel imports — eliminates 200-800ms cold start cost per library
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },

  // Image optimization: serve AVIF + WebP automatically
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compress responses on Vercel edge
  compress: true,

  // Enable Turbopack configuration to silence Webpack warning in dev mode
  turbopack: {},

  // Combine CSS files into a single styles chunk to prevent render-blocking separate requests
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: "styles",
          test: /\.(css|scss|sass)$/,
          chunks: "all",
          enforce: true,
          priority: 200,
        },
      };
    }
    return config;
  },

  // Security + performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Force HTTPS for 1 year, include subdomains
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Control referrer info
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Disable FLoC / Topics API
          { key: "Permissions-Policy", value: "interest-cohort=()" },
        ],
      },
      // Long-cache static assets in public/
      {
        source: "/(.*)\\.(webp|png|jpg|jpeg|svg|ico|woff2|woff)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
