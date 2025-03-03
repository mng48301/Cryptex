/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.optimization.splitChunks.cacheGroups = {
      ...config.optimization.splitChunks.cacheGroups,
      '@tanstack/react-query-devtools': {
        test: /[\\/]node_modules[\\/](@tanstack\/react-query-devtools)[\\/]/,
        name: '@tanstack/react-query-devtools',
        priority: 10,
        reuseExistingChunk: false,
      },
    };
    return config;
  },
};

module.exports = nextConfig;
