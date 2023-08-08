/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    gray: '#F5F8FA',
                },
                primary: colors.sky,
            },
            fontSize: {
                sm: '12px',
            },
        },
    },
    plugins: [],
};
