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
// as a skills list (Skills already covers the stack) or a name and title
// (already in the hero). This is the part only About should carry.
export const facets: Facet[] = [
    {
        title: 'Craft',
        text: 'I turn tangled problems into simple, maintainable software that a team can keep building on years later.',
        accent: 'var(--color-blue-500)',
        placementClassName: 'lg:col-start-1 lg:row-start-1',
        line: { x: 16, y: 18 },
        origin: '100% 100%'
    },
    {
        title: 'Scale',
        text: 'Multi-vendor marketplace code that has to hold for thousands of stores at once, where a slow query is an outage.',
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
        title: 'End to end',
        text: `${careerExperience}+ years taking features from schema to deploy: APIs, queues, Docker images, and the AWS wiring behind them.`,
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
    'I build and maintain multi-vendor marketplace software: payment gateways, ERP integrations, and the WordPress plugins that hold them together. Most of my time goes to Dokan, where a change has to work for thousands of stores at once.',
    'The work I enjoy most sits where system design meets performance: finding the query that got slow as the data grew, drawing a boundary that makes a feature testable, and leaving code the next person can read.'
];
