import SectionHeading from '@/components/common/section-heading';
import SpotlightBorder from '@/components/common/spotlight-border';
import SpotlightGroup from '@/components/common/spotlight-group';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import { bio, education, experience, type TimelineEntry } from '@/components/home/about/contents';
import styles from '@/components/home/skills/skill-card.module.css';
import { cn } from '@/utils/cn';
import { user } from '@/lib/metadata';
import Image from 'next/image';

function TimelineList({ title, entries }: { title: string; entries: TimelineEntry[] }) {
    return (
        <div>
            <h3 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">
                {title}
            </h3>
            <ul className="mt-4 space-y-4">
                {entries.map((entry) => (
                    <li key={`${entry.organization}-${entry.period}`}>
                        <p className="text-foreground font-semibold">{entry.role}</p>
                        <p className="text-foreground/60 text-sm">
                            {entry.organization} &middot; {entry.period}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function AboutArea() {
    return (
        <section id="about" className="relative px-4 py-24">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <SectionHeading className="text-foreground">About Me</SectionHeading>
                </div>

                <SpotlightGroup className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <div
                        {...spotlightSurfaceProps}
                        style={
                            { '--brand-color': 'var(--color-indigo-500)' } as React.CSSProperties
                        }
                        className={cn(
                            styles.card,
                            'border-foreground/10 bg-background/40 rounded-2xl border p-8 backdrop-blur-sm'
                        )}>
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                            <Image
                                src="/kzaman.jpg"
                                alt={user.name}
                                width={128}
                                height={128}
                                className="size-32 shrink-0 rounded-2xl object-cover"
                            />
                            <div className="space-y-4">
                                {bio.map((paragraph) => (
                                    <p
                                        key={paragraph.slice(0, 32)}
                                        className="text-foreground/70 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <SpotlightBorder className={styles.border} />
                    </div>

                    <div
                        {...spotlightSurfaceProps}
                        style={
                            { '--brand-color': 'var(--color-emerald-500)' } as React.CSSProperties
                        }
                        className={cn(
                            styles.card,
                            'border-foreground/10 bg-background/40 space-y-8 rounded-2xl border p-8 backdrop-blur-sm'
                        )}>
                        <TimelineList title="Experience" entries={experience} />
                        <TimelineList title="Education" entries={education} />
                        <SpotlightBorder className={styles.border} />
                    </div>
                </SpotlightGroup>
            </div>
        </section>
    );
}
