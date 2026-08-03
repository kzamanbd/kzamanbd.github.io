import { cn } from '@/utils/cn';
import type { SVGProps } from 'react';

interface SpinnerProps extends SVGProps<SVGSVGElement> {
    /**
     * Accessible name for a standalone spinner. When set, the SVG is announced
     * as a `status`. Omit it for decorative use inside a control whose own label
     * already conveys the loading state (a button that swaps to "Sending..."),
     * where the spinner stays `aria-hidden`.
     */
    label?: string;
}

/**
 * Minimal loading spinner: a faint full ring plus a bright arc that rotates.
 * Motion-safe, so it stays still for reduced-motion users.
 */
export default function Spinner({ label, className, ...rest }: SpinnerProps) {
    const accessibility = label
        ? ({ role: 'status', 'aria-label': label } as const)
        : ({ 'aria-hidden': true } as const);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className={cn('size-4 motion-safe:animate-spin', className)}
            {...accessibility}
            {...rest}>
            <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-25"
            />
            <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
}
