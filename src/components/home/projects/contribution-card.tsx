import SpotlightBorder from '@/components/common/spotlight-border';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import Tag from '@/components/common/tag';
import type { Contribution } from '@/components/home/projects/contents';
import styles from '@/components/home/projects/contribution-card.module.css';
import ProjectLink from '@/components/home/projects/project-link';
import { Github } from '@/components/icons';
import { cn } from '@/utils/cn';
import { formatArticleDate } from '@/utils/format-date';
import { ExternalLink, GitMerge } from 'lucide-react';
import type { CSSProperties } from 'react';

/**
 * A merged pull request into an upstream repository, as a wide spotlit card.
 * Stays a server component: the pointer tracking is delegated to the
 * SpotlightList wrapping it.
 *
 * Fixed violet-to-indigo glow rather than the project grid's index-derived hue,
 * because "merged" is a colour a reader already knows from GitHub, and a
 * contribution should not look like the next card along in the projects grid.
 *
 * The diff stat is the whole claim of the card, so it is rendered from real
 * numbers and set in monospace with tabular figures. The mono face is the
 * system one here: JetBrains Mono is route-scoped to the article pages, and
 * --font-mono falls back to ui-monospace everywhere else, so this costs no font
 * on the home page.
 */
const glow = {
    '--glow-a': 'var(--color-violet-500)',
    '--glow-b': 'var(--color-indigo-500)',
    '--glow-c': 'var(--color-sky-500)'
} as CSSProperties;

export default function ContributionCard({ contribution }: { contribution: Contribution }) {
    const { additions, deletions, files } = contribution.diff;

    return (
        <li
            {...spotlightSurfaceProps}
            style={glow}
            className={cn(
                styles.card,
                'border-foreground/10 hover:border-foreground/30 bg-background/40 flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-colors duration-300 sm:p-8'
            )}>
            <span aria-hidden="true" className={styles.rail} />

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-bold tracking-wide text-violet-700 uppercase ring-1 ring-violet-500/25 dark:text-violet-300">
                    <GitMerge aria-hidden="true" className="size-3.5" />
                    Merged
                </span>
                <a
                    href={contribution.repoURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-foreground/70 hover:text-foreground rounded-sm font-mono text-sm break-all transition-colors">
                    {contribution.repo}
                </a>
                <span className="text-foreground/40 font-mono text-sm">#{contribution.number}</span>
            </div>

            <h4 className="text-foreground mt-4 text-xl font-bold sm:text-2xl">
                {contribution.title}
            </h4>
            <p className="text-foreground/50 mt-1 text-sm">{contribution.repoDescription}</p>

            <p className="text-foreground/70 mt-3 grow text-base leading-relaxed">
                {contribution.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
                {contribution.tech.map((tech) => (
                    <Tag key={tech} className="text-foreground/70 px-3 py-1 text-sm">
                        {tech}
                    </Tag>
                ))}
            </ul>

            <p className="text-foreground/60 mt-5 font-mono text-sm tabular-nums">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    +{additions}
                </span>{' '}
                <span className="font-bold text-rose-600 dark:text-rose-400">
                    &minus;{deletions}
                </span>{' '}
                <span aria-hidden="true">·</span> {files} files <span aria-hidden="true">·</span>{' '}
                merged{' '}
                <time dateTime={contribution.mergedAt}>
                    {formatArticleDate(contribution.mergedAt)}
                </time>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                <ProjectLink
                    href={contribution.pullRequestURL}
                    label={`Pull request #${contribution.number}`}
                    ariaLabel={`${contribution.repo} pull request ${contribution.number} on GitHub`}
                    Icon={Github}
                />
                {contribution.links?.map((link) => (
                    <ProjectLink
                        key={link.url}
                        href={link.url}
                        label={link.label}
                        ariaLabel={`${contribution.repo}, ${link.label}`}
                        Icon={ExternalLink}
                    />
                ))}
            </div>

            <SpotlightBorder className={styles.border} />
        </li>
    );
}
