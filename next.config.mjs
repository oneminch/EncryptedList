/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons.encryptedlist.xyz",
        port: "",
        pathname: "/icons/**"
      }
    ]
  },
  rewrites: async () => {
    return [
      {
        source: "/api/data/:match*",
        destination: "https://encryptedlist.xyz/_vercel/insights/:match*",
      },
    ];
  },
};

export default nextConfig;
