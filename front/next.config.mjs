/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this line to enable static HTML export
  output: "export",

  // Added trailingSlash to help with static export routing
  trailingSlash: true, // <-- ADDED THIS LINE

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
