/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/#services',
        permanent: false,
      },
    ];
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
}

module.exports = nextConfig
