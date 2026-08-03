import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';

export type ThemePreference = 'system' | 'light' | 'dark';

export interface ThemeOption {
    value: ThemePreference;
    label: string;
    Icon: LucideIcon;
}

/**
 * Named separately from the list so consumers have a concrete fallback to reach
 * for (indexing the array yields `ThemeOption | undefined` under
 * `noUncheckedIndexedAccess`).
 */
export const systemThemeOption: ThemeOption = { value: 'system', label: 'System', Icon: Monitor };

/**
 * The three theme choices, shared by the segmented ThemeToggle (mobile menu) and
 * the round ThemeMenu (desktop). Ordered system -> light -> dark.
 *
 * The preference itself is owned by `next-themes` (already wired up in
 * `ThemeProviders`), which persists it, resolves "system"
 * against the OS, writes the `dark` class that the `dark:` variant keys on, and
 * runs its own pre-paint script so a saved choice never flashes.
 */
export const themeOptions: ThemeOption[] = [
    systemThemeOption,
    { value: 'light', label: 'Light', Icon: Sun },
    { value: 'dark', label: 'Dark', Icon: Moon }
];
