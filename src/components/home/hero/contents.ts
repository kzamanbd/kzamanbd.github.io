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
import { user } from '@/lib/metadata';

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

export const heroStats = [
    { value: '4+', label: 'Years Experience' },
    { value: '15+', label: 'Enterprise Projects' },
    { value: '1000+', label: 'Problems Solved' }
];
