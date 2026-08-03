import { FieldMessages, fieldControlClassName, RequiredMark } from '@/components/ui/field';
import { cn } from '@/utils/cn';
import { useId, type ComponentPropsWithRef } from 'react';

interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
    label: string;
    labelClassName?: string;
    error?: string;
    helperText?: string;
}

/** The multi-line counterpart of Input, sharing its styling and a11y wiring. */
export default function Textarea({
    label,
    labelClassName,
    error,
    helperText,
    id,
    rows = 5,
    className,
    ...rest
}: TextareaProps) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const describedById = `${textareaId}-message`;
    const hasMessage = Boolean(error || helperText);

    return (
        <div className="flex flex-col gap-2 text-left">
            <label htmlFor={textareaId} className={cn('text-sm font-medium', labelClassName)}>
                {label}
                {rest.required && <RequiredMark />}
            </label>
            <textarea
                id={textareaId}
                rows={rows}
                className={cn(fieldControlClassName, 'resize-y', className)}
                aria-invalid={error ? true : undefined}
                aria-describedby={hasMessage ? describedById : undefined}
                {...rest}
            />
            <FieldMessages describedById={describedById} error={error} helperText={helperText} />
        </div>
    );
}
