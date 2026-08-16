'use client';

import { useRouteProgress } from '@/components/layout/hooks/use-route-progress';
import styles from '@/components/layout/route-progress.module.css';

/**
 * A thin bar across the top of the viewport that fills while a page navigation
 * is in flight, so a click on a link is acknowledged even when the next route
 * takes a moment to arrive. It lives in the root layout, above the floating
 * chrome, and is hidden from assistive tech: Next announces the route change
 * itself, and a second, indeterminate announcement would only add noise.
 */
export default function RouteProgress() {
    const { value, active } = useRouteProgress();

    return (
        <div aria-hidden="true" className={styles.track} data-active={active || undefined}>
            <div className={styles.bar} style={{ transform: `scaleX(${value})` }} />
        </div>
    );
}
