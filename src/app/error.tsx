'use client';

import GridBackground from '@/components/backgrounds/grid-background';
import SectionHeading from '@/components/common/section-heading';
import Button from '@/components/ui/button';
import ButtonLink from '@/components/ui/button-link';

// Client error boundary for runtime render errors. Echoes the hero's grid motif
// and reuses the shared button styling so the error surface reads as part of the
// site. The error object itself is deliberately not shown: it can carry internal
// detail, and a visitor can do nothing with it.
export default function Error({ reset }: { error: Error; reset: () => void }) {
    return (
        <main className="relative isolate flex min-h-[70vh] grow flex-col items-center justify-center overflow-hidden px-4 py-28 text-center sm:py-36">
            <GridBackground className="opacity-60" />

            <SectionHeading as="h1">Something went wrong</SectionHeading>
            <p className="text-foreground/70 mt-4 max-w-xl text-lg leading-relaxed text-balance">
                An unexpected error interrupted this page. You can try again, or head back home.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button variant="outline" onClick={reset}>
                    Try again
                </Button>
                <ButtonLink href="/">Back home</ButtonLink>
            </div>
        </main>
    );
}
