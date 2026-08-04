import { cn } from '@/utils/cn';
import type { SVGProps } from 'react';
// AWS is deliberately absent: simple-icons carries no Amazon mark (the brand
// does not license it for redistribution), so the AWS tile uses a generic cloud
// glyph instead of a lookalike logo.
import {
    siAnthropic,
    siBruno,
    siCaddy,
    siCloudflare,
    siDocker,
    siExpress,
    siFirebase,
    siGit,
    siGithub,
    siGithubactions,
    siGitlab,
    siGooglegemini,
    siGraphql,
    siJavascript,
    siJellyfin,
    siKotlin,
    siLaravel,
    siLinux,
    siMarkdown,
    siMysql,
    siN8n,
    siNextdotjs,
    siNginx,
    siNodedotjs,
    siNuxt,
    siPhp,
    siPihole,
    siPnpm,
    siPostgresql,
    siPostman,
    siPrisma,
    siProxmox,
    siQdrant,
    siReact,
    siRedis,
    siSqlite,
    siStripe,
    siTailwindcss,
    siTypescript,
    siUbuntu,
    siVite,
    siVuedotjs,
    siWireguard,
    siWoocommerce,
    siWordpress
} from 'simple-icons';

/**
 * Brand marks for the stack, taken from `simple-icons` rather than transcribed
 * by hand: the paths are the official ones and stay correct when a brand
 * refreshes its logo. Only the marks actually used are imported, so the rest of
 * the set is dropped at build time.
 *
 * `hex` travels with each icon, which is what lets a tile bloom to the real
 * brand colour on hover instead of a colour picked by eye.
 */
export const techIcons = {
    php: siPhp,
    laravel: siLaravel,
    wordpress: siWordpress,
    javascript: siJavascript,
    typescript: siTypescript,
    react: siReact,
    nextjs: siNextdotjs,
    vue: siVuedotjs,
    nuxt: siNuxt,
    nodejs: siNodedotjs,
    express: siExpress,
    tailwind: siTailwindcss,
    mysql: siMysql,
    postgresql: siPostgresql,
    redis: siRedis,
    firebase: siFirebase,
    docker: siDocker,
    nginx: siNginx,
    git: siGit,
    githubActions: siGithubactions,
    linux: siLinux,
    // Marks below are not used by the skills grid; they exist so an article's
    // `tech:` frontmatter can be rendered as brand chips rather than bare text.
    anthropic: siAnthropic,
    bruno: siBruno,
    caddy: siCaddy,
    cloudflare: siCloudflare,
    gemini: siGooglegemini,
    github: siGithub,
    gitlab: siGitlab,
    graphql: siGraphql,
    jellyfin: siJellyfin,
    kotlin: siKotlin,
    markdown: siMarkdown,
    n8n: siN8n,
    pihole: siPihole,
    pnpm: siPnpm,
    postman: siPostman,
    prisma: siPrisma,
    proxmox: siProxmox,
    qdrant: siQdrant,
    sqlite: siSqlite,
    stripe: siStripe,
    ubuntu: siUbuntu,
    vite: siVite,
    wireguard: siWireguard,
    woocommerce: siWoocommerce
} as const;

export type TechIconName = keyof typeof techIcons;

/** The brand colour for a mark, as a CSS hex string. */
export function techBrandColor(name: TechIconName): string {
    return `#${techIcons[name].hex}`;
}

/**
 * Free-text `tech:` labels written in frontmatter ("Next.js", "Tailwind CSS")
 * reduced to the key they should paint with. Only the spellings that do not
 * survive `normalise` below need an entry.
 */
const techIconAliases: Record<string, TechIconName> = {
    node: 'nodejs',
    next: 'nextjs',
    nuxtjs: 'nuxt',
    vuejs: 'vue',
    reactjs: 'react',
    tailwindcss: 'tailwind',
    postgres: 'postgresql',
    expressjs: 'express',
    githubactions: 'githubActions',
    claude: 'anthropic',
    claudecode: 'anthropic',
    googlegemini: 'gemini'
};

/** Lowercase and drop everything a brand name might be punctuated with. */
function normalise(label: string): string {
    return label.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Resolves a human-written stack label to a brand mark, or `undefined` when the
 * site carries no mark for it. Callers fall back to a plain text chip, so an
 * unknown tool never blocks an article from shipping.
 */
export function techIconForLabel(label: string): TechIconName | undefined {
    const key = normalise(label);
    if (key in techIcons) return key as TechIconName;
    return techIconAliases[key];
}

interface TechIconProps extends SVGProps<SVGSVGElement> {
    name: TechIconName;
}

/**
 * One brand mark. It paints in `currentColor`, so the caller decides whether it
 * sits muted with the rest of a grid or lights up in its own brand colour.
 */
export default function TechIcon({ name, className, ...rest }: TechIconProps) {
    const icon = techIcons[name];

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="img"
            aria-hidden="true"
            className={cn('size-6', className)}
            {...rest}>
            <path d={icon.path} />
        </svg>
    );
}
