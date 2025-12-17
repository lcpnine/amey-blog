import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable static exports for Netlify (comment out for Vercel)
  // output: 'export',

  // Image optimization
  images: {
    // For static export, use unoptimized
    // unoptimized: true,

    // Remote image domains (add domains you want to use)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Trailing slashes (optional)
  // trailingSlash: true,

  // Experimental features
  experimental: {
    // Enable if you want to use MDX
    // mdxRs: true,
  },
}

export default nextConfig
