/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  transpilePackages: ['task-core', 'lodash-es'],
};

module.exports = nextConfig;
