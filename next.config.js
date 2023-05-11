const withMDX = require("@next/mdx")();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.NODE_ENV === "production",
  openAnalyzer: false,
});

const webpackPreactPlugin = (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    Object.assign(config.resolve.alias, {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
    });
  }
  return config;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: { appDir: true },
  images: { unoptimized: true },
  webpack: webpackPreactPlugin,
};

module.exports = [withMDX, withBundleAnalyzer].reduce(
  (config, plugin) => plugin(config),
  nextConfig
);
