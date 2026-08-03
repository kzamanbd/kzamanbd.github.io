'use client';

import { useCloseOnEscape } from '@/components/layout/hooks/use-close-on-escape';
import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface OpenImage {
    src: string;
    alt: string;
}

/**
 * Opens any image inside the article body full-screen when it is clicked, so a
 * diagram or screenshot can be read at its real size without leaving the page.
 *
 * It attaches one delegated listener to the document rather than wrapping each
 * image, because the body arrives as an HTML string from the markdown pipeline
 * and has no React elements to wrap. The images are also given a zoom cursor, so
 * the affordance is visible before the click.
 */
export default function ImageLightbox() {
    const [image, setImage] = useState<OpenImage | null>(null);
    const close = useCallback(() => setImage(null), []);

    useCloseOnEscape(image !== null, close);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target;
            if (!(target instanceof HTMLImageElement)) {
                return;
            }
            // Only body images: the cover, avatars and icons elsewhere on the
            // page are not part of the reading surface.
            if (!target.closest('article')) {
                return;
            }
            // A linked image keeps its link; the reader asked for the target.
            if (target.closest('a')) {
                return;
            }

            event.preventDefault();
            setImage({ src: target.currentSrc || target.src, alt: target.alt });
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        const images = document.querySelectorAll<HTMLImageElement>('article img');
        images.forEach((element) => {
            element.style.cursor = 'zoom-in';
        });
    }, []);

    // Hold the page still behind the overlay, restoring whatever overflow the
    // document already had rather than assuming it was the default.
    useEffect(() => {
        if (!image) {
            return;
        }
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [image]);

    if (!image) {
        return null;
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={image.alt || 'Expanded image'}
            onClick={close}
            className="bg-background/90 fixed inset-0 z-[70] flex cursor-zoom-out items-center justify-center p-4 backdrop-blur-sm print:hidden">
            <button
                type="button"
                onClick={close}
                aria-label="Close image"
                className="focus-ring border-foreground/15 bg-background/70 text-foreground/70 hover:text-foreground absolute top-4 right-4 flex size-10 items-center justify-center rounded-full border transition-colors">
                <X aria-hidden="true" className="size-5" />
            </button>

            {/* Plain <img>: the source is whatever the markdown pipeline emitted,
                including remote and generated files, so it cannot go through the
                image optimiser's known-dimensions contract. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={image.src}
                alt={image.alt}
                className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            />
        </div>
    );
}
