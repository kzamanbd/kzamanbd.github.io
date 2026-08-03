import Spinner from '@/components/ui/spinner';
import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'text';

const buttonBaseClassName =
    'focus-ring inline-flex min-h-11 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60';

const variantClassNames: Record<ButtonVariant, string> = {
    solid: 'bg-foreground text-background hover:bg-foreground/90',
    outline: 'border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 border',
    // Reads as an underlined text link while staying a real button, for quiet
    // in-flow actions (a "Show more" reveal) that should not compete with the
    // filled and outlined actions around them.
    text: 'text-foreground/70 decoration-foreground/30 hover:text-foreground hover:decoration-foreground px-2 underline underline-offset-4'
};

/** Shared button geometry and states, so links and buttons can look identical. */
export const buttonStyles = (variant: ButtonVariant, className?: string) =>
    cn(buttonBaseClassName, variantClassNames[variant], className);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    /** Disables the button and shows a spinner before the label. */
    isLoading?: boolean;
}

export default function Button({
    variant = 'solid',
    isLoading = false,
    type = 'button',
    disabled,
    className,
    children,
    ...rest
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            className={buttonStyles(variant, className)}
            {...rest}>
            {isLoading && <Spinner />}
            {children}
        </button>
    );
}
