import { Codeforces, Facebook, Github, LeetCode, Linkedin } from '@/components/icons';
import { user } from '@/lib/metadata';
import { Cpu, Database, Layout, Terminal, type LucideIcon } from 'lucide-react';

export interface CoreCompetency {
    name: string;
    Icon: LucideIcon;
    /** Accent the tile's glow and lit border take, as a CSS colour value. */
    brandColor: string;
}

export const coreCompetencies: CoreCompetency[] = [
    { name: 'PHP & Laravel', Icon: Terminal, brandColor: 'var(--color-indigo-500)' },
    { name: 'React & Vue', Icon: Layout, brandColor: 'var(--color-cyan-500)' },
    { name: 'TypeScript', Icon: Cpu, brandColor: 'var(--color-amber-500)' },
    { name: 'AWS & DevOps', Icon: Database, brandColor: 'var(--color-emerald-500)' }
];

export const socialLinks = [
    { href: user.github, Icon: Github, label: 'GitHub' },
    { href: user.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { href: user.leetcode, Icon: LeetCode, label: 'LeetCode' },
    { href: user.codeforces, Icon: Codeforces, label: 'Codeforces' },
    { href: user.facebook, Icon: Facebook, label: 'Facebook' }
];

export const heroStats = [
    { value: '4+', label: 'Years Experience' },
    { value: '15+', label: 'Enterprise Projects' },
    { value: '1000+', label: 'Problems Solved' }
];
