import { RefObject, useEffect } from 'react';

/**
 * Invokes `onClose` when a pointer press lands outside `ref` while `active`.
 * The listener is attached only while active, so the same press that opens the
 * menu cannot immediately close it again.
 */
export function useCloseOnClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    active: boolean,
    onClose: () => void
) {
    useEffect(() => {
        if (!active) {
            return;
        }
        const onPointerDown = (event: PointerEvent) => {
            const element = ref.current;
            if (element && !element.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('pointerdown', onPointerDown);
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [ref, active, onClose]);
}
