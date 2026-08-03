import { cn } from '@/utils/cn';
import type { SVGProps } from 'react';
// AWS is deliberately absent: simple-icons carries no Amazon mark (the brand
// does not license it for redistribution), so the AWS tile uses a generic cloud
// glyph instead of a lookalike logo.
import {
    siDocker,
    siExpress,
    siFirebase,
    siGit,
    siGithubactions,
    siJavascript,
    siLaravel,
    siLinux,
    siMysql,
    siNextdotjs,
    siNginx,
    siNodedotjs,
    siNuxt,
    siPhp,
    siPostgresql,
    siReact,
    siRedis,
    siTailwindcss,
    siTypescript,
    siVuedotjs,
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
    linux: siLinux
} as const;

export type TechIconName = keyof typeof techIcons;

/** The brand colour for a mark, as a CSS hex string. */
export function techBrandColor(name: TechIconName): string {
    return `#${techIcons[name].hex}`;
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
