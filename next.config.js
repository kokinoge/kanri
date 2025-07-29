/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Vercel向けの設定
  trailingSlash: false,
  poweredByHeader: false,
};

module.exports = nextConfig;
