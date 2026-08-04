import { sectionItems } from '@/components/layout/navbar/contents';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import styles from './scroll-down-cue.module.css';

/**
 * Anchors to the first section below the hero, so the cue is a real link — a
 * keyboard user gets the same jump the mouse user gets by scrolling, and it
 * survives the hero being resized.
 *
 * Hidden on short viewports, where the hero is already taller than the screen
 * and a "scroll down" hint would be telling the reader something the clipped
 * content below already tells them. It is a height query, not a width one: a
 * wide but short window is exactly the case that does not need it.
 */
export default function ScrollDownCue() {
    const first = sectionItems[0];
    if (!first) return null;

    return (
        <Link
            href={first.href}
            aria-label={`Scroll to ${first.label}`}
            className="focus-ring text-foreground/50 hover:text-foreground/80 absolute inset-x-0 bottom-8 mx-auto hidden w-fit flex-col items-center gap-2 rounded-lg p-2 transition-colors [@media(min-height:46rem)]:flex">
            <span
                aria-hidden="true"
                className="border-foreground/25 flex h-9 w-5.5 justify-center rounded-full border pt-1.5">
                <span className={`${styles.wheel} bg-foreground/60 h-1.5 w-1 rounded-full`} />
            </span>
            <ChevronDown aria-hidden="true" className={`${styles.chevron} size-4`} />
        </Link>
    );
}
