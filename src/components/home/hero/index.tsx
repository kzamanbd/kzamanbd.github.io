import { socialLinks } from '@/components/home/hero/contents';
import styles from '@/components/home/hero/hero.module.css';
import ScrollDownCue from '@/components/home/hero/scroll-down-cue';
import { heroId } from '@/components/layout/navbar/contents';
import { lato } from '@/config/hero-font';
import { user } from '@/lib/metadata';
import { cn } from '@/utils/cn';

/**
 * The top of the home page: the name, set as large as the viewport allows, and
 * nothing else that competes with it.
 *
 * Every other thing a hero could carry has a section of its own further down
 * that says it better — the stack belongs to Skills, the work to Projects, the
 * numbers to About — so repeating any of it here only delays the reader
 * reaching them. What is left is the wordmark treatment: the name as the block,
 * the title hung off its right edge like a signature line, and the profiles
 * centred under both.
 *
 * The three parts share one `w-fit` column, which is what lets the title align
 * to the *name's* right edge rather than the container's, at every size, with
 * no measured width anywhere.
 */
export default function HeroArea() {
    return (
        <section
            id={heroId}
            className={cn(
                styles.section,
                'relative z-10 flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-28 pb-16'
            )}>
            <div className="container mx-auto flex max-w-292 justify-center">
                <div className="animate-fade-in-up flex w-fit flex-col">
                    {/* The display face is scoped here rather than set globally:
                        applying the variable on this one element is what keeps
                        Lato off every other route. */}
                    <h1 className={cn(lato.variable, styles.name)}>{user.name}</h1>

                    <p className={cn(styles.designation, 'self-end text-right')}>
                        {user.designation}
                    </p>

                    <ul className="mt-4 flex flex-wrap items-center justify-center gap-6 self-center">
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
        </section>
    );
}
