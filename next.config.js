/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NODE_ENV === 'production' ? 'export' : 'standalone',
    distDir: process.env.NODE_ENV === 'production' ? '.next' : 'build',
    poweredByHeader: false,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'sandbox.sslcommerz.com'
            }
        ]
    }
};

module.exports = nextConfig;
