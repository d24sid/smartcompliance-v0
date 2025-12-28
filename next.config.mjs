/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable static export for GitHub Pages
  output: 'export',
  // Uncomment and set basePath if your repository name is not the root
  // basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  trailingSlash: true,
}

export default nextConfig
