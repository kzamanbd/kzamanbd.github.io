import type { NavItemData } from '@/components/layout/navbar/contents';
import { lockScrollSync } from '@/components/layout/scroll-sync-lock';
import { cn } from '@/utils/cn';
import Link from 'next/link';

interface NavItemProps {
    item: NavItemData;
    active: boolean;
    /**
     * `pill` for the desktop bar, `row` for the mobile dropdown list, `cta` for
     * the filled resume button that sits apart from the rest of the links.
     */
    variant?: 'pill' | 'row' | 'cta';
    onNavigate?: () => void;
}

/** The filled call-to-action treatment, shared by both breakpoints. */
const ctaClassName =
    'focus-ring bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold transition-colors';

export default function NavItem({ item, active, variant = 'pill', onNavigate }: NavItemProps) {
    // A section link smooth-scrolls in-page; hold the URL sync off so the hash
    // lands on the clicked section instead of every section glided past.
    const handleClick = () => {
        if (item.sectionId) lockScrollSync(1000);
        onNavigate?.();
    };

    const className =
        variant === 'cta'
            ? cn(ctaClassName, active && 'ring-foreground/30 ring-2 ring-offset-0')
            : cn(
                  // whitespace-nowrap: the bar is a single row, so a two-word
                  // label ("Short URL") must not wrap and double its height.
                  'focus-ring block text-sm whitespace-nowrap transition-colors',
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
