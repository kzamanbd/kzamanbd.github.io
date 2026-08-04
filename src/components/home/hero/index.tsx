import AnimatedUnderline from '@/components/animations/animated-underline';
import ShinyText from '@/components/animations/shiny-text';
import GridBackground from '@/components/backgrounds/grid-background';
import { heroStats, primarySocialLinks } from '@/components/home/hero/contents';
import ScrollDownCue from '@/components/home/hero/scroll-down-cue';
import { heroId } from '@/components/layout/navbar/contents';
import ButtonLink from '@/components/ui/button-link';
import { zain } from '@/config/fonts';
import { user } from '@/lib/metadata';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';

/**
 * The top of the home page: who this is, what they do, and two ways in.
 *
 * Deliberately short. Everything the hero could also say has a section of its
 * own further down that says it better — the stack belongs to Skills, the work
 * to Projects — and repeating either here only delays the reader reaching them.
 */
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

                    {/* The display face is scoped here rather than set globally:
                        applying the variable on this one element is what keeps
                        Zain off every other route. */}
                    <h1
                        className={cn(
                            zain.variable,
                            'animate-fade-in-up text-foreground font-display text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl'
                        )}
                        style={{ animationDelay: '100ms' }}>
                        {/* Back to the body face: the display font is drawn for
                            the name at display size, and reads cramped at this
                            one. */}
                        <span className="text-foreground/60 mb-3 block font-sans text-lg font-semibold tracking-normal sm:text-xl md:text-2xl">
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

                    {/* Calls to action. The resume lives in the navbar, where it is
                        reachable from every page rather than only from the top of
                        this one, so it is deliberately not repeated here. Contact
                        is a plain mailto, matching the footer: there is no contact
                        form to scroll to any more. */}
                    <div
                        className="animate-fade-in-up mt-12 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
                        style={{ animationDelay: '300ms' }}>
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
                        className="animate-fade-in-up border-foreground/10 mt-14 w-full max-w-3xl border-t pt-8"
                        style={{ animationDelay: '400ms' }}>
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <ul className="flex flex-wrap justify-center gap-4">
                                {primarySocialLinks.map(({ href, Icon, label }) => (
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

            <ScrollDownCue />
        </section>
    );
}
