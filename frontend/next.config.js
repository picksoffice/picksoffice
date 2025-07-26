/** @type {import('next').NextConfig} */
const nextConfig = {
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
  reactStrictMode: false,

  experimental: {
    esmExternals: true,
  },

  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    const allowedOrigins = isDev
      ? 'http://localhost:3000'
      : 'https://picksoffice.com';

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          ...(isDev
            ? []
            : [
                { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
                {
                  key: 'Content-Security-Policy',
                  value:
                    "default-src 'self'; " +
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
                    "style-src 'self' 'unsafe-inline'; " +
                    "img-src 'self' data: https: blob:; " +
                    "font-src 'self' data:; " +
                    "connect-src 'self' https://www.google-analytics.com https://picksoffice.com https://api.picksoffice.com; " +
                    "frame-src 'self';",
                },
              ]),
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: allowedOrigins },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;