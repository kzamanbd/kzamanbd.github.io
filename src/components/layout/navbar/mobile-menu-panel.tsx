import { resumeItem, type NavItemData } from '@/components/layout/navbar/contents';
import NavItem from '@/components/layout/navbar/nav-item';
import NavLogo from '@/components/layout/navbar/nav-logo';
import ThemeToggle from '@/components/layout/theme-toggle';
import { cn } from '@/utils/cn';

interface MobileMenuPanelProps {
    open: boolean;
    sectionItems: NavItemData[];
    pageItems: NavItemData[];
    isActive: (item: NavItemData) => boolean;
    onNavigate: () => void;
}

export default function MobileMenuPanel({
    open,
    sectionItems,
    pageItems,
    isActive,
    onNavigate
}: MobileMenuPanelProps) {
    return (
        <nav
            aria-label="Primary"
            className={cn(
                // Cap the height to the space below the button so a long list
                // scrolls within the panel instead of running off short screens;
                // dvh tracks the mobile browser chrome, overscroll-contain stops
                // scroll chaining to the page behind.
                'border-foreground/10 bg-background/70 absolute top-full right-0 mt-2 max-h-[calc(100dvh-5.5rem)] w-56 origin-top-right overflow-y-auto overscroll-contain rounded-2xl border p-2 shadow-xl shadow-black/10 backdrop-blur-lg transition-all duration-200 ease-out',
                open
                    ? 'visible scale-100 opacity-100'
                    : 'pointer-events-none invisible scale-95 opacity-0'
            )}>
            <NavLogo
                onNavigate={onNavigate}
                className="text-foreground/80 hover:text-foreground hover:bg-foreground/5 flex min-h-11 items-center rounded-xl px-4 py-3 transition-colors"
            />
            <div aria-hidden="true" className="bg-foreground/10 my-1 h-px" />
            {/* The resume leads the panel: it is the one thing most visitors are
                here for, so it is a filled action rather than another list row. */}
            <ul className="px-1 py-1">
                <NavItem
                    item={resumeItem}
                    active={isActive(resumeItem)}
                    variant="cta"
                    onNavigate={onNavigate}
                />
            </ul>
            <div aria-hidden="true" className="bg-foreground/10 my-1 h-px" />
            <ul className="flex flex-col gap-0.5">
                {sectionItems.map((item) => (
                    <NavItem
                        key={item.href}
                        item={item}
                        active={isActive(item)}
                        variant="row"
                        onNavigate={onNavigate}
                    />
                ))}
            </ul>
            <div aria-hidden="true" className="bg-foreground/10 my-1 h-px" />
            <ul className="flex flex-col gap-0.5">
                {pageItems.map((item) => (
                    <NavItem
                        key={item.href}
                        item={item}
                        active={isActive(item)}
                        variant="row"
                        onNavigate={onNavigate}
                    />
                ))}
            </ul>
            <div aria-hidden="true" className="bg-foreground/10 my-1 h-px" />
            <div className="flex items-center justify-between px-4 py-2">
                <span className="text-foreground/70 text-sm">Theme</span>
                <ThemeToggle />
            </div>
        </nav>
    );
}
