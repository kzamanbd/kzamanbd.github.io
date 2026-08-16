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
import { techBrandColor, type TechIconName } from '@/components/icons/tech-icon';
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
 *
 * A tile is either a brand, whose mark and colour come from `simple-icons`, or
 * a wordmark for a brand simple-icons cannot carry — the same split the skills
 * grid makes, for the same reason: AWS does not license its mark for
 * redistribution, so it sets its name as type and states its colour outright
 * rather than shipping a lookalike.
 */
interface HeroOrbitBase {
    label: string;
    x: number;
    y: number;
    /** Tile edge, as a percentage of the stage, so it scales with it. */
    size: number;
    tilt: number;
    duration: number;
    delay: number;
}

export type HeroOrbitItem =
    | (HeroOrbitBase & { kind: 'brand'; icon: TechIconName })
    | (HeroOrbitBase & { kind: 'wordmark'; text: string; brand: string });

/** The colour a tile paints itself with, whichever kind it is. */
export function heroOrbitBrandColor(item: HeroOrbitItem): string {
    return item.kind === 'brand' ? techBrandColor(item.icon) : item.brand;
}

/**
 * The stack that orbits the portrait: the marks that describe the day job, not
 * the whole toolbox. Skills owns the full list; a ring of thirty here would read
 * as a logo wall rather than as artwork.
 *
 * Coordinates are placed by hand rather than swept evenly around a circle — the
 * ring reads as artwork precisely because the spacing is uneven — and the
 * bottom-right sector is left clear for the glass pill.
 */
const brandTile = (
    icon: TechIconName,
    label: string,
    rest: Omit<HeroOrbitBase, 'label'>
): HeroOrbitItem => ({ kind: 'brand', icon, label, ...rest });

export const heroOrbitItems: HeroOrbitItem[] = [
    brandTile('laravel', 'Laravel', { x: 30, y: 11, size: 12, tilt: -8, duration: 7, delay: 0 }),
    brandTile('nextjs', 'Next.js', { x: 68, y: 10, size: 11, tilt: 10, duration: 9, delay: 1.2 }),
    brandTile('vue', 'Vue', { x: 87, y: 24, size: 10.5, tilt: -7, duration: 8, delay: 0.5 }),
    brandTile('typescript', 'TypeScript', {
        x: 95,
        y: 45,
        size: 10,
        tilt: -6,
        duration: 7.5,
        delay: 0.3
    }),
    brandTile('postgresql', 'PostgreSQL', {
        x: 89,
        y: 65,
        size: 10.5,
        tilt: 9,
        duration: 8.5,
        delay: 1.4
    }),
    brandTile('docker', 'Docker', { x: 45, y: 94, size: 12, tilt: 8, duration: 7, delay: 0.9 }),
    brandTile('redis', 'Redis', { x: 19, y: 83, size: 10.5, tilt: -10, duration: 9.5, delay: 0.2 }),
    brandTile('mysql', 'MySQL', { x: 8, y: 61, size: 10.5, tilt: -12, duration: 8.5, delay: 1.6 }),
    brandTile('react', 'React', { x: 6, y: 37, size: 10.5, tilt: 6, duration: 8, delay: 0.6 }),
    // simple-icons carries no Amazon mark (the brand does not license it for
    // redistribution) and no other dependency here ships brand logos, so rather
    // than draw a lookalike this tile sets the name as type. AWS's own mark is a
    // wordmark, so a wordmark is the honest version of it — and it reads at tile
    // size, which a traced smile-arrow would not.
    {
        kind: 'wordmark',
        text: 'aws',
        brand: '#ff9900',
        label: 'AWS',
        x: 17,
        y: 15,
        size: 10.5,
        tilt: 7,
        duration: 7.5,
        delay: 1
    }
];

/** The marks in the glass pill: present in the work, but not the headline. */
export const heroChipItems: { icon: TechIconName; label: string }[] = [
    { icon: 'php', label: 'PHP' },
    { icon: 'wordpress', label: 'WordPress' }
];

/**
 * Unbranded confetti — a sphere, a ring, a capsule — scattered wide of the
 * tiles. They carry no meaning; they exist so the corners of the stage are not
 * dead space. Hidden below `lg`, where they would crowd the tiles instead.
 *
 * Typed rather than `as const` on purpose: the three kinds are the vocabulary
 * the stylesheet draws, not a summary of what the list happens to hold today.
 * Inferring it would collapse the union every time a kind falls out of use and
 * turn the matching branch in the renderer into a type error.
 */
export interface HeroAccentShape {
    kind: 'sphere' | 'ring' | 'bar';
    color: string;
    x: number;
    y: number;
    size: number;
    tilt: number;
    duration: number;
    delay: number;
}

export const heroAccentShapes: HeroAccentShape[] = [
    { kind: 'bar', color: '#a78bfa', x: 50, y: 2, size: 11, tilt: -28, duration: 8, delay: 0.2 },
    { kind: 'ring', color: '#38bdf8', x: 97, y: 57, size: 7, tilt: 0, duration: 10, delay: 1.1 }
];

export const heroStats = [
    // Derived, not typed: this tile said 4+ while the meta description said 5+
    // and the resume listed a May 2020 start.
    { value: `${careerExperience}+`, label: 'Years Experience' },
    { value: '15+', label: 'Enterprise Projects' },
    { value: '1000+', label: 'Problems Solved' }
];
