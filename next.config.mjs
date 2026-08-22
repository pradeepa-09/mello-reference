/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "motion"],
  },
};

export default nextConfig;
