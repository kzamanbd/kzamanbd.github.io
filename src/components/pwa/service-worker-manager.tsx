'use client';

import { useServiceWorker } from '@/components/pwa/hooks/use-service-worker';
import UpdateToast from '@/components/pwa/update-toast';
import { useState } from 'react';

/**
 * Registers the service worker and renders the update toast when a newer build
 * is ready. Rendered only in production (see layout.tsx), since the worker is
 * disabled in development so it never fights Turbopack's hot reload. Thin by
 * design: registration, update detection and version polling live in the hook.
 */
export default function ServiceWorkerManager() {
    const { updateReady, applyUpdate } = useServiceWorker();
    const [dismissed, setDismissed] = useState(false);

    if (!updateReady || dismissed) return null;

    return <UpdateToast onReload={applyUpdate} onDismiss={() => setDismissed(true)} />;
}
