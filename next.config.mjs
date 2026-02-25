/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
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
  // Performance & Security
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "sonner", "@radix-ui/react-dropdown-menu", "@radix-ui/react-dialog"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      }
    }
    return config
  },
}


export default nextConfig

