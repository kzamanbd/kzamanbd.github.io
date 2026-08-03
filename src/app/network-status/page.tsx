import GridBackground from '@/components/backgrounds/grid-background';
import NetworkStatus from '@/components/pwa/network-status';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Network status',
    description: 'Check whether this device currently has a working connection.',
    // A diagnostic page has nothing to offer search results.
    robots: { index: false, follow: false }
};

export default function NetworkStatusPage() {
    return (
        <main className="relative isolate flex min-h-[70vh] grow flex-col items-center justify-center overflow-hidden px-4 py-28 sm:py-36">
            <GridBackground className="opacity-60" />
            <NetworkStatus />
        </main>
    );
}
