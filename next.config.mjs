/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    qualities: [75, 85],
  },
  // Force clean rebuild
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

export default nextConfig
