/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NODE_ENV === 'production' ? 'export' : 'standalone',
    distDir: process.env.NODE_ENV === 'production' ? '.next' : 'build',
    poweredByHeader: false,

    // env variables
    env: {
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: '6Ld4FNYpAAAAACVEuT5nAzdN6MJt9J6ZjKGzkHFR',
        NEXT_PUBLIC_RECAPTCHA_SECRET_KEY: '6Ld4FNYpAAAAADoLDOe7z2goWDV9rNpLsbFhvUXz',
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: 'R7I9UQ9vgkHLXOPeK'
    }
};

module.exports = nextConfig;
