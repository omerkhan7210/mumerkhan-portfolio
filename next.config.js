/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // SEO optimization
  compress: true,
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
