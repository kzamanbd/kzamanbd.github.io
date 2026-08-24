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
 * The hero shows the whole row. It used to show a slice of four, back when it
 * was one element among a headline, a lede, two buttons and a stat card and a
 * row of eight marks would have read as a link farm; now that the hero is the
 * name and nothing else, the full row is the only thing under it and reads as
 * what it is.
 *
 * The contact section shows the same list, from the same array, so a profile
 * added here can never be missing from one of them.
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
