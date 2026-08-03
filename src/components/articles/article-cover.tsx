import { cn } from '@/utils/cn';
import Image from 'next/image';

interface ArticleCoverProps {
    slug: string;
    title: string;
    /** First tag, shown as an eyebrow on the generated cover. */
    tag?: string;
    /** Author-provided image path; when absent the gradient cover is drawn. */
    cover?: string;
    colors: readonly [string, string];
    className?: string;
    priority?: boolean;
}

/**
 * An article's thumbnail. When the article ships a `cover:` image that is used;
 * otherwise the cover is drawn in CSS from the slug's deterministic gradient
 * pair, so it needs no generated asset and matches the OpenGraph PNG that
 * `opengraph-image.tsx` builds from the same colours.
 */
export default function ArticleCover({
    slug,
    title,
    tag,
    cover,
    colors,
    className,
    priority = false
}: ArticleCoverProps) {
    if (cover) {
        return (
            <Image
                src={cover}
                alt={title}
                width={1200}
                height={630}
                priority={priority}
                className={cn('aspect-[1200/630] w-full object-cover', className)}
            />
        );
    }

    const [from, to] = colors;

    return (
        <div
            aria-label={title}
            role="img"
            className={cn(
                'relative flex aspect-[1200/630] w-full flex-col justify-center overflow-hidden p-6 sm:p-8',
                className
            )}
            style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}>
            {/* Soft corner glow, matching the OpenGraph image. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 78% 18%, rgba(255,255,255,0.22), transparent 60%)'
                }}
            />
            {tag && (
                <p className="relative text-[0.65rem] font-semibold tracking-[0.2em] text-white/85 uppercase sm:text-xs">
                    {tag}
                </p>
            )}
            <p className="relative mt-2 line-clamp-4 text-lg font-extrabold text-balance text-white sm:text-2xl">
                {title}
            </p>
            <p className="relative mt-auto text-xs font-semibold text-white/80">
                {slug ? 'kzamanbd' : ''}
            </p>
        </div>
    );
}
