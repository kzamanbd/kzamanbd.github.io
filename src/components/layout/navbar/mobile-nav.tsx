'use client';

import { useCloseOnClickOutside } from '@/components/layout/hooks/use-close-on-click-outside';
import { useCloseOnEscape } from '@/components/layout/hooks/use-close-on-escape';
import { useCloseOnRouteChange } from '@/components/layout/hooks/use-close-on-route-change';
import { useDisclosure } from '@/components/layout/hooks/use-disclosure';
import type { NavItemData } from '@/components/layout/navbar/contents';
import MobileMenuButton from '@/components/layout/navbar/mobile-menu-button';
import MobileMenuPanel from '@/components/layout/navbar/mobile-menu-panel';
import { cn } from '@/utils/cn';
import { useRef } from 'react';

interface MobileNavProps {
    visible: boolean;
    sectionItems: NavItemData[];
    pageItems: NavItemData[];
    isActive: (item: NavItemData) => boolean;
}

export default function MobileNav({ visible, sectionItems, pageItems, isActive }: MobileNavProps) {
    const { open, toggle, close } = useDisclosure();
    const menuRef = useRef<HTMLDivElement>(null);
    useCloseOnEscape(open, close);
    useCloseOnClickOutside(menuRef, open, close);
    useCloseOnRouteChange(close);

    return (
        <div
            ref={menuRef}
            className={cn(
                'fixed top-4 right-4 z-50 transition-all duration-700 ease-in-out motion-reduce:transition-none md:hidden',
                visible
                    ? 'visible translate-x-0 opacity-100'
                    : 'pointer-events-none invisible translate-x-24 opacity-0'
            )}>
            <MobileMenuButton open={open} onToggle={toggle} />
            <MobileMenuPanel
                open={open}
                sectionItems={sectionItems}
                pageItems={pageItems}
                isActive={isActive}
                onNavigate={close}
            />
        </div>
    );
}
