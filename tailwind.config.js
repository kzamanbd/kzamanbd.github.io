/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const primary = colors.sky;

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                light: {
                    gray: '#F5F8FA',
                },
                primary: primary,
                info: {
                    light: colors.blue[50],
                    DEFAULT: colors.blue[500],
                },
                danger: {
                    light: colors.red[50],
                    DEFAULT: colors.red[500],
                },
                success: {
                    light: colors.green[50],
                    DEFAULT: colors.green[500],
                },
                warning: {
                    light: colors.yellow[50],
                    DEFAULT: colors.yellow[500],
                },
                secondary: {
                    light: colors.gray[50],
                    DEFAULT: colors.gray[400],
                },
            },
            fontSize: {
                sm: '12px',
            },
        },
    },
    plugins: [],
};
