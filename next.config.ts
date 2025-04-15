import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Ensure that all routes are correctly handled.
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },

  // output: 'export', // Specify that the app should be exported as static HTML
  // distDir: 'out', //  Specify the output directory
};

export default nextConfig;
