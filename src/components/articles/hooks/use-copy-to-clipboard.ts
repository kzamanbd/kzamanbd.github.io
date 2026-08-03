'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copies text and reports a short-lived `copied` flag, so a button can confirm
 * the action inline instead of firing a toast. The timer is cleared on unmount
 * and on a repeat copy, so the confirmation never outlives the component or
 * flickers when the reader clicks twice.
 */
export function useCopyToClipboard(resetAfterMs = 2000): [boolean, (text: string) => void] {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        },
        []
    );

    const copy = useCallback(
        (text: string) => {
            void (async () => {
                try {
                    await navigator.clipboard.writeText(text);
                } catch {
                    // Clipboard access was denied (an insecure origin, or the
                    // reader declined). Leave the label unchanged rather than
                    // claiming a copy that did not happen.
                    return;
                }

                setCopied(true);
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                timerRef.current = setTimeout(() => setCopied(false), resetAfterMs);
            })();
        },
        [resetAfterMs]
    );

    return [copied, copy];
}
