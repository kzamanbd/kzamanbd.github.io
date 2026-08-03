import type { ArticleDifficulty } from '@/lib/posts';
import { cn } from '@/utils/cn';

// One hue per level, so the badge is readable at a glance before the word is:
// green for approachable, amber for some background assumed, rose for deep.
const levelClassName: Record<ArticleDifficulty, string> = {
    Beginner: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    Intermediate: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    Advanced: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
};

/** How much background an article assumes, as a small colour-coded pill. */
export default function DifficultyBadge({
    difficulty,
    className
}: {
    difficulty: ArticleDifficulty;
    className?: string;
}) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
                levelClassName[difficulty],
                className
            )}>
            {difficulty}
        </span>
    );
}
