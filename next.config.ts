import type { NextConfig } from "next";

// Fully static export: deploys to Vercel, Netlify, GitHub Pages or any static host.
// GitHub repos are fetched in the browser at runtime, so no rebuild is needed when
// a repo is made private. For a GitHub Pages *project* site (username.github.io/website)
// set NEXT_PUBLIC_BASE_PATH=/website at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
