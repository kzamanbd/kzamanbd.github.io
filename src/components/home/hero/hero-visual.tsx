import { heroAccentShapes, heroChipItems, heroOrbitItems } from '@/components/home/hero/contents';
import styles from '@/components/home/hero/hero-visual.module.css';
import TechIcon, { techBrandColor } from '@/components/icons/tech-icon';
import { user } from '@/lib/metadata';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import type { CSSProperties, HTMLAttributes } from 'react';

/**
 * The hero's artwork: the portrait in a gradient-rimmed blob, with the stack
 * floating around it.
 *
 * The photo is the one part that carries meaning, so it sits outside the
 * `aria-hidden` wrapper and keeps a real `alt`; everything else — the halo, the
 * orbit rings, the tiles, the confetti — is named in words elsewhere on the page
 * and is hidden from assistive tech wholesale. The decoration is also entirely
 * CSS: the drift, the spin and the morph are keyframes reading per-item custom
 * properties, which keeps the component on the server and the client bundle
 * untouched.
 */
export default function HeroVisual({ className, style }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn(styles.stage, className)} style={style}>
            <div aria-hidden="true" className={styles.decor}>
                <div className={styles.halo} />
                <div className={styles.ring} />
                <div className={cn(styles.ring, styles.ringInner)} />

                {heroAccentShapes.map(
                    ({ kind, color, x, y, size, tilt, duration, delay }, index) => (
                        <div
                            key={`${kind}-${index}`}
                            className={cn(
                                styles.shape,
                                kind === 'sphere' && styles.shapeSphere,
                                kind === 'ring' && styles.shapeRing,
                                kind === 'bar' && styles.shapeBar
                            )}
                            style={
                                {
                                    '--brand': color,
                                    '--x': `${x}%`,
                                    '--y': `${y}%`,
                                    '--size': `${size}%`,
                                    '--tilt': `${tilt}deg`,
                                    '--duration': `${duration}s`,
                                    '--delay': `${delay}s`
                                } as CSSProperties
                            }
                        />
                    )
                )}

                {heroOrbitItems.map(({ icon, label, x, y, size, tilt, duration, delay }) => (
                    <div
                        key={label}
                        className={styles.tile}
                        style={
                            {
                                '--brand': techBrandColor(icon),
                                '--x': `${x}%`,
                                '--y': `${y}%`,
                                '--size': `${size}%`,
                                '--tilt': `${tilt}deg`,
                                '--duration': `${duration}s`,
                                '--delay': `${delay}s`
                            } as CSSProperties
                        }>
                        <TechIcon name={icon} className={styles.tileIcon} />
                    </div>
                ))}

                <div className={styles.chipRow}>
                    {heroChipItems.map(({ icon, label }) => (
                        <span
                            key={label}
                            className={styles.chip}
                            style={{ '--brand': techBrandColor(icon) } as CSSProperties}>
                            <TechIcon name={icon} className={styles.chipIcon} />
                        </span>
                    ))}
                </div>
            </div>

            {/* The rim is the gradient the orb used to be: the same paint, drawn as
                the frame's padding rather than as a disc, so the artwork keeps its
                colour without the photo having to compete with it. */}
            <div className={styles.portrait}>
                <Image
                    src="/kzaman.jpg"
                    alt={user.name}
                    width={1026}
                    height={1044}
                    sizes="(min-width: 1024px) 400px, 260px"
                    priority
                    className={styles.portraitImage}
                />
            </div>
        </div>
    );
}
