import { techBrandColor, type TechIconName } from '@/components/icons/tech-icon';
import {
    Boxes,
    Cloud,
    Gauge,
    GitPullRequestArrow,
    Layers,
    Network,
    TestTube,
    Timer,
    Workflow,
    type LucideIcon
} from 'lucide-react';

/**
 * One tile in the skills grid. A skill is either a brand, whose mark and colour
 * come from `simple-icons`, or a practice with no logo of its own, which
 * borrows a lucide glyph and the theme foreground instead. Keeping both in one
 * list means the grid reads as a single set rather than as two grids.
 */
export type Skill =
    | { name: string; kind: 'brand'; icon: TechIconName }
    | { name: string; kind: 'practice'; Icon: LucideIcon };

const brand = (name: string, icon: TechIconName): Skill => ({ name, kind: 'brand', icon });
const practice = (name: string, Icon: LucideIcon): Skill => ({ name, kind: 'practice', Icon });

/** The brand colour a tile blooms to on hover, or null for a practice tile. */
export function skillBrandColor(skill: Skill): string | null {
    return skill.kind === 'brand' ? techBrandColor(skill.icon) : null;
}

// Ordered by where each piece sits in a system (language, framework, front end,
// data, platform, practice), so the grid reads as a stack rather than as an
// alphabetical dump.
export const skills: Skill[] = [
    brand('PHP', 'php'),
    brand('Laravel', 'laravel'),
    brand('WordPress', 'wordpress'),
    brand('TypeScript', 'typescript'),
    brand('JavaScript', 'javascript'),
    brand('React', 'react'),
    brand('Next.js', 'nextjs'),
    brand('Vue', 'vue'),
    brand('Nuxt', 'nuxt'),
    brand('Tailwind CSS', 'tailwind'),
    brand('Node.js', 'nodejs'),
    brand('Express', 'express'),
    brand('MySQL', 'mysql'),
    brand('PostgreSQL', 'postgresql'),
    brand('Redis', 'redis'),
    brand('Firebase', 'firebase'),
    brand('Docker', 'docker'),
    // No brand mark: simple-icons carries no Amazon logo, so this tile takes a
    // generic cloud glyph rather than a lookalike.
    practice('AWS', Cloud),
    brand('Nginx', 'nginx'),
    brand('Linux', 'linux'),
    brand('Git', 'git'),
    brand('GitHub Actions', 'githubActions'),
    practice('REST APIs', Network),
    practice('Queues & Jobs', Workflow),
    practice('Caching', Timer),
    practice('Query tuning', Gauge),
    practice('System design', Layers),
    practice('Marketplaces', Boxes),
    practice('Testing', TestTube),
    practice('Code review', GitPullRequestArrow)
];
