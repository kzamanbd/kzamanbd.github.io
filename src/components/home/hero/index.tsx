import AnimatedUnderline from '@/components/animations/animated-underline';
import ShinyText from '@/components/animations/shiny-text';
import GridBackground from '@/components/backgrounds/grid-background';
import SpotlightBorder from '@/components/common/spotlight-border';
import SpotlightList from '@/components/common/spotlight-list';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import { coreCompetencies, heroStats, socialLinks } from '@/components/home/hero/contents';
import styles from '@/components/home/skills/skill-card.module.css';
import { heroId } from '@/components/layout/navbar/contents';
import ButtonLink from '@/components/ui/button-link';
import { user } from '@/lib/metadata';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';

export default function HeroArea() {
    return (
        <section
            id={heroId}
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-16">
            <GridBackground />

            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col items-center text-center">
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

                    <h1
                        className="animate-fade-in-up text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                        style={{ animationDelay: '100ms' }}>
                        <span className="text-foreground/60 mb-3 block text-xl font-semibold sm:text-2xl md:text-3xl">
                            Hello, I&apos;m
                        </span>
                        <ShinyText className="pr-2 pb-2">{user.name}</ShinyText>
                    </h1>

                    <h2
                        className="animate-fade-in-up text-foreground/75 mx-auto mt-6 max-w-2xl text-lg font-medium text-balance sm:text-xl md:text-2xl"
                        style={{ animationDelay: '200ms' }}>
                        Crafting scalable, high-performance systems as a{' '}
                        <AnimatedUnderline variant="draw-right" color="var(--color-indigo-500)">
                            Full Stack Engineer
                        </AnimatedUnderline>
                        .
                    </h2>

                    <p
                        className="animate-fade-in-up text-foreground/60 mt-6 max-w-2xl text-base leading-relaxed text-balance sm:text-lg"
                        style={{ animationDelay: '300ms' }}>
                        Bridging product vision with rigorous engineering: robust backend
                        architectures, and interfaces polished enough to disappear.
                    </p>

                    {/* Core competencies, carrying the site's signature accent bloom. */}
                    <SpotlightList className="animate-fade-in-up mt-14 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {coreCompetencies.map(({ name, Icon, brandColor }) => (
                            <li
                                key={name}
                                {...spotlightSurfaceProps}
                                style={{ '--brand-color': brandColor } as React.CSSProperties}
                                className={cn(
                                    styles.card,
                                    'border-foreground/10 bg-background/40 flex flex-col items-center rounded-2xl border p-5 backdrop-blur-sm'
                                )}>
                                <span
                                    className="border-foreground/10 mb-3 flex size-12 items-center justify-center rounded-xl border"
                                    style={{ color: brandColor }}>
                                    <Icon aria-hidden="true" className="size-6" strokeWidth={2} />
                                </span>
                                <h3 className="text-foreground font-semibold">{name}</h3>
                                <SpotlightBorder className={styles.border} />
                            </li>
                        ))}
                    </SpotlightList>

                    {/* Calls to action. The resume lives in the navbar, where it is
                        reachable from every page rather than only from the top of
                        this one, so it is deliberately not repeated here. Contact
                        is a plain mailto, matching the footer: there is no contact
                        form to scroll to any more. */}
                    <div
                        className="animate-fade-in-up mt-14 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
                        style={{ animationDelay: '500ms' }}>
                        <ButtonLink
                            href={`mailto:${user.email}`}
                            className="group w-full sm:w-auto">
                            Get in touch
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </ButtonLink>
                        <ButtonLink href="/articles" variant="outline" className="w-full sm:w-auto">
                            Read the writing
                        </ButtonLink>
                    </div>

                    {/* Socials and quick stats */}
                    <div
                        className="animate-fade-in-up border-foreground/10 mt-16 w-full max-w-4xl border-t pt-8"
                        style={{ animationDelay: '600ms' }}>
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <ul className="flex flex-wrap justify-center gap-4">
                                {socialLinks.map(({ href, Icon, label }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="focus-ring text-foreground/50 hover:text-foreground block rounded-sm transition-colors duration-300">
                                            <Icon className="size-6" />
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <dl className="text-foreground/60 grid grid-cols-2 gap-6 text-sm font-medium sm:flex sm:gap-8">
                                {heroStats.map(({ value, label }) => (
                                    <div
                                        key={label}
                                        className="flex flex-col items-center last:col-span-2 last:sm:col-span-1">
                                        <dt className="sr-only">{label}</dt>
                                        <dd className="flex flex-col items-center">
                                            <span className="text-foreground text-2xl font-bold">
                                                {value}
                                            </span>
                                            <span className="text-center">{label}</span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
