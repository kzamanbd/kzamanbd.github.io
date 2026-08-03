export interface SkillGroup {
    title: string;
    /** Accent the card's glow and lit border take, as a CSS colour value. */
    brandColor: string;
    skills: string[];
}

export const skillGroups: SkillGroup[] = [
    {
        title: 'Backend',
        brandColor: 'var(--color-red-500)',
        skills: ['PHP', 'Laravel', 'REST APIs', 'Node.js', 'Express', 'Queues & Jobs']
    },
    {
        title: 'Frontend',
        brandColor: 'var(--color-cyan-500)',
        skills: ['TypeScript', 'React', 'Next.js', 'Vue', 'Nuxt', 'Tailwind CSS']
    },
    {
        title: 'Data',
        brandColor: 'var(--color-amber-500)',
        skills: ['MySQL', 'PostgreSQL', 'Redis', 'Query optimization', 'Caching']
    },
    {
        title: 'Platform',
        brandColor: 'var(--color-emerald-500)',
        skills: ['Docker', 'AWS EC2', 'AWS ECS', 'AWS RDS', 'AWS S3', 'CI/CD']
    },
    {
        title: 'WordPress',
        brandColor: 'var(--color-indigo-500)',
        skills: ['Plugin development', 'Dokan', 'WooCommerce', 'Multi-vendor marketplaces']
    },
    {
        title: 'Practice',
        brandColor: 'var(--color-purple-500)',
        skills: ['System design', 'Performance tuning', 'Code review', 'Testing']
    }
];
