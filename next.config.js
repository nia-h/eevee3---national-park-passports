/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    topLevelAwait: true,
  },
  webpack(config) {
    //reference: https://github.com/vercel/next.js/issues/2
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
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
