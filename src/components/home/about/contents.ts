import { careerExperience } from '@/lib/metadata';

export interface Facet {
    title: string;
    text: string;
    /** Accent colour for the facet's dot, its glow, and its connector line. */
    accent: string;
    /** Placement on the lg 3x3 diagram grid, around the centre portrait. */
    placementClassName: string;
    /** Connector endpoint, as a percentage of the diagram box (the core is 50,50). */
    line: { x: number; y: number };
    /**
     * CSS position of the inner corner the line attaches to. It doubles as the
     * origin of the hover gradient, so the wash grows in from the same direction
     * the line arrives from.
     */
    origin: string;
}

// What shapes how the work gets done, told as facets of the person rather than
// as a skills list (Skills already covers the stack in depth) or a name and
// title (already in the hero). This is the part only About should carry.
//
// The order is fixed by the diagram: each entry's placement, accent and
// connector belong to one corner of the 3x3 grid, so a facet is rewritten in
// place rather than reordered.
export const facets: Facet[] = [
    {
        title: 'System design',
        text: 'I draw the boundaries first: schemas, queues and service edges that keep a feature testable and the next change cheap.',
        accent: 'var(--color-blue-500)',
        placementClassName: 'lg:col-start-1 lg:row-start-1',
        line: { x: 16, y: 18 },
        origin: '100% 100%'
    },
    {
        title: 'Problem solving',
        text: 'Finding the query that got slow as the data grew, and the index, cache or rewrite that puts it back under budget.',
        accent: 'var(--color-emerald-500)',
        placementClassName: 'lg:col-start-3 lg:row-start-1',
        line: { x: 84, y: 18 },
        origin: '0% 100%'
    },
    {
        title: 'Now',
        text: 'Exploring AI-assisted engineering and agent tooling, and what they change about how software actually gets written.',
        accent: 'var(--color-orange-500)',
        placementClassName: 'lg:col-start-1 lg:row-start-3',
        line: { x: 16, y: 82 },
        origin: '100% 0%'
    },
    {
        title: 'The stack',
        text: `${careerExperience}+ years in PHP and Laravel, React and Next.js, MySQL and Redis — plus the Docker images and AWS wiring that carry them to production.`,
        accent: 'var(--color-rose-500)',
        placementClassName: 'lg:col-start-3 lg:row-start-3',
        line: { x: 84, y: 82 },
        origin: '0% 0%'
    }
];

export interface TimelineEntry {
    role: string;
    organization: string;
    period: string;
}

export const experience: TimelineEntry[] = [
    {
        role: 'Software Engineer L2',
        organization: 'weDevs',
        period: 'Nov 2024 - Present'
    },
    {
        role: 'Software Engineer',
        organization: 'MononSoft / JMI Group',
        period: '2021 - 2024'
    },
    {
        role: 'Junior Software Engineer',
        organization: 'MaxSOP',
        period: '2020 - 2021'
    }
];

export const education: TimelineEntry[] = [
    {
        role: 'BSc in Computer Science & Engineering',
        organization: 'Southeast University',
        period: 'In progress'
    }
];

export const bio: string[] = [
    'I design and build the systems behind the screen: schemas, APIs, queues and background jobs, written in PHP and Laravel, fronted with React and Next.js, and held up by MySQL, Redis, Docker and AWS. At weDevs that work runs on thousands of live stores, which is a good place to learn that a design either holds or it does not.',
    'The work I enjoy most sits where system design meets performance: finding the query that got slow as the data grew, drawing a boundary that makes a feature testable, and leaving code the next person can read. Most of what I write about started as one of those problems on a Tuesday afternoon.'
];
