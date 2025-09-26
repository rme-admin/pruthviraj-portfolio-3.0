/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...existing config...
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/uploads/images/**',
      },
      // Add more patterns if you use other hosts or environments
    ],
  },
};

module.exports = nextConfig;