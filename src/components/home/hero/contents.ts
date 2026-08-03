import { Codeforces, Facebook, Github, LeetCode, Linkedin } from '@/components/icons';
import { user } from '@/lib/metadata';
import { Cpu, Database, Layout, Terminal, type LucideIcon } from 'lucide-react';

export interface CoreCompetency {
    name: string;
    Icon: LucideIcon;
    /** Tailwind gradient stops for the tile's icon chip. */
    gradient: string;
}

export const coreCompetencies: CoreCompetency[] = [
    { name: 'PHP & Laravel', Icon: Terminal, gradient: 'from-indigo-500 to-purple-500' },
    { name: 'React & Vue', Icon: Layout, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', Icon: Cpu, gradient: 'from-amber-500 to-orange-500' },
    { name: 'AWS & DevOps', Icon: Database, gradient: 'from-emerald-500 to-teal-500' }
];

export const socialLinks = [
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

export { Github };
