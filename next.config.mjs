// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "assets.plumenetwork.xyz",
        }
      ]
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Provide empty mocks for Node.js modules that are not supported in the browser
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
        };
      }
      return config;
    },
  };

export default nextConfig;
