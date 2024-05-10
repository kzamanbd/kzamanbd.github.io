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
    },

    // env variables
    env: {
        NEXT_PUBLIC_BASE_URL:
            process.env.NODE_ENV === 'production' ? 'https://draftscripts.com' : 'http://localhost:3000',
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: '6Ld4FNYpAAAAACVEuT5nAzdN6MJt9J6ZjKGzkHFR',
        NEXT_PUBLIC_RECAPTCHA_SECRET_KEY: '6Ld4FNYpAAAAADoLDOe7z2goWDV9rNpLsbFhvUXz',
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: 'R7I9UQ9vgkHLXOPeK',
        NEXT_PUBLIC_STORE_ID: 'dilde663b30711216f',
        NEXT_PUBLIC_STORE_PASSWORD: 'dilde663b30711216f@ssl'
    }
};

module.exports = nextConfig;
