/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "john-b.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/profile_images/**",
      },
      {
        protocol: "https",
        hostname: "imgproxy.ra.co",
        //port: "/_/**",
      },
    ],
  },
};

export default nextConfig;
