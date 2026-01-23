/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.blazimg.com" },
      { protocol: "https", hostname: "www.foot.fr" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "maillots-senegal.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "amnakoo.com" }
    ],
  },
  serverExternalPackages: ["@prisma/client", "prisma"],
}

export default nextConfig
