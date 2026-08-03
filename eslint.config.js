import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Flat ESLint config for this Next.js app. Previously supplied by the
 * `@repo/eslint-config/next-js` workspace package; inlined here now that the
 * project stands alone.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
    {
        ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts']
    },
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        ...pluginReact.configs.flat.recommended,
        languageOptions: {
            ...pluginReact.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.serviceworker,
                ...globals.browser
            }
        }
    },
    {
        plugins: {
            '@next/next': pluginNext
        },
        rules: {
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs['core-web-vitals'].rules
        }
    },
    {
        plugins: {
            'react-hooks': pluginReactHooks
        },
        settings: { react: { version: 'detect' } },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,
            // Not needed with the modern JSX transform.
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-explicit-any': 'off'
        }
    }
];
