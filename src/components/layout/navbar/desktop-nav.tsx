import type { NavItemData } from '@/components/layout/navbar/contents';
import NavItem from '@/components/layout/navbar/nav-item';
import NavLogo from '@/components/layout/navbar/nav-logo';
import { cn } from '@/utils/cn';

interface DesktopNavProps {
    visible: boolean;
    /** Reveal the wordmark once the hero name has scrolled ~50% out of view. */
    brandVisible: boolean;
    sectionItems: NavItemData[];
    pageItems: NavItemData[];
    isActive: (item: NavItemData) => boolean;
}

export default function DesktopNav({
    visible,
    brandVisible,
    sectionItems,
    pageItems,
    isActive
}: DesktopNavProps) {
    return (
        <nav
            aria-label="Primary"
            className={cn(
                'fixed top-4 left-1/2 z-50 hidden -translate-x-1/2 transition-[transform,opacity] duration-700 ease-in-out motion-reduce:transition-none md:block',
                visible
                    ? 'visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible -translate-y-24 opacity-0'
            )}>
            <ul className="border-foreground/10 bg-background/60 flex items-center gap-0.5 rounded-full border px-2 py-1.5 shadow-lg shadow-black/5 backdrop-blur-lg">
                <li className="flex items-center">
                    <NavLogo
                        collapsible
                        revealed={brandVisible}
                        className={cn(
                            'text-foreground/80 hover:text-foreground block py-1.5 transition-[padding,color] duration-500 ease-out motion-reduce:transition-none',
                            brandVisible ? 'px-2' : 'px-0'
                        )}
                    />
                    <span
                        aria-hidden="true"
                        className={cn(
                            'bg-foreground/15 h-5 transition-[width,margin] duration-500 ease-out motion-reduce:transition-none',
                            brandVisible ? 'mx-0.5 w-px' : 'mx-0 w-0'
                        )}
                    />
                </li>
                {sectionItems.map((item) => (
                    <NavItem key={item.href} item={item} active={isActive(item)} />
                ))}
                <li aria-hidden="true" className="bg-foreground/15 mx-0.5 h-5 w-px" />
                {pageItems.map((item) => (
                    <NavItem key={item.href} item={item} active={isActive(item)} />
                ))}
            </ul>
        </nav>
    );
}
