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
      {
        protocol: 'https',
        hostname: 'pruthviraj-be.rme.org.in',
        port: '', // Port is empty for standard HTTPS
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'pruthviraj-portfolio-be.vercel.app',
        port: '', // Port is empty for standard HTTPS
        pathname: '/uploads/**',
      },
      // Add more patterns if you use other hosts or environments
    ],
  },
};

module.exports = nextConfig;