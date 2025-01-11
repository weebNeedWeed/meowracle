import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "meowracle-bucket-b4922fdf-57d1-4ef8-9971-953640730c71.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
