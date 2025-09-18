/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Handle static files from the frontend build
  async rewrites() {
    return [
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        destination: '/frontend/launch-lab/index.html',
      },
    ];
  },
  // Serve static files from the CRA build
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
