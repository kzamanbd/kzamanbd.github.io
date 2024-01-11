/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NODE_ENV === 'production' ? 'export' : 'standalone',
    distDir: process.env.NODE_ENV === 'production' ? '.next' : 'build',
    poweredByHeader: false
};

module.exports = nextConfig;
