import SectionHeading from '@/components/common/section-heading';
import SpotlightBorder from '@/components/common/spotlight-border';
import SpotlightGroup from '@/components/common/spotlight-group';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import Bento from '@/components/home/about/bento';
import { bio, education, experience } from '@/components/home/about/contents';
import SystemDiagram from '@/components/home/about/system-diagram';
import TimelineList from '@/components/home/about/timeline-list';
import styles from '@/components/common/glow-card.module.css';
import { cn } from '@/utils/cn';
import type { CSSProperties } from 'react';

export default function AboutArea() {
    return (
        <section id="about" className="relative px-4 py-24">
            <div className="container mx-auto flex max-w-6xl flex-col gap-12">
                <div className="flex flex-col items-center text-center">
                    <SectionHeading className="text-foreground">About Me</SectionHeading>
                    <p className="text-foreground/60 mt-4 max-w-xl text-lg">
                        How I think about system design, what I build with, and the problems I like
                        solving.
                    </p>
                </div>

                {/* The same four facets, wired to the portrait on wide screens
                    and stacked into a bento below lg, where the radial diagram
                    has no room to read. */}
                <SystemDiagram />
                <Bento />

                <SpotlightGroup className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <div
                        {...spotlightSurfaceProps}
                        style={{ '--brand-color': 'var(--color-indigo-500)' } as CSSProperties}
                        className={cn(
                            styles.card,
                            'border-foreground/10 bg-background/40 space-y-4 rounded-2xl border p-8 backdrop-blur-sm'
                        )}>
                        {bio.map((paragraph) => (
                            <p
                                key={paragraph.slice(0, 32)}
                                className="text-foreground/70 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                        <SpotlightBorder className={styles.border} />
                    </div>

                    <div
                        {...spotlightSurfaceProps}
                        style={{ '--brand-color': 'var(--color-emerald-500)' } as CSSProperties}
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
