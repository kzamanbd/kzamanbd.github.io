import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Conditional class composition. `clsx` resolves the conditionals and `twMerge`
 * drops earlier Tailwind utilities that a later one overrides, so a `className`
 * prop can always win against a component's own defaults.
 */
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};
