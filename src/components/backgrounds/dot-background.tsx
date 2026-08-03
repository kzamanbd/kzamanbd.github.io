import { cn } from '@/utils/cn';
import { HTMLAttributes } from 'react';

/**
 * Decorative dotted backdrop, faded to nothing at the edges. The dot colour
 * comes from the `--grid-dot` token so it flips with the theme.
 */
export default function DotBackground({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                'absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(circle,var(--grid-dot)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)] bg-[size:10px_10px]',
                className
            )}
            {...rest}
        />
    );
}
