import type { ComponentType, SVGProps } from 'react';

/**
 * A platform the reader can share an article to. Copy link and the native share
 * sheet are handled inside the menu itself, since neither is a URL target.
 */
export interface ShareTarget {
    name: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    buildShareUrl: (params: { url: string; title: string }) => string;
    /** Per-brand hover tint, so a hovered row stays recognisable. */
    brandHoverClassName?: string;
}
