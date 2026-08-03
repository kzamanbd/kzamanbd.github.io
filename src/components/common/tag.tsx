import { cn } from '@/utils/cn';
import { HTMLAttributes } from 'react';

/**
 * Pill tag: a small reusable primitive for project tech chips and skill chips.
 * Pass size and colour via `className`; rendered as an `<li>` so it lives inside
 * a `<ul>`.
 */
export default function Tag({ children, className, ...rest }: HTMLAttributes<HTMLLIElement>) {
    return (
        <li
            className={cn('border-foreground/15 rounded-full border transition-colors', className)}
            {...rest}>
            {children}
        </li>
    );
}
