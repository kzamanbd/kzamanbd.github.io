import SpotlightBorder from '@/components/common/spotlight-border';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import SpotlightGroup from '@/components/common/spotlight-group';
import styles from '@/components/home/skills/skill-card.module.css';
import { cn } from '@/utils/cn';

/** Key takeaways from the article's frontmatter, shown above the body. */
export default function WhatYoullLearn({ items }: { items: string[] }) {
    if (items.length === 0) return null;

    return (
        <SpotlightGroup className="contents">
            <aside
                {...spotlightSurfaceProps}
                style={{ '--brand-color': 'var(--color-emerald-500)' } as React.CSSProperties}
                className={cn(
                    styles.card,
                    'border-foreground/10 bg-background/40 rounded-2xl border p-6 backdrop-blur-sm'
                )}>
                <h2 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">
                    What you&apos;ll learn
                </h2>
                <ul className="text-foreground/80 mt-3 space-y-2 text-sm">
                    {items.map((item) => (
                        <li key={item} className="flex gap-2">
                            <span aria-hidden="true" className="text-emerald-500">
                                &#8226;
                            </span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <SpotlightBorder className={styles.border} />
            </aside>
        </SpotlightGroup>
    );
}
