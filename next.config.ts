import type { NextConfig } from 'next';

const nodeEnv = process.env.NODE_ENV;
const isDevelopment = nodeEnv === 'development';

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      },
    ],
    unoptimized: isDevelopment,
  },

  headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
