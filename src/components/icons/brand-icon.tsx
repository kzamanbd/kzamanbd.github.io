import { cn } from '@/utils/cn';
import type { SimpleIcon } from 'simple-icons';
import type { SVGProps } from 'react';

interface BrandIconProps extends SVGProps<SVGSVGElement> {
    icon: SimpleIcon;
}

/**
 * Renders one `simple-icons` mark. The paths are the brands' official ones, so
 * nothing here is transcribed by hand and a logo refresh arrives with a package
 * update. It paints in `currentColor`, leaving the caller to decide whether the
 * mark sits muted in a set or lights up in its own brand colour.
 */
export default function BrandIcon({ icon, className, ...rest }: BrandIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="img"
            aria-hidden="true"
            className={cn('size-6', className)}
            {...rest}>
            <title>{icon.title}</title>
            <path d={icon.path} />
        </svg>
    );
}
