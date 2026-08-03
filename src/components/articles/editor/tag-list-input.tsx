'use client';

import { fieldControlClassName } from '@/components/ui/field';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';
import { useId, useState, type KeyboardEvent } from 'react';

interface TagListInputProps {
    label: string;
    values: string[];
    suggestions?: string[];
    placeholder?: string;
    onChange: (values: string[]) => void;
}

/**
 * A list-valued frontmatter field (tags, tech, takeaways) as removable chips.
 * Enter or comma commits an entry, Backspace on an empty box removes the last
 * one. The datalist offers values already used elsewhere in the corpus, so the
 * taxonomy converges instead of drifting into near-duplicates.
 */
export default function TagListInput({
    label,
    values,
    suggestions = [],
    placeholder,
    onChange
}: TagListInputProps) {
    const [entry, setEntry] = useState('');
    const inputId = useId();
    const listId = `${inputId}-suggestions`;

    const commit = (raw: string) => {
        const value = raw.trim();
        // Silently ignoring a duplicate beats an error: the author's intent is
        // already satisfied.
        if (value && !values.includes(value)) {
            onChange([...values, value]);
        }
        setEntry('');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            commit(entry);
            return;
        }
        if (event.key === 'Backspace' && entry === '' && values.length > 0) {
            onChange(values.slice(0, -1));
        }
    };

    return (
        <div className="flex flex-col gap-2 text-left">
            <label
                htmlFor={inputId}
                className="text-foreground/70 text-xs font-semibold tracking-[0.14em] uppercase">
                {label}
            </label>

            {values.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                    {values.map((value) => (
                        <li
                            key={value}
                            className="border-foreground/15 text-foreground/80 flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm">
                            {value}
                            <button
                                type="button"
                                onClick={() => onChange(values.filter((item) => item !== value))}
                                aria-label={`Remove ${value}`}
                                className="focus-ring text-foreground/50 hover:text-foreground rounded-full transition-colors">
                                <X aria-hidden="true" className="size-3.5" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <input
                id={inputId}
                list={suggestions.length > 0 ? listId : undefined}
                value={entry}
                placeholder={placeholder}
                onChange={(event) => setEntry(event.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => commit(entry)}
                className={cn(fieldControlClassName)}
            />

            {suggestions.length > 0 && (
                <datalist id={listId}>
                    {suggestions.map((suggestion) => (
                        <option key={suggestion} value={suggestion} />
                    ))}
                </datalist>
            )}
        </div>
    );
}
