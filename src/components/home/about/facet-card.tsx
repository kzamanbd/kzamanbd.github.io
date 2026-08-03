import SpotlightBorder from '@/components/common/spotlight-border';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import type { Facet } from '@/components/home/about/contents';
import styles from '@/components/home/about/facet-card.module.css';
import { cn } from '@/utils/cn';
import type { CSSProperties } from 'react';

interface FacetCardProps {
    facet: Facet;
    className?: string;
    /** Keeps a faint tint on for the bento tiles, which cannot be hovered. */
    persistent?: boolean;
}

/**
 * One facet: an accent-dotted title and a one-line statement. On hover a soft
 * accent gradient grows in from the corner the connector line attaches to,
 * matching that line's colour and direction, and the cursor lights the surface
 * and the nearest stretch of border as it does on every other card.
 */
export default function FacetCard({ facet, className, persistent = false }: FacetCardProps) {
    return (
        <div
            {...spotlightSurfaceProps}
            style={
                {
                    '--facet-accent': facet.accent,
                    '--facet-origin': facet.origin
                } as CSSProperties
            }
            className={cn(
                styles.card,
                persistent && styles.persistent,
                'border-foreground/10 hover:border-foreground/30 bg-background z-10 rounded-2xl border p-5 transition-colors duration-300 hover:shadow-lg',
                facet.placementClassName,
                className
            )}>
            <span aria-hidden="true" className={styles.glow} />

            {/* Before the content, so the wash paints over the card's opaque
                background but under the text. */}
            <span aria-hidden="true" className={styles.spotlight} />

            <div className="relative">
                <div className="flex items-center gap-2">
                    <span
                        aria-hidden="true"
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: facet.accent }}
                    />
                    <h3 className="text-foreground font-semibold">{facet.title}</h3>
                </div>
                <p className="text-foreground/70 mt-2 text-sm leading-relaxed">{facet.text}</p>
            </div>

            <SpotlightBorder className={styles.border} />
        </div>
    );
}
