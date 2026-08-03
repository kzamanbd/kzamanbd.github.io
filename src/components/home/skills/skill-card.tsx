import SpotlightBorder from '@/components/common/spotlight-border';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import { skillBrandColor, type Skill } from '@/components/home/skills/contents';
import styles from '@/components/home/skills/skill-card.module.css';
import TechIcon from '@/components/icons/tech-icon';
import { cn } from '@/utils/cn';
import type { CSSProperties } from 'react';

/**
 * One skill as a square tile: the mark stacked above its name. The icon is
 * muted at rest, so the grid reads as one set, and blooms to the brand colour
 * on hover (or to the theme foreground for the practice tiles, which have no
 * brand of their own).
 *
 * Stays a server component: the pointer tracking is delegated to the
 * SpotlightList wrapping the whole grid.
 */
export default function SkillCard({ skill }: { skill: Skill }) {
    const brandColor = skillBrandColor(skill);

    return (
        <li
            {...spotlightSurfaceProps}
            style={brandColor ? ({ '--brand-color': brandColor } as CSSProperties) : undefined}
            className={cn(
                styles.tile,
                'group border-foreground/10 hover:border-foreground/25 bg-background/40 flex aspect-square w-20 flex-col items-center justify-center gap-2.5 rounded-xl border p-2 text-center backdrop-blur-sm transition-colors duration-300 sm:w-24 lg:w-28'
            )}>
            {skill.kind === 'brand' ? (
                <TechIcon
                    name={skill.icon}
                    className="text-foreground/70 size-7 shrink-0 transition-colors duration-300 group-hover:[color:var(--brand-color)]"
                />
            ) : (
                <skill.Icon
                    aria-hidden="true"
                    className="text-foreground/70 group-hover:text-foreground size-7 shrink-0 transition-colors duration-300"
                    strokeWidth={1.75}
                />
            )}

            <span className="text-foreground/75 group-hover:text-foreground text-xs leading-tight font-medium transition-colors duration-300">
                {skill.name}
            </span>

            <SpotlightBorder className={styles.border} />
        </li>
    );
}
