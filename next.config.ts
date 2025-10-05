import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN: Temporarily bypass TypeScript errors during build
    ignoreBuildErrors: true,
  },
  experimental: {
    typedRoutes: false,
  },
  eslint: {
    // !! WARN: Temporarily bypass ESLint errors during build
    ignoreDuringBuilds: true,
  },
  headers: async () => {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|png|jpg|jpeg|webp|gif|ico)",
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
