/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons.encryptedlist.xyz",
        port: "",
        pathname: "/icons/**"
      }
    ]
  }
};

export default nextConfig;
