import Link from 'next/link';
import type { ComponentType, SVGProps } from 'react';

interface ProjectLinkProps {
    href: string;
    label: string;
    ariaLabel: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const linkClassName =
    'focus-ring text-foreground/70 hover:text-foreground inline-flex min-h-11 items-center gap-2 rounded-sm transition-colors';

/**
 * One link on a project card: source, distribution page, demo, or a page on
 * this site. A relative href stays in the same tab and routes through `Link`,
 * so a project that has its own page here is a real internal link rather than
 * an outbound one.
 */
export default function ProjectLink({ href, label, ariaLabel, Icon }: ProjectLinkProps) {
    if (href.startsWith('/')) {
        return (
            <Link href={href} aria-label={ariaLabel} className={linkClassName}>
                <Icon className="size-5" aria-hidden="true" />
                {label}
            </Link>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={linkClassName}>
            <Icon className="size-5" aria-hidden="true" />
            {label}
        </a>
    );
}
