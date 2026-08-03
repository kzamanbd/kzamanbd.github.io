'use client';

import { useCopyToClipboard } from '@/components/articles/hooks/use-copy-to-clipboard';
import { shareTargets } from '@/components/articles/share-menu/contents';
import { useShareMenu } from '@/components/articles/share-menu/hooks/use-share-menu';
import ShareMenuItem from '@/components/articles/share-menu/share-menu-item';
import styles from '@/components/articles/share-menu/share-menu.module.css';
import { accentStyle } from '@/utils/accent-style';
import { cn } from '@/utils/cn';
import { Check, Copy, Share2 } from 'lucide-react';
import { useRef } from 'react';

interface ShareMenuProps {
    title: string;
    description?: string;
    accentColors?: readonly [string, string];
    label?: string;
    align?: 'left' | 'right';
    className?: string;
}

const menuRowClassName =
    'focus-ring text-foreground/70 hover:text-foreground hover:bg-foreground/5 flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors';

/**
 * A single Share button that opens a popover of destinations for the article:
 * the platforms in `shareTargets`, a copy-link action, and, where the browser
 * has the Web Share API, the native OS share sheet. The trigger wears the
 * signature accent bloom, tinted with the article's cover colours.
 */
export default function ShareMenu({
    title,
    description,
    accentColors,
    label = 'Share',
    align = 'left',
    className
}: ShareMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const { open, toggle, close, placement, pageUrl, canNativeShare, shareNative } = useShareMenu({
        menuRef,
        panelRef,
        title,
        description
    });
    const [copied, copy] = useCopyToClipboard();

    const panelOriginClassName = cn(
        placement === 'bottom' && align === 'left' && 'origin-top-left',
        placement === 'bottom' && align === 'right' && 'origin-top-right',
        placement === 'top' && align === 'left' && 'origin-bottom-left',
        placement === 'top' && align === 'right' && 'origin-bottom-right'
    );

    return (
        <div
            ref={menuRef}
            className={cn('relative inline-block', className)}
            style={accentColors ? accentStyle(accentColors) : undefined}>
            <button
                type="button"
                onClick={toggle}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Share this article"
                className={cn(
                    styles.trigger,
                    'focus-ring border-foreground/15 text-foreground/80 hover:text-foreground relative isolate inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors'
                )}>
                <Share2 aria-hidden="true" className="size-4" />
                {label}
            </button>

            {/* The panel stays mounted so its height can be measured before the
                menu opens, which is what decides whether it flips upward. */}
            <div
                className={cn(
                    'absolute z-30',
                    align === 'right' ? 'right-0' : 'left-0',
                    placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
                    !open && 'pointer-events-none'
                )}>
                <div
                    ref={panelRef}
                    role="menu"
                    aria-label="Share this article"
                    className={cn(
                        'border-foreground/10 bg-background/80 w-56 rounded-2xl border p-2 shadow-xl shadow-black/10 backdrop-blur-lg transition-all duration-200 ease-out',
                        panelOriginClassName,
                        open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
                    )}>
                    <ul className="flex flex-col gap-0.5">
                        {canNativeShare && (
                            <li role="none">
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                        shareNative();
                                        close();
                                    }}
                                    className={menuRowClassName}>
                                    <Share2 aria-hidden="true" className="size-4 shrink-0" />
                                    Share via...
                                </button>
                            </li>
                        )}

                        {shareTargets.map((target) => (
                            <ShareMenuItem
                                key={target.name}
                                target={target}
                                url={pageUrl}
                                title={title}
                                onSelect={close}
                            />
                        ))}

                        <li role="separator" className="bg-foreground/10 mx-2 my-1 h-px" />

                        <li role="none">
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => copy(pageUrl)}
                                aria-label={copied ? 'Link copied' : 'Copy link'}
                                className={menuRowClassName}>
                                {copied ? (
                                    <>
                                        <Check
                                            aria-hidden="true"
                                            className="size-4 shrink-0 text-emerald-500"
                                        />
                                        Link copied
                                    </>
                                ) : (
                                    <>
                                        <Copy aria-hidden="true" className="size-4 shrink-0" />
                                        Copy link
                                    </>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
