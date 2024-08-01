/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  basePath: "",
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
