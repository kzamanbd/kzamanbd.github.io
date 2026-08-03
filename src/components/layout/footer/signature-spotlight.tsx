'use client';

import Wordmark from '@/components/icons/wordmark';
import BinaryReveal from '@/components/layout/footer/binary-reveal';
import { usePointerSpotlight } from '@/components/layout/footer/hooks/use-pointer-spotlight';
import styles from '@/components/layout/footer/signature-spotlight.module.css';
import { cn } from '@/utils/cn';
import { useRef } from 'react';

/**
 * The footer signature: a dim solid wordmark that, within a soft circle
 * following the pointer, resolves into a field of binary 0/1 digits shaped to
 * the letters. The binary layer (BinaryReveal) is masked to that circle and
 * stacked over the solid base in one grid cell, so the two stay aligned at any
 * width; away from the pointer only the solid wordmark shows.
 */
export default function SignatureSpotlight() {
    const revealRef = useRef<HTMLDivElement>(null);
    usePointerSpotlight(revealRef);

    return (
        // The signature keeps its exact box; nothing here is sized for the glow.
        // usePointerSpotlight measures the pointer's proximity to revealRef and
        // drives the reveal's opacity + spotlight position from it, so the binary
        // wakes as the cursor nears the letters from the top, left, or right,
        // without any layout change to the signature.
        <div className={cn(styles.spotlight, 'relative isolate grid w-full')}>
            <Wordmark
                aria-hidden="true"
                className="text-neutral-300 [grid-area:1/1] dark:text-neutral-900"
            />
            <BinaryReveal revealRef={revealRef} />
        </div>
    );
}
