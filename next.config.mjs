/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Force clean rebuild
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

export default nextConfig
