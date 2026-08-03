'use client';

import { useDisclosure } from '@/components/layout/hooks/use-disclosure';
import Button from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

const revealRegionId = 'more-shipped-projects';

/**
 * Holds the tail of the shipped grid behind a "Show more" toggle so the section
 * opens short. The hidden cards stay in the DOM (plain `hidden`, not
 * unmounted), so they still render into the HTML and stay reachable by crawlers
 * and by in-page find.
 *
 * Renders as two siblings with no margins of their own: the parent group's
 * `space-y-6` spaces them, and a `hidden` child generates no box, so the gap
 * stays correct in both states.
 */
export default function MoreProjects({ children }: { children: ReactNode }) {
    const { open, toggle } = useDisclosure();

    return (
        <>
            <div id={revealRegionId} hidden={!open}>
                {children}
            </div>

            <div className="text-center">
                <Button
                    variant="outline"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls={revealRegionId}>
                    {open ? 'Show less' : 'Show more'}
                    <ChevronDown
                        aria-hidden="true"
                        className={cn(
                            'size-4 transition-transform duration-300',
                            open && 'rotate-180'
                        )}
                    />
                </Button>
            </div>
        </>
    );
}
