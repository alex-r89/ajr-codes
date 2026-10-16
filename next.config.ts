// next.config.ts
import type { NextConfig } from 'next'

// The blog is exported as plain files and served by Workers Static Assets, with no Worker
// code in front. Asset requests use no CPU, so bots probing junk paths just get 404.html
// instead of starting Next for every request.
const nextConfig: NextConfig = {
  output: 'export',
  // A static export has no server to run the image optimizer.
  images: { unoptimized: true }
}

export default nextConfig
