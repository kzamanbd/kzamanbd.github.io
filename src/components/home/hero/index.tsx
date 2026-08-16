import { heroStats, primarySocialLinks } from '@/components/home/hero/contents';
import styles from '@/components/home/hero/hero.module.css';
import HeroVisual from '@/components/home/hero/hero-visual';
import ScrollDownCue from '@/components/home/hero/scroll-down-cue';
import { heroId } from '@/components/layout/navbar/contents';
import ButtonLink from '@/components/ui/button-link';
import { lato } from '@/config/hero-font';
import { user } from '@/lib/metadata';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';

/**
 * The top of the home page: who this is, what they do, and two ways in.
 *
 * The composition follows the weDevs home page — a heavy left-aligned headline
 * with two words struck through with pastel marker bars, a loose grey lede, and
 * a white promo card carrying the numbers — against an even 50/50 split with the
 * artwork. `hero.module.css` holds the measured type and the corner blobs; this
 * file only arranges them.
 *
 * Deliberately short on copy. Everything the hero could also say has a section
 * of its own further down that says it better — the stack belongs to Skills, the
 * work to Projects — and repeating either here only delays the reader reaching
 * them.
 */
export default function HeroArea() {
    return (
        <section
            id={heroId}
            className={cn(
                styles.section,
                'relative z-10 flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-28 pb-16'
            )}>
            <div className="container mx-auto max-w-292">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
                    <div className="flex flex-col items-start text-left">
                        {/* Availability badge */}
                        <p className="animate-fade-in-up border-foreground/10 bg-background/50 text-foreground/80 mb-8 inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-3 text-sm font-medium backdrop-blur-md">
                            <span
                                aria-hidden="true"
                                className="relative grid size-2 place-items-center">
                                <span className="absolute size-2 rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
                                <span className="size-2 rounded-full bg-emerald-500" />
                            </span>
                            Open to exciting opportunities
                        </p>

                        {/* The display face is scoped here rather than set globally:
                            applying the variable on this one element is what keeps
                            Lato off every other route. */}
                        <h1 className={cn(lato.variable, styles.headline, 'animate-fade-in-up')}>
                            {/* Broken by hand from `lg` up, the way the reference
                                headline is: the marked words have to land mid-line or
                                the bars read as stray rules under the last word of a
                                line. Below `lg` the breaks are dropped — the column is
                                narrow enough there that keeping them would fold the
                                headline into seven ragged lines. */}
                            Hi, I&apos;m {user.name} <br className="hidden lg:inline" />I Build{' '}
                            <span
                                className={styles.mark}
                                style={{ '--mark': '#c9defb' } as CSSProperties}>
                                Scalable
                            </span>{' '}
                            <br className="hidden lg:inline" />
                            Systems That{' '}
                            <span
                                className={styles.mark}
                                style={{ '--mark': '#ead8fd' } as CSSProperties}>
                                Empower
                            </span>{' '}
                            <br className="hidden lg:inline" />
                            Businesses Worldwide
                        </h1>

                        <p className={cn(styles.lede, 'animate-fade-in-up mt-6 max-w-132')}>
                            Software Engineer at weDevs. I design systems for scale with Laravel,
                            React, MySQL and AWS — and solve the performance problems that show up
                            once the data stops being small.
                        </p>

                        {/* Calls to action. The resume lives in the navbar, where it is
                            reachable from every page rather than only from the top of
                            this one, so it is deliberately not repeated here. Contact
                            is a plain mailto, matching the footer: there is no contact
                            form to scroll to any more. */}
                        <div className="animate-fade-in-up mt-10 flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center">
                            <ButtonLink
                                href={`mailto:${user.email}`}
                                className="group w-full sm:w-auto">
                                Get in touch
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </ButtonLink>
                            <ButtonLink
                                href="/articles"
                                variant="outline"
                                className="w-full sm:w-auto">
                                Read the writing
                            </ButtonLink>
                        </div>

                        {/* The promo card: the numbers on top, the profile marks along
                            the bottom, standing in for the client logo strip the
                            reference runs there. */}
                        <div className={cn(styles.promo, 'animate-fade-in-up mt-12')}>
                            <dl className="flex flex-wrap gap-x-8 gap-y-4">
                                {heroStats.map(({ value, label }) => (
                                    <div key={label}>
                                        <dt className={styles.promoLabel}>{label}</dt>
                                        <dd className={styles.promoValue}>{value}</dd>
                                    </div>
                                ))}
                            </dl>

                            <ul
                                className={cn(
                                    styles.promoStrip,
                                    'mt-5 flex flex-wrap items-center gap-5 pt-5'
                                )}>
                                {primarySocialLinks.map(({ href, Icon, label }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className={cn(
                                                styles.promoMark,
                                                'focus-ring block rounded-sm'
                                            )}>
                                            <Icon className="size-5" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* The artwork. Sized by its column from `lg`; below that it is
                        capped by hand so a stacked hero does not run to two
                        screens on a phone. */}
                    <HeroVisual className="animate-fade-in-up mx-auto w-full max-w-[18rem] sm:max-w-88 lg:max-w-none" />
                </div>
            </div>

            <ScrollDownCue />
        </section>
    );
}
