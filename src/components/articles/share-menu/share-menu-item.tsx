'use client';

import type { ShareTarget } from '@/components/articles/share-menu/types';
import { cn } from '@/utils/cn';

interface ShareMenuItemProps {
    target: ShareTarget;
    url: string;
    title: string;
    onSelect: () => void;
}

/**
 * One share destination, as a menu row that opens the platform's share intent
 * in a new tab. Muted at rest, tinting to the brand colour on hover.
 */
export default function ShareMenuItem({ target, url, title, onSelect }: ShareMenuItemProps) {
    const { name, Icon, buildShareUrl, brandHoverClassName } = target;

    return (
        <li role="none">
            <a
                href={buildShareUrl({ url, title })}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={onSelect}
                className={cn(
                    'focus-ring text-foreground/70 hover:bg-foreground/5 flex min-h-11 items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors',
                    brandHoverClassName ?? 'hover:text-foreground'
                )}>
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                {name}
            </a>
        </li>
    );
}
