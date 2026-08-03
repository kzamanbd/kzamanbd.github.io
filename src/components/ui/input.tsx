import { FieldMessages, fieldControlClassName, RequiredMark } from '@/components/ui/field';
import { cn } from '@/utils/cn';
import { useId, type ComponentPropsWithRef } from 'react';

interface InputProps extends ComponentPropsWithRef<'input'> {
    label: string;
    labelClassName?: string;
    error?: string;
    helperText?: string;
}

/**
 * Labelled text input on the shared field styling, theme-aware through the
 * foreground/background tokens. When `error` or `helperText` is set, the
 * message is wired to the control with `aria-describedby` and `aria-invalid`.
 */
export default function Input({
    label,
    labelClassName,
    error,
    helperText,
    id,
    className,
    ...rest
}: InputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const describedById = `${inputId}-message`;
    const hasMessage = Boolean(error || helperText);

    return (
        <div className="flex flex-col gap-2 text-left">
            <label htmlFor={inputId} className={cn('text-sm font-medium', labelClassName)}>
                {label}
                {rest.required && <RequiredMark />}
            </label>
            <input
                id={inputId}
                className={cn(fieldControlClassName, className)}
                aria-invalid={error ? true : undefined}
                aria-describedby={hasMessage ? describedById : undefined}
                {...rest}
            />
            <FieldMessages describedById={describedById} error={error} helperText={helperText} />
        </div>
    );
}
