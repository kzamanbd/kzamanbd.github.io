'use client';

import { useCallback, useRef } from 'react';

/**
 * Inserts a snippet at the caret in the body textarea, replacing whatever is
 * selected, then restores focus with the caret after the inserted text. Falls
 * back to appending when the textarea has never been focused, so the guide's
 * insert buttons always do something.
 */
export function useMarkdownInsertion(body: string, onChange: (body: string) => void) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertSnippet = useCallback(
        (snippet: string) => {
            const textarea = textareaRef.current;
            if (!textarea) {
                onChange(body ? `${body}\n\n${snippet}` : snippet);
                return;
            }

            const { selectionStart, selectionEnd } = textarea;
            const before = body.slice(0, selectionStart);
            const after = body.slice(selectionEnd);
            // Keep a blank line between the snippet and surrounding prose, which
            // is what every block-level markdown feature needs to parse.
            const prefix =
                before && !before.endsWith('\n\n') ? (before.endsWith('\n') ? '\n' : '\n\n') : '';
            const suffix =
                after && !after.startsWith('\n\n') ? (after.startsWith('\n') ? '\n' : '\n\n') : '';
            const insertion = `${prefix}${snippet}${suffix}`;

            onChange(`${before}${insertion}${after}`);

            const caret = before.length + insertion.length;
            requestAnimationFrame(() => {
                textarea.focus();
                textarea.setSelectionRange(caret, caret);
            });
        },
        [body, onChange]
    );

    return { textareaRef, insertSnippet };
}
