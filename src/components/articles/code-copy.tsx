'use client';

import { useEffect } from 'react';

/**
 * Fills every `[data-code-copy]` slot the markdown renderer emitted with a real
 * copy button, and wires one delegated click listener for all of them.
 *
 * The buttons are created here rather than in the server HTML because the article
 * body is injected with `dangerouslySetInnerHTML`: React does not own those
 * nodes, so it cannot render interactive children into them. Building the button
 * on mount also means a visitor with JavaScript off never sees a control that
 * would not work.
 */
export default function CodeCopy({
    containerRef
}: {
    containerRef: React.RefObject<HTMLElement | null>;
}) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        if (!navigator.clipboard) return;

        const slots = container.querySelectorAll<HTMLElement>('[data-code-copy]');
        for (const slot of slots) {
            if (slot.querySelector('button')) continue;
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'code-block__copy-button';
            button.textContent = 'Copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            slot.append(button);
        }

        let resetTimer: ReturnType<typeof setTimeout> | undefined;

        const onClick = async (event: MouseEvent) => {
            const target = event.target as Element | null;
            const button = target?.closest<HTMLButtonElement>('.code-block__copy-button');
            if (!button) return;

            const figure = button.closest('.code-block');
            const code = figure?.querySelector('pre')?.textContent ?? '';
            if (!code) return;

            try {
                await navigator.clipboard.writeText(code);
                button.textContent = 'Copied';
            } catch {
                button.textContent = 'Failed';
            }
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        };

        container.addEventListener('click', onClick);
        return () => {
            container.removeEventListener('click', onClick);
            clearTimeout(resetTimer);
        };
    }, [containerRef]);

    return null;
}
