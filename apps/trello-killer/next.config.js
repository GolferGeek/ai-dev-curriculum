/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@curriculum/surrealdb"],
  experimental: {
    serverComponentsExternalPackages: ["surrealdb"],
  },
};

module.exports = nextConfig;
