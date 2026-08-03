'use client';

import { SIGNATURE_PATH_D, SIGNATURE_VIEW_BOX } from '@/components/icons/wordmark';
import { generateBinaryField } from '@/components/layout/footer/binary-field';
import { useBinaryFlicker } from '@/components/layout/footer/hooks/use-binary-flicker';
import styles from '@/components/layout/footer/signature-spotlight.module.css';
import { cn } from '@/utils/cn';
import { RefObject, useRef } from 'react';

// An SVG of the signature path, inlined as a data URI, used to crop the digit
// grid to the letterforms (see .binaryLetters). Built from the shared path so it
// always matches the solid layer; preserveAspectRatio="none" lets it stretch to
// the layer's box via mask-size: 100% 100%.
const LETTERFORM_MASK = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${SIGNATURE_VIEW_BOX}' preserveAspectRatio='none'><path d='${SIGNATURE_PATH_D}' fill='#fff'/></svg>`
)}")`;

// Generated once at module load: identical on the server and first client
// render, so hydration stays stable. useBinaryFlicker mutates it afterwards.
const BINARY_FIELD = generateBinaryField();

/**
 * The signature's binary reveal layer: a field of 0/1 digits cropped to the
 * wordmark's letterforms, shown only inside the pointer spotlight (whose circle
 * mask and opacity live on the shared `revealRef`). Away from the pointer the
 * layer is invisible and the solid wordmark shows through; near it the letters
 * read as binary. usePointerSpotlight (in the parent) drives `revealRef`;
 * useBinaryFlicker keeps the digits quietly shifting while the reveal is shown.
 */
export default function BinaryReveal({
    revealRef
}: {
    revealRef: RefObject<HTMLDivElement | null>;
}) {
    const gridRef = useRef<HTMLPreElement>(null);
    useBinaryFlicker(gridRef, revealRef);

    return (
        <div
            ref={revealRef}
            aria-hidden="true"
            className={cn(styles.reveal, 'pointer-events-none relative [grid-area:1/1]')}>
            <div
                className={styles.binaryLetters}
                style={{ WebkitMaskImage: LETTERFORM_MASK, maskImage: LETTERFORM_MASK }}>
                <pre ref={gridRef} className={styles.binaryGrid}>
                    {BINARY_FIELD}
                </pre>
            </div>
        </div>
    );
}
