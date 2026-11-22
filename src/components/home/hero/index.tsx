import SpotlightGroup from '@/components/common/spotlight-group';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import Tag from '@/components/common/tag';
import { heroHighlights, heroLede, socialLinks } from '@/components/home/hero/contents';
import styles from '@/components/home/hero/hero.module.css';
import ScrollDownCue from '@/components/home/hero/scroll-down-cue';
import { heroId, resumeItem } from '@/components/layout/navbar/contents';
import ButtonLink from '@/components/ui/button-link';
import { lato } from '@/config/hero-font';
import { currentWorkplace, currentWorkplaceURL, user } from '@/services/metadata';
import { cn } from 'cn';
import { ArrowRight, FileText } from 'lucide-react';

/**
 * The top of the home page: the name, set as large as the viewport allows, with
 * just enough around it to act on.
 *
 * The full stack belongs to Skills, the work to Projects, the story to About,
 * so the hero only introduces them: the wordmark (the name as the block, the
 * title hung off its right edge like a signature line), a one-line status above
 * it saying where I work now, a lede and a few focus chips saying what I build,
 * and the two actions a visitor arrives wanting: the resume and a way to get in
 * touch. The profiles sit last, as the quietest row.
 *
 * The name and title share one `w-fit` column, which is what lets the title
 * align to the *name's* right edge rather than the container's, at every size,
 * with no measured width anywhere. The status, lede, button and profile rows are
 * `w-0 min-w-full`: they contribute nothing to the column's intrinsic width and
 * then stretch to it, so on a narrow phone they wrap (or overhang, centred)
 * instead of widening the column and pulling the title off the name's edge.
 *
 * The section is itself a spotlit surface: the ruled grid behind the name
 * brightens in a soft circle under the cursor. The group wrapper is the full
 * hero box rather than a `contents` element, so the pointer is tracked over the
 * empty grid as well as over the type.
 */
export default function HeroArea() {
    return (
        <section
            id={heroId}
            {...spotlightSurfaceProps}
            className={cn(styles.section, 'relative z-10 overflow-hidden')}>
            {/* `pb-28` clears the absolutely placed ScrollDownCue (bottom-8 plus
                its ~76px height), so a tall hero on a phone grows the section
                instead of running its last row under the cue. */}
            <SpotlightGroup className="flex min-h-screen flex-col justify-center px-4 pt-28 pb-28">
                <div className="container mx-auto flex max-w-292 justify-center">
                    <div className="animate-fade-in-up flex w-fit flex-col">
                        <div className="mb-6 flex w-0 min-w-full justify-center">
                            <a
                                href={currentWorkplaceURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    styles.status,
                                    'focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap sm:text-sm'
                                )}>
                                <span aria-hidden="true" className={styles.statusDot} />
                                <span>
                                    Currently at{' '}
                                    <span className="text-foreground font-semibold">
                                        {currentWorkplace}
                                    </span>
                                    <span aria-hidden="true" className="text-foreground/40 mx-1.5">
                                        ·
                                    </span>
                                    {user.address}
                                </span>
                            </a>
                        </div>

                        {/* The display face is scoped here rather than set globally:
                            applying the variable on this one element is what keeps
                            Lato off every other route. */}
                        <h1 className={cn(lato.variable, styles.name)}>{user.name}</h1>

                        <p className={cn(styles.designation, 'self-end text-right')}>
                            {user.designation}
                        </p>

                        <div className="mt-8 w-0 min-w-full text-center">
                            <p className={cn(styles.lede, 'mx-auto max-w-2xl')}>{heroLede}</p>
                            <ul className="mt-5 flex flex-wrap justify-center gap-2">
                                {heroHighlights.map((highlight) => (
                                    <Tag
                                        key={highlight}
                                        className="text-foreground/70 bg-background/50 px-3 py-1 text-xs backdrop-blur-sm sm:text-sm">
                                        {highlight}
                                    </Tag>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8 flex w-0 min-w-full flex-wrap items-center justify-center gap-3">
                            <ButtonLink href={resumeItem.href}>
                                <FileText aria-hidden="true" className="size-4" />
                                {resumeItem.label}
                            </ButtonLink>
                            <ButtonLink href="/#contact" variant="outline">
                                Get in touch
                                <ArrowRight aria-hidden="true" className="size-4" />
                            </ButtonLink>
                        </div>

                        <ul className="mt-7 flex w-0 min-w-full flex-wrap items-center justify-center gap-5 sm:gap-6">
                            {socialLinks.map(({ href, Icon, label }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className={cn(styles.mark, 'focus-ring block rounded-sm')}>
                                        <Icon className="size-5" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <ScrollDownCue />
            </SpotlightGroup>
        </section>
    );
}
