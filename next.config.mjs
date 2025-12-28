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
  // Set basePath for GitHub Pages subdirectory deployment
  basePath: process.env.NODE_ENV === 'production' ? '/smartcompliance-v0' : '',
  trailingSlash: true,
}

export default nextConfig
