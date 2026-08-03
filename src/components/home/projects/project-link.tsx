import type { ComponentType, SVGProps } from 'react';

interface ProjectLinkProps {
    href: string;
    label: string;
    ariaLabel: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/** One outbound link on a project card: source, distribution page, or demo. */
export default function ProjectLink({ href, label, ariaLabel, Icon }: ProjectLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className="focus-ring text-foreground/70 hover:text-foreground inline-flex min-h-11 items-center gap-2 rounded-sm transition-colors">
            <Icon className="size-5" aria-hidden="true" />
            {label}
        </a>
    );
}
