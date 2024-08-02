/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  output: "export",
  basePath: "",
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
