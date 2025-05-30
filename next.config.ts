import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'hillcross-presigned-uploads.s3.eu-west-2.amazonaws.com',
      'hillcrosscollege.s3.eu-west-2.amazonaws.com',
      'hillcrosscollege-prod.s3.eu-west-2.amazonaws.com',
      'example.com',
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
    }
  },
  serverExternalPackages: ["@node-rs/argon2"]
};

export default nextConfig;
