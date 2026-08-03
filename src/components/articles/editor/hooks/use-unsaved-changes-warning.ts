'use client';

import { useEffect } from 'react';

/**
 * Asks the browser to confirm before leaving with unsaved edits. The editor
 * writes real files, so a closed tab is the one way to lose work it cannot
 * recover.
 */
export function useUnsavedChangesWarning(isDirty: boolean) {
    useEffect(() => {
        if (!isDirty) {
            return;
        }

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            // Browsers ignore custom text now, but returning a value is still
            // what triggers the native prompt.
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);
}
