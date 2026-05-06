import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/VentureOne";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isPages ? repoBasePath : undefined,
  assetPrefix: isPages ? repoBasePath : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? repoBasePath : "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
