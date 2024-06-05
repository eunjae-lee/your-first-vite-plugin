import { webpackPlugin } from "./plugin.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(webpackPlugin());
    }
    return config;
  },
};

export default nextConfig;
