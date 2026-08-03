import { cn } from '@/utils/cn';
import { HTMLAttributes } from 'react';

/**
 * Decorative graph-paper backdrop, faded to nothing at the edges. The line
 * colour comes from the `--grid-line` token so it flips with the theme.
 */
export default function GridBackground({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                'absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)] bg-[size:20px_20px]',
                className
            )}
            {...rest}
        />
    );
}
