import SpotlightBorder from '@/components/common/spotlight-border';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import Tag from '@/components/common/tag';
import styles from '@/components/home/skills/skill-card.module.css';
import type { SkillGroup } from '@/components/home/skills/contents';
import { cn } from '@/utils/cn';

/**
 * One group of skills as a spotlit tile. Stays a server component: the pointer
 * tracking is delegated to the SpotlightList wrapping the whole grid.
 */
export default function SkillCard({ title, brandColor, skills }: SkillGroup) {
    return (
        <li
            {...spotlightSurfaceProps}
            style={{ '--brand-color': brandColor } as React.CSSProperties}
            className={cn(
                styles.card,
                'border-foreground/10 bg-background/40 rounded-2xl border p-6 backdrop-blur-sm'
            )}>
            <h3 className="text-foreground text-lg font-semibold">{title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Tag
                        key={skill}
                        className="text-foreground/70 hover:border-foreground/40 px-3 py-1 text-sm">
                        {skill}
                    </Tag>
                ))}
            </ul>
            <SpotlightBorder className={styles.border} />
        </li>
    );
}
