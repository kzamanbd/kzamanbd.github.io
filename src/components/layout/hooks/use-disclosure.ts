import { useCallback, useState } from 'react';

/** Open/close state for menus, dropdowns and dialogs. */
export function useDisclosure(initialOpen = false) {
    const [open, setOpen] = useState(initialOpen);
    const close = useCallback(() => setOpen(false), []);
    const show = useCallback(() => setOpen(true), []);
    const toggle = useCallback(() => setOpen((value) => !value), []);
    return { open, close, show, toggle };
}
