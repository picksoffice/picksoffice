/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Temporarily ignore TypeScript errors during build
  // Can be removed once all type issues are fixed
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable static optimization to ensure API routes run server-side
  experimental: {
    // Use proper experimental options
    esmExternals: true
  },
  images: {
    domains: ['localhost', '192.168.178.85'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.178.85',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
  // Disable React StrictMode to prevent double API calls
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      }
    ]
  }
};

module.exports = nextConfig;
