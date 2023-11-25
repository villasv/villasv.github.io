const withMDX = require("@next/mdx")();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.NODE_ENV === "production",
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};

module.exports = [withMDX, withBundleAnalyzer].reduce(
  (config, plugin) => plugin(config),
  nextConfig
);
