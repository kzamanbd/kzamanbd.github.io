import { Codeforces, Facebook, Github, LeetCode, Linkedin } from '@/components/icons';
import ButtonLink from '@/components/ui/button-link';
import { authorName, user } from '@/lib/metadata';
import { Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
    { href: user.github, Icon: Github, label: 'GitHub' },
    { href: user.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { href: user.leetcode, Icon: LeetCode, label: 'LeetCode' },
    { href: user.codeforces, Icon: Codeforces, label: 'Codeforces' },
    { href: user.facebook, Icon: Facebook, label: 'Facebook' }
];

const exploreLinks = [
    { href: '/articles', label: 'Articles' },
    { href: '/uses', label: 'Uses' },
    { href: '/now', label: 'Now' },
    { href: '/resume', label: 'Resume' },
    { href: '/shorturl', label: 'Short URL' }
];

const feedLinks = [
    { href: '/feed.xml', label: 'RSS' },
    { href: '/atom.xml', label: 'Atom' },
    { href: '/feed.json', label: 'JSON Feed' }
];

/**
 * Site footer, and the site's only contact surface now that the inline contact
 * form is gone: the email is a plain mailto, which needs no form handler, no
 * spam filtering and no third-party service to keep working.
 *
 * It carries its own tinted background rather than inheriting the page's. The
 * body and the footer both sit on `--background`, so without a distinct surface
 * the footer has no visible edge at all and reads as empty space at the bottom of
 * the page.
 */
export default function Footer() {
    // Rendered on the server, so this is the build/request year rather than the
    // visitor's clock. Good enough for a copyright line, and it avoids shipping a
    // client component just to read a date.
    const year = new Date().getFullYear();

    return (
        <footer className="border-foreground/10 bg-foreground/4 mt-24 border-t print:hidden">
            <div className="container mx-auto px-4 py-16">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
                    {/* Contact */}
                    <div>
                        <h2 className="text-foreground text-2xl font-bold text-balance">
                            Have something worth building?
                        </h2>
                        <p className="text-foreground/60 mt-3 max-w-md leading-relaxed">
                            The fastest way to reach me is email. I read everything, and I reply to
                            anything concrete.
                        </p>

                        <ButtonLink href={`mailto:${user.email}`} className="mt-6">
                            <Mail className="size-4" />
                            {user.email}
                        </ButtonLink>

                        <p className="text-foreground/50 mt-6 flex items-center gap-2 text-sm">
                            <MapPin aria-hidden="true" className="size-4" />
                            {user.address}
                        </p>
                    </div>

                    {/* Explore */}
                    <nav aria-label="Footer">
                        <h2 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">
                            Explore
                        </h2>
                        <ul className="mt-4 space-y-2.5">
                            {exploreLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="focus-ring text-foreground/60 hover:text-foreground rounded-sm text-sm transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Subscribe */}
                    <div>
                        <h2 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">
                            Subscribe
                        </h2>
                        <ul className="mt-4 space-y-2.5">
                            {feedLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        className="focus-ring text-foreground/60 hover:text-foreground rounded-sm text-sm transition-colors">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-foreground/10 mt-12 flex flex-col items-center gap-6 border-t pt-8 sm:flex-row sm:justify-between">
                    <p className="text-foreground/50 text-sm">
                        &copy; {year} {authorName}. All rights reserved.
                    </p>

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
            </div>
        </footer>
    );
}
