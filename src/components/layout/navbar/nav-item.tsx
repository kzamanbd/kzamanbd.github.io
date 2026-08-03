import type { NavItemData } from '@/components/layout/navbar/contents';
import { lockScrollSync } from '@/components/layout/scroll-sync-lock';
import { cn } from '@/utils/cn';
import Link from 'next/link';

interface NavItemProps {
    item: NavItemData;
    active: boolean;
    /** `pill` for the desktop bar, `row` for the mobile dropdown list. */
    variant?: 'pill' | 'row';
    onNavigate?: () => void;
}

export default function NavItem({ item, active, variant = 'pill', onNavigate }: NavItemProps) {
    // A section link smooth-scrolls in-page; hold the URL sync off so the hash
    // lands on the clicked section instead of every section glided past.
    const handleClick = () => {
        if (item.sectionId) lockScrollSync(1000);
        onNavigate?.();
    };

    const className = cn(
        'focus-ring block text-sm transition-colors',
        variant === 'pill'
            ? 'rounded-full px-2.5 py-1.5 lg:px-3'
            : 'hover:bg-foreground/5 flex min-h-11 items-center rounded-xl px-4',
        active
            ? 'bg-foreground/10 text-foreground font-semibold'
            : 'text-foreground/70 hover:text-foreground'
    );

    // External items open in a new tab via a plain anchor rather than a
    // client-side route transition.
    if (item.external) {
        return (
            <li>
                <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onNavigate}
                    className={className}>
                    {item.label}
                </a>
            </li>
        );
    }

    return (
        <li>
            <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onClick={handleClick}
                className={className}>
                {item.label}
            </Link>
        </li>
    );
}
