/**
 * Pieces shared by the labelled field primitives (Input, Textarea): the control
 * styling, the required marker, and the helper/error region. Kept in one module
 * so a new field type inherits the same look and the same a11y wiring rather
 * than restating either.
 */

export const fieldControlClassName =
    'border-foreground/15 bg-background/60 focus:border-foreground/40 focus:ring-foreground/20 min-h-11 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:focus:ring-red-500/25';

/** Programmatic and visual required marker for a field label. */
export function RequiredMark() {
    return (
        <span className="text-red-600 dark:text-red-400">
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
        </span>
    );
}

interface FieldMessagesProps {
    describedById: string;
    error?: string;
    helperText?: string;
}

/**
 * The helper/error region under a field. An error takes over the announcement
 * as an assertive `alert`; otherwise persistent helper text is exposed politely
 * as a `status`. Both share the id the control points at through
 * `aria-describedby`.
 */
export function FieldMessages({ describedById, error, helperText }: FieldMessagesProps) {
    if (error) {
        return (
            <p id={describedById} role="alert" className="text-xs text-red-600 dark:text-red-400">
                {error}
            </p>
        );
    }

    if (helperText) {
        return (
            <p id={describedById} role="status" className="text-foreground/70 text-xs">
                {helperText}
            </p>
        );
    }

    return null;
}
