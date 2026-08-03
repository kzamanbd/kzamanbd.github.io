import { useEffect } from 'react';

/** Invokes `onClose` when Escape is pressed while `active`. */
export function useCloseOnEscape(active: boolean, onClose: () => void) {
    useEffect(() => {
        if (!active) {
            return;
        }
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [active, onClose]);
}
