import { Codeforces, Facebook, Github, LeetCode, Linkedin, X, YouTube } from '@/components/icons';
import { careerExperience, user } from '@/services/metadata';

/**
 * The one sentence under the wordmark: what I build and what I care about while
 * building it. It names the domains rather than the stack, because Skills
 * already lists the stack in depth and a visitor decides whether to keep reading
 * on the kind of problem, not the framework.
 */
export const heroLede =
    'I build the backends that marketplaces run on: multi-vendor commerce, payment gateways and ERP systems, designed to stay fast and maintainable as the traffic and the team grow.';

/**
 * Short focus chips under the lede. The first derives from `careerStart`, like
 * every other years claim on the site, so it ages by itself and can never
 * disagree with About or the resume.
 */
export const heroHighlights: string[] = [
    `${careerExperience}+ years shipping`,
    'Laravel & Next.js',
    'Scalable system design',
    'WordPress plugins'
];

/**
 * Every profile worth linking, in the order they earn attention: the code first,
 * then the competitive-programming profiles, then the places I write and post.
 *
 * The hero shows the whole row, as its last and quietest band, under the lede,
 * the focus chips and the two action buttons.
 *
 * The contact section shows the same list, from the same array, so a profile
 * added here can never be missing from one of them.
 *
 * Medium is deliberately absent: the profile has no posts, and linking an empty
 * property from the most prominent spot on the home page nominates it as part of
 * the entity (it is kept out of the `sameAs` schema for the same reason). Add it
 * back here once it carries articles. `user.medium` stays in metadata for that.
 */
export const socialLinks = [
    { href: user.github, Icon: Github, label: 'GitHub' },
    { href: user.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { href: user.leetcode, Icon: LeetCode, label: 'LeetCode' },
    { href: user.codeforces, Icon: Codeforces, label: 'Codeforces' },
    { href: user.twitter, Icon: X, label: 'X' },
    { href: user.youtube, Icon: YouTube, label: 'YouTube' },
    { href: user.facebook, Icon: Facebook, label: 'Facebook' }
];
