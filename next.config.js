/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "'scontent-*.cdninstagram.com'",
      },
      {
        protocol: "https",
        hostname: "*cdninstagram.com",
      },
    ],
  },
};

module.exports = nextConfig;
