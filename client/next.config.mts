import { fileURLToPath } from 'url';
import path from 'path';
import type { NextConfig } from 'next';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      svg: path.resolve(dirname, './components/assets/svg'),
    },
  },
  rewrites: async () => {
    const port = process.env.NODE_ENV === 'development' ? 8080 : 8200;
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:${port}/:path*`,
      },
    ];
  },
};

export default nextConfig;
