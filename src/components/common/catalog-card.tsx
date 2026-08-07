import SpotlightBorder from '@/components/common/spotlight-border';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import Tag from '@/components/common/tag';
import styles from '@/components/common/glow-card.module.css';
import { cn } from '@/utils/cn';
import type { LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';

/** One block of content inside a catalog card. */
export type CatalogBlock =
    | { kind: 'tags'; label?: string; tags: string[] }
    | { kind: 'list'; items: string[] }
    | { kind: 'text'; text: string };

export interface CatalogSection {
    title: string;
    Icon: LucideIcon;
    intro?: string;
    outro?: string;
    /** Span two columns in the grid, for a content-heavy section. */
    wide?: boolean;
    blocks: CatalogBlock[];
}

function Block({ block }: { block: CatalogBlock }) {
    if (block.kind === 'tags') {
        return (
            <div>
                {block.label && (
                    <h3 className="text-foreground/70 text-sm font-bold">{block.label}</h3>
                )}
                <ul className={cn('flex flex-wrap gap-2', block.label && 'mt-3')}>
                    {block.tags.map((tag) => (
                        <Tag
                            key={tag}
                            className="text-foreground/70 hover:border-foreground/40 px-3 py-1 text-sm">
                            {tag}
                        </Tag>
                    ))}
                </ul>
            </div>
        );
    }

    if (block.kind === 'list') {
        return (
            <ul className="text-foreground/70 space-y-2 text-sm leading-relaxed">
                {block.items.map((item) => (
                    <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-foreground/40">
                            &#8226;
                        </span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
    }

    return <p className="text-foreground/70 text-base leading-relaxed">{block.text}</p>;
}

/**
 * One entry in the /now snapshot: a monospace index in the
 * corner, an accent-tinted icon badge and title, an optional intro, the section's
 * blocks, then an optional closing outro.
 *
 * Each card gets its own accent hue derived from its position with the golden
 * angle, so consecutive cards land far apart on the colour wheel and any section
 * added to a `contents.ts` gets a distinct accent automatically. The hue feeds
 * the shared signature bloom. Rendered as an `<li>` inside the grid's `<ul>`.
 */
export default function CatalogCard({
    section,
    index
}: {
    section: CatalogSection;
    index: number;
}) {
    const hue = (index * 137.508) % 360;
    const accent = { '--brand-color': `oklch(0.72 0.16 ${hue})` } as CSSProperties;
    const catalogNumber = String(index + 1).padStart(2, '0');
    const { Icon } = section;

    return (
        <li
            {...spotlightSurfaceProps}
            style={accent}
            className={cn(
                styles.card,
                'group border-foreground/10 hover:border-foreground/25 bg-background/40 relative flex h-full flex-col rounded-2xl border p-6 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:shadow-lg sm:p-8',
                section.wide && 'md:col-span-2'
            )}>
            <span
                aria-hidden="true"
                className="text-foreground/25 group-hover:text-foreground/60 absolute top-5 right-6 font-mono text-xs tracking-widest transition-colors duration-300 sm:top-6">
                {catalogNumber}
            </span>

            <div className="flex items-center gap-3.5 pr-8">
                <span className="border-foreground/10 flex size-10 items-center justify-center rounded-xl border">
                    <Icon aria-hidden="true" className="text-foreground/80 size-5" />
                </span>
                <h2 className="text-lg font-bold sm:text-xl">{section.title}</h2>
            </div>

            {section.intro && (
                <p className="text-foreground/70 mt-4 text-sm leading-relaxed">{section.intro}</p>
            )}

            <div className="mt-5 flex grow flex-col gap-6">
                {section.blocks.map((block, blockIndex) => (
                    <Block key={`${block.kind}-${blockIndex}`} block={block} />
                ))}
            </div>

            {section.outro && (
                <p className="text-foreground/70 mt-6 text-sm leading-relaxed italic">
                    {section.outro}
                </p>
            )}

            <SpotlightBorder className={styles.border} />
        </li>
    );
}
