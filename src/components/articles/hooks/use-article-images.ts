'use client';

import { useCallback, useEffect, useState } from 'react';

export interface ArticleImage {
    src: string;
    alt: string;
}

/**
 * Collects every image in the article body and reports which one the lightbox is
 * showing, so the overlay can step between them instead of being a dead end.
 *
 * The body arrives as an HTML string from the markdown pipeline, so there are no
 * React elements to attach a handler to: one delegated listener on the document
 * covers every image, however many the article has, and keeps working if a
 * diagram renders an image in later.
 *
 * The list is read at open time rather than on mount, because a mermaid or flow
 * diagram can add nodes to the body after hydration — a list captured on mount
 * would be missing them.
 */
export function useArticleImages() {
    const [images, setImages] = useState<ArticleImage[]>([]);
    const [index, setIndex] = useState<number | null>(null);

    const close = useCallback(() => setIndex(null), []);

    const step = useCallback(
        (delta: number) => {
            setIndex((current) => {
                if (current === null || images.length === 0) return current;
                // Wraps, so the last image's "next" returns to the first rather
                // than dead-ending on a disabled button.
                return (current + delta + images.length) % images.length;
            });
        },
        [images.length]
    );

    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const target = event.target;
            if (!(target instanceof HTMLImageElement)) return;
            // Only body images: the cover, avatars and icons elsewhere on the
            // page are not part of the reading surface.
            const body = target.closest('article');
            if (!body) return;
            // A linked image keeps its link; the reader asked for the target.
            if (target.closest('a')) return;

            event.preventDefault();

            const all = [...body.querySelectorAll<HTMLImageElement>('img')];
            setImages(all.map((image) => ({ src: image.currentSrc || image.src, alt: image.alt })));
            setIndex(Math.max(0, all.indexOf(target)));
        };

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    // The zoom cursor is the affordance: without it there is nothing to suggest
    // an image can be opened at all.
    useEffect(() => {
        for (const image of document.querySelectorAll<HTMLImageElement>('article img')) {
            image.style.cursor = 'zoom-in';
        }
    }, []);

    return {
        images,
        index,
        current: index === null ? null : (images[index] ?? null),
        close,
        next: useCallback(() => step(1), [step]),
        previous: useCallback(() => step(-1), [step])
    };
}
