import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(currentDirectory, ".."),
  },
  transpilePackages: ['@agent-to-agent/shared'],
};

export default nextConfig;
