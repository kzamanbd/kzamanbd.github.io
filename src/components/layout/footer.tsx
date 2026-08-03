import { Codeforces, Facebook, Github, LeetCode, Linkedin } from '@/components/icons';
import { authorName, user } from '@/lib/metadata';
import Link from 'next/link';

const socialLinks = [
    { href: user.github, Icon: Github, label: 'GitHub' },
    { href: user.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { href: user.leetcode, Icon: LeetCode, label: 'LeetCode' },
    { href: user.codeforces, Icon: Codeforces, label: 'Codeforces' },
    { href: user.facebook, Icon: Facebook, label: 'Facebook' }
];

const footerLinks = [
    { href: '/resume', label: 'Resume' },
    { href: '/shorturl', label: 'Short URL' }
];

export default function Footer() {
    // Rendered on the server, so this is the build/request year rather than the
    // visitor's clock. Good enough for a copyright line and avoids shipping a
    // client component just to read a date.
    const year = new Date().getFullYear();

    return (
        <footer className="border-foreground/10 mt-24 border-t print:hidden">
            <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between">
                <p className="text-foreground/60 text-sm">
                    &copy; {year} {authorName}. All rights reserved.
                </p>

                <nav aria-label="Footer" className="flex items-center gap-5">
                    {footerLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="focus-ring text-foreground/60 hover:text-foreground rounded-sm text-sm transition-colors">
                            {label}
                        </Link>
                    ))}
                </nav>

                <ul className="flex items-center gap-4">
                    {socialLinks.map(({ href, Icon, label }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="focus-ring text-foreground/50 hover:text-foreground block rounded-sm transition-colors">
                                <Icon className="size-5" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
