import styles from '@/components/animations/shiny-text.module.css';
import { cn } from '@/utils/cn';

interface ShinyTextProps {
    children: React.ReactNode;
    /** Skip the shimmer and render the text flat. */
    disabled?: boolean;
    /** Sweep duration in seconds. */
    speed?: number;
    className?: string;
}

/**
 * Sweeps a soft highlight across its text. The gradient is clipped to the
 * glyphs, so the sweep reads as light travelling over the letters. Reduced
 * motion keeps the text still (the module gates the animation).
 */
export default function ShinyText({
    children,
    disabled = false,
    speed = 5,
    className
}: ShinyTextProps) {
    return (
        <span
            className={cn(
                'inline-block bg-linear-120 from-black/80 from-40% via-black via-50% to-black/80 to-60% bg-clip-text motion-safe:text-transparent dark:from-white/80 dark:via-white dark:to-white/80',
                disabled ? '' : styles.shine,
                className
            )}
            style={{
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                animationDuration: `${speed}s`
            }}>
            {children}
        </span>
    );
}
