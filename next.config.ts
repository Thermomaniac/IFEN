import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.106"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  // Routes renamed in the correction programme (2026-10-18). Temporary (307) while staging settles.
  async redirects() {
    return [
      { source: "/neurofeedback/methods", destination: "/neurofeedback/topics", permanent: false },
      { source: "/neurofeedback/applications", destination: "/neurofeedback/areas-of-application", permanent: false },
    ];
  },
};

export default nextConfig;
