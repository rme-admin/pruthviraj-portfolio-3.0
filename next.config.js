/** @type {import('next').NextConfig} */
const imageHost = process.env.NEXT_PUBLIC_IMAGE_HOST || process.env.IMAGE_HOST || '';
const imageProtocol = process.env.NEXT_PUBLIC_IMAGE_PROTOCOL || process.env.IMAGE_PROTOCOL || '';
const imagePort = process.env.NEXT_PUBLIC_IMAGE_PORT || process.env.IMAGE_PORT || '';
const imagePathname = process.env.NEXT_PUBLIC_IMAGE_PATHNAME || process.env.IMAGE_PATHNAME || '/uploads/**';

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
      // If imageHost is empty the pattern is skipped to avoid invalid entries.
      ...(imageHost
        ? [
            {
              protocol: imageProtocol || 'https',
              hostname: imageHost,
              port: imagePort,
              pathname: imagePathname,
            },
          ]
        : []),
      // Add more patterns if you use other hosts or environments
    ],
  },
};

module.exports = nextConfig;