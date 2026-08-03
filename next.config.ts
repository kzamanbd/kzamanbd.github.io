import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**'
            }
        ]
    },
    experimental: {
        turbopackFileSystemCacheForDev: true
    }
};

export default nextConfig;
