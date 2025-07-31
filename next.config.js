/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
  },
  trailingSlash: false,
  // output: 'standalone', // Vercel用に無効化
  poweredByHeader: false,
  compress: true,
  // Vercel deployment optimization
  images: {
    domains: [],
    unoptimized: true
  }
};

module.exports = nextConfig;
