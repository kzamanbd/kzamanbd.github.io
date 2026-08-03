'use client';

import { useCloseOnClickOutside } from '@/components/layout/hooks/use-close-on-click-outside';
import { useCloseOnEscape } from '@/components/layout/hooks/use-close-on-escape';
import { useCloseOnRouteChange } from '@/components/layout/hooks/use-close-on-route-change';
import { useDisclosure } from '@/components/layout/hooks/use-disclosure';
import { useCallback, useEffect, useState, type RefObject } from 'react';

/** Gap in px between the trigger and the panel, matching the mt-2 / mb-2 offset. */
const PANEL_GAP = 8;

export type ShareMenuPlacement = 'top' | 'bottom';

interface UseShareMenuArgs {
    menuRef: RefObject<HTMLDivElement | null>;
    panelRef: RefObject<HTMLDivElement | null>;
    title: string;
    description?: string;
}

/**
 * Behaviour for the article share menu: a disclosure that dismisses on Escape,
 * on an outside press, and on navigation; the live page URL to share; detection
 * of the Web Share API; and a vertical flip so the panel opens where there is
 * room.
 *
 * `pageUrl` is read from the browser after mount rather than built from the
 * configured site URL, so the shared link matches wherever the page is actually
 * served and drops any transient hash or query. It starts empty to match the
 * server render, and the menu only opens on a click, by which point it is set.
 *
 * `placement` is decided the moment the menu opens, by comparing the space below
 * the trigger against the panel's measured height. Measuring in the open handler
 * (never during render) keeps it out of the server pass and commits the
 * placement in the same update that opens the menu, so there is no flicker.
 */
export function useShareMenu({ menuRef, panelRef, title, description }: UseShareMenuArgs) {
    const { open, show, close } = useDisclosure();
    useCloseOnEscape(open, close);
    useCloseOnClickOutside(menuRef, open, close);
    useCloseOnRouteChange(close);

    const [placement, setPlacement] = useState<ShareMenuPlacement>('bottom');

    const toggle = useCallback(() => {
        if (open) {
            close();
            return;
        }

        const trigger = menuRef.current;
        const panel = panelRef.current;
        if (trigger && panel) {
            const triggerRect = trigger.getBoundingClientRect();
            const panelHeight = panel.offsetHeight;
            const spaceBelow = window.innerHeight - triggerRect.bottom;
            const spaceAbove = triggerRect.top;
            setPlacement(
                spaceBelow < panelHeight + PANEL_GAP && spaceAbove > spaceBelow ? 'top' : 'bottom'
            );
        }

        show();
    }, [open, show, close, menuRef, panelRef]);

    const [pageUrl, setPageUrl] = useState('');
    const [canNativeShare, setCanNativeShare] = useState(false);

    useEffect(() => {
        setPageUrl(`${window.location.origin}${window.location.pathname}`);
        setCanNativeShare(typeof navigator.share === 'function');
    }, []);

    const shareNative = useCallback(() => {
        void (async () => {
            try {
                await navigator.share({ title, text: description, url: pageUrl });
            } catch {
                // The reader dismissed the share sheet, or it failed. No-op.
            }
        })();
    }, [title, description, pageUrl]);

    return { open, toggle, close, placement, pageUrl, canNativeShare, shareNative };
}
