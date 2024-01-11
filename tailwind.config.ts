/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    gray: '#F5F8FA'
                },
                primary: colors.sky
            },
            fontSize: {
                sm: '12px'
            }
        }
    },
    plugins: []
};

export default config;
