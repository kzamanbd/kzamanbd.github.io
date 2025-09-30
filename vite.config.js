import tailwindcss from '@tailwindcss/vite';
import { globSync } from 'glob';
import { defineConfig } from 'vite';

const entries = ['*.html', '!node_modules/**/*.html'];
const input = globSync(entries).reduce((acc, fp) => {
    const entryName = fp.replace(/\//g, '-').replace(/\.html$/, '');
    acc[entryName] = fp;
    return acc;
}, {});

export default defineConfig({
    plugins: [tailwindcss()],
    optimizeDeps: { entries },
    build: {
        target: 'esnext',
        rollupOptions: {
            input
        },
        chunkSizeWarningLimit: 1000 // 1000KiB
    },
    server: {
        port: 6500,
        open: true
    }
});
