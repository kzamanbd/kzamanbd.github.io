import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'solid' | 'outline';

/** Shared button geometry and states, so links and buttons can look identical. */
export const buttonStyles = (variant: ButtonVariant, className?: string) =>
    cn(
        'focus-ring inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors',
        variant === 'solid'
            ? 'bg-foreground text-background hover:bg-foreground/90'
            : 'border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 border',
        className
    );

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

export default function Button({ variant = 'solid', className, ...rest }: ButtonProps) {
    return <button className={buttonStyles(variant, className)} {...rest} />;
}
