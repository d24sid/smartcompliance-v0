/** @type {import('next').NextConfig} */
// Set basePath for GitHub Pages deployment
const basePath = process.env.NODE_ENV === 'production' ? '/smartcompliance-v0' : ''

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable static export for GitHub Pages (creates 'out' directory)
  output: 'export',
  // Set basePath for GitHub Pages subdirectory deployment
  basePath: basePath,
  // Set assetPrefix to match basePath for proper asset loading
  assetPrefix: basePath,
  trailingSlash: true,
}

export default nextConfig
