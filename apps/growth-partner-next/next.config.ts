import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    // Phase 0 policy: the production build must fail on any type error.
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
