import SpotlightBorder from '@/components/common/spotlight-border';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import Tag from '@/components/common/tag';
import type { Project } from '@/components/home/projects/contents';
import styles from '@/components/home/projects/project-card.module.css';
import ProjectLink from '@/components/home/projects/project-link';
import { Github } from '@/components/icons';
import { cn } from '@/utils/cn';
import { ExternalLink } from 'lucide-react';
import type { CSSProperties } from 'react';

/**
 * One project as a spotlit card. Stays a server component: the pointer tracking
 * is delegated to the SpotlightList wrapping the grid.
 *
 * Each card gets its own corner glow, generated from its position with the
 * golden angle so consecutive cards land far apart on the colour wheel. Driven
 * only by the index, so a project added to contents.ts is tinted automatically.
 */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    const hue = (index * 137.508) % 360;
    const glow = {
        '--glow-a': `oklch(0.72 0.16 ${hue})`,
        '--glow-b': `oklch(0.72 0.16 ${hue + 40})`,
        '--glow-c': `oklch(0.72 0.16 ${hue + 80})`
    } as CSSProperties;

    return (
        <li
            {...spotlightSurfaceProps}
            style={glow}
            className={cn(
                styles.card,
                'border-foreground/10 hover:border-foreground/30 bg-background/40 flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-colors duration-300 sm:p-8'
            )}>
            <p className="text-foreground/60 text-xs font-bold tracking-wide uppercase">
                {project.category}
            </p>
            <h4 className="text-foreground mt-2 text-lg font-bold sm:text-xl">{project.name}</h4>
            <p className="text-foreground/70 mt-3 grow text-base leading-relaxed">
                {project.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                    <Tag key={tech} className="text-foreground/70 px-3 py-1 text-sm">
                        {tech}
                    </Tag>
                ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                <ProjectLink
                    href={project.repoURL}
                    label="Code"
                    ariaLabel={`${project.name} source on GitHub`}
                    Icon={Github}
                />
                {project.links?.map((link) => (
                    <ProjectLink
                        key={link.url}
                        href={link.url}
                        label={link.label}
                        ariaLabel={`${project.name}, ${link.label}`}
                        Icon={ExternalLink}
                    />
                ))}
            </div>

            <SpotlightBorder className={styles.border} />
        </li>
    );
}
