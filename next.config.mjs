/** @type {import('next').NextConfig} */
// Use environment variable if set (for GitHub Pages), otherwise use production check
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/smartcompliance-v0' : '')

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable static export for GitHub Pages
  output: 'export',
  // Set basePath for GitHub Pages subdirectory deployment
  basePath: basePath,
  // Set assetPrefix to match basePath for proper asset loading
  assetPrefix: basePath || undefined,
  trailingSlash: true,
}

export default nextConfig
