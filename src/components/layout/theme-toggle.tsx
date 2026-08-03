'use client';

import { themeOptions } from '@/components/layout/theme-options';
import { cn } from '@/utils/cn';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * Segmented three-icon control for the theme preference (system / light / dark).
 * Used in the mobile menu panel; the wrapper's background and spacing are left
 * to the caller via `className`.
 *
 * The active state is only rendered after mount: the server has no way to know
 * the stored preference, so painting it during SSR would mismatch on hydration.
 */
export default function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <div role="group" aria-label="Theme" className={cn('flex items-center gap-0.5', className)}>
            {themeOptions.map(({ value, label, Icon }) => {
                const active = mounted && theme === value;
                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setTheme(value)}
                        aria-pressed={active}
                        aria-label={`${label} theme`}
                        title={`${label} theme`}
                        className={cn(
                            'focus-ring flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors',
                            active
                                ? 'bg-foreground/10 text-foreground'
                                : 'text-foreground/70 hover:text-foreground'
                        )}>
                        <Icon aria-hidden="true" className="size-4" />
                    </button>
                );
            })}
        </div>
    );
}
