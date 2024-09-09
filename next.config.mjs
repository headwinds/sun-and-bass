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
      {
        protocol: "https",
        hostname: "ukf.com",
      },
      {
        protocol: "https",
        hostname: "sunandbass.net",
      },
      { protocol: "https", hostname: "i1.sndcdn.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
