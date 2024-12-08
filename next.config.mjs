/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blob.encryptedlist.xyz",
        port: "",
        pathname: "/icons/apps/**"
      }
    ]
  }
};

export default nextConfig;
