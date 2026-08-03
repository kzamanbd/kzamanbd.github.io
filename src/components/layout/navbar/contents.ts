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
    { label: 'Writing', href: '/#articles', sectionId: 'articles' }
];

// Standalone pages.
export const pageItems: NavItemData[] = [
    { label: 'Articles', href: '/articles' },
    { label: 'Uses', href: '/uses' },
    { label: 'Now', href: '/now' },
    { label: 'Short URL', href: '/shorturl' }
];

/**
 * The resume sits apart from the other page links: it is the one thing a
 * recruiter opens the site for, so it renders as a filled call to action pinned
 * to the end of the bar (and the top of the mobile panel) rather than as another
 * item in the list. It used to be a second CTA in the hero as well; keeping it
 * only here means it is reachable from every page, not just the top of the home
 * page, and is never on screen twice.
 */
export const resumeItem: NavItemData = { label: 'Resume', href: '/resume' };

export const sectionIds = sectionItems.map((item) => item.sectionId as string);

// id of the hero element on the home page; observed to toggle the navbar.
export const heroId = 'hero';
