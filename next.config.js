/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: process.env.NODE_ENV === 'production' ? '.next' : 'build',
    poweredByHeader: false
};

module.exports = nextConfig;
