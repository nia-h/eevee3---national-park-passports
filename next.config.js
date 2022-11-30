/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nps.gov',
        pathname: '/common/uploads/structured_data/**',
      },
    ],
  },
};

module.exports = nextConfig;
