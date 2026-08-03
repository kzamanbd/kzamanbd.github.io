import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Invokes `onClose` whenever the route (pathname) changes. */
export function useCloseOnRouteChange(onClose: () => void) {
    const pathname = usePathname();
    useEffect(() => {
        onClose();
    }, [pathname, onClose]);
}
