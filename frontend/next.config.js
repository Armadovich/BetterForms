/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configuración para conectar con el backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:5000/api/:path*' 
          : '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 