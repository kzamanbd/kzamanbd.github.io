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
