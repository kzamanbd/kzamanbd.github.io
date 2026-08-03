'use client';

import { useHeroPassed } from '@/components/layout/hooks/use-hero-passed';
import { useNavbarVisibility } from '@/components/layout/hooks/use-navbar-visibility';
import { useScrollSpy } from '@/components/layout/hooks/use-scroll-spy';
import {
    heroId,
    pageItems,
    sectionIds,
    sectionItems,
    type NavItemData
} from '@/components/layout/navbar/contents';
import DesktopNav from '@/components/layout/navbar/desktop-nav';
import MobileNav from '@/components/layout/navbar/mobile-nav';
import ThemeMenu from '@/components/layout/theme-menu';
import { usePathname } from 'next/navigation';

/**
 * The floating primary navigation. On the home page it stays out of the way
 * until the hero has scrolled past, then rides above the content with the
 * current section highlighted; on inner pages it is always visible.
 */
export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const visible = useNavbarVisibility(isHome, heroId);
    const brandVisible = useHeroPassed(isHome, heroId);
    const activeSection = useScrollSpy(sectionIds, isHome);

    const isActive = (item: NavItemData) =>
        item.sectionId ? isHome && activeSection === item.sectionId : pathname === item.href;

    return (
        <>
            <DesktopNav
                visible={visible}
                brandVisible={brandVisible}
                sectionItems={sectionItems}
                pageItems={pageItems}
                isActive={isActive}
            />
            <MobileNav
                visible={visible}
                sectionItems={sectionItems}
                pageItems={pageItems}
                isActive={isActive}
            />
            <ThemeMenu visible={visible} />
        </>
    );
}
