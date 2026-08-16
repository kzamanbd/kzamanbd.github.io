import {
    Codeforces,
    Facebook,
    Github,
    LeetCode,
    Linkedin,
    Medium,
    X,
    YouTube
} from '@/components/icons';
import type { TechIconName } from '@/components/icons/tech-icon';
import { careerExperience, user } from '@/lib/metadata';

/**
 * Every profile worth linking, in the order they earn attention: the code first,
 * then the competitive-programming profiles, then the places I write and post.
 *
 * The contact section shows the whole list. The hero shows only the first few:
 * it is the top of the page, and a row of eight marks reads as a link farm
 * rather than as "here is where my work lives". Slicing rather than keeping a
 * second array means a profile added here can never be missing from one of them.
 */
export const socialLinks = [
    { href: user.github, Icon: Github, label: 'GitHub' },
    { href: user.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { href: user.leetcode, Icon: LeetCode, label: 'LeetCode' },
    { href: user.codeforces, Icon: Codeforces, label: 'Codeforces' },
    { href: user.medium, Icon: Medium, label: 'Medium' },
    { href: user.twitter, Icon: X, label: 'X' },
    { href: user.youtube, Icon: YouTube, label: 'YouTube' },
    { href: user.facebook, Icon: Facebook, label: 'Facebook' }
];

/** The subset the hero shows; the contact section still lists them all. */
export const primarySocialLinks = socialLinks.slice(0, 4);

/**
 * One floating tile in the hero graphic. Position is a percentage of the square
 * stage rather than a pixel offset, so a single set of coordinates holds at
 * every size the stage is drawn at, and `duration`/`delay` are staggered per
 * tile so the group drifts as a crowd instead of breathing in unison.
 */
export interface HeroOrbitItem {
    icon: TechIconName;
    label: string;
    x: number;
    y: number;
    /** Tile edge, as a percentage of the stage, so it scales with it. */
    size: number;
    tilt: number;
    duration: number;
    delay: number;
}

/**
 * The stack that orbits the orb: the six marks that describe the day job, not
 * the whole toolbox. Skills owns the full list; a ring of twenty here would read
 * as a logo wall rather than as artwork.
 */
export const heroOrbitItems: HeroOrbitItem[] = [
    { icon: 'laravel', label: 'Laravel', x: 26, y: 12, size: 17, tilt: -8, duration: 7, delay: 0 },
    { icon: 'react', label: 'React', x: 4, y: 34, size: 14, tilt: 6, duration: 8, delay: 0.6 },
    { icon: 'nextjs', label: 'Next.js', x: 82, y: 16, size: 15, tilt: 10, duration: 9, delay: 1.2 },
    {
        icon: 'typescript',
        label: 'TypeScript',
        x: 97,
        y: 46,
        size: 13,
        tilt: -6,
        duration: 7.5,
        delay: 0.3
    },
    { icon: 'mysql', label: 'MySQL', x: 8, y: 74, size: 15, tilt: -12, duration: 8.5, delay: 1.6 },
    { icon: 'docker', label: 'Docker', x: 38, y: 96, size: 18, tilt: 8, duration: 7, delay: 0.9 }
];

/** The marks in the glass pill: present in the work, but not the headline. */
export const heroChipItems: { icon: TechIconName; label: string }[] = [
    { icon: 'php', label: 'PHP' },
    { icon: 'wordpress', label: 'WordPress' },
    { icon: 'redis', label: 'Redis' }
];

/**
 * Unbranded confetti — a sphere, a ring, a capsule — scattered wide of the
 * tiles. They carry no meaning; they exist so the corners of the stage are not
 * dead space. Hidden below `lg`, where they would crowd the tiles instead.
 */
export const heroAccentShapes = [
    { kind: 'sphere', color: '#f472b6', x: 2, y: 56, size: 6, tilt: 0, duration: 9, delay: 0.4 },
    { kind: 'ring', color: '#38bdf8', x: 68, y: 99, size: 7, tilt: 0, duration: 10, delay: 1.1 },
    { kind: 'bar', color: '#a78bfa', x: 58, y: 1, size: 11, tilt: -28, duration: 8, delay: 0.2 },
    { kind: 'sphere', color: '#fbbf24', x: 16, y: 92, size: 4, tilt: 0, duration: 11, delay: 1.8 }
] as const;

export const heroStats = [
    // Derived, not typed: this tile said 4+ while the meta description said 5+
    // and the resume listed a May 2020 start.
    { value: `${careerExperience}+`, label: 'Years Experience' },
    { value: '15+', label: 'Enterprise Projects' },
    { value: '1000+', label: 'Problems Solved' }
];
