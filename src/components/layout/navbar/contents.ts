export type NavItemData = {
    label: string;
    href: string;
    /** Home-page anchor this item tracks, for scroll-spy highlighting. */
    sectionId?: string;
    /** Open in a new tab via a plain anchor (e.g. a PDF file). */
    external?: boolean;
};

// In-page section anchors on the home page.
export const sectionItems: NavItemData[] = [
    { label: 'About', href: '/#about', sectionId: 'about' },
    { label: 'Skills', href: '/#skills', sectionId: 'skills' },
    { label: 'Writing', href: '/#articles', sectionId: 'articles' },
    { label: 'Contact', href: '/#contact', sectionId: 'contact' }
];

// Standalone pages.
export const pageItems: NavItemData[] = [
    { label: 'Articles', href: '/articles' },
    { label: 'Uses', href: '/uses' },
    { label: 'Now', href: '/now' },
    { label: 'Resume', href: '/resume' },
    { label: 'Short URL', href: '/shorturl' }
];

export const sectionIds = sectionItems.map((item) => item.sectionId as string);

// id of the hero element on the home page; observed to toggle the navbar.
export const heroId = 'hero';
