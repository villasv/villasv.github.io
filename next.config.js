const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: { appDir: true },
};

module.exports = withMDX(nextConfig);
