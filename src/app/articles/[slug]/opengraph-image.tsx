import { getAllArticles, getArticle } from '@/lib/posts';
import { ImageResponse } from 'next/og';

export const alt = 'Article cover';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Prerender one OG image per published article, alongside the article pages. */
export function generateStaticParams() {
    return getAllArticles().map((article) => ({ slug: article.slug }));
}

/**
 * The social card for an article, rasterised from the same deterministic gradient
 * the on-page cover paints in CSS. Generating it here rather than committing PNGs
 * means adding an article needs no build script and no generated asset.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    const [from, to] = article?.coverColors ?? ['#4f46e5', '#7c3aed'];
    const title = article?.title ?? 'Article';
    const tag = article?.tags[0];

    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '90px',
                backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
                color: '#ffffff',
                fontFamily: 'sans-serif'
            }}>
            {tag && (
                <div
                    style={{
                        fontSize: 30,
                        fontWeight: 600,
                        letterSpacing: 2,
                        opacity: 0.85,
                        textTransform: 'uppercase'
                    }}>
                    {tag}
                </div>
            )}
            <div
                style={{
                    marginTop: 24,
                    fontSize: 62,
                    fontWeight: 800,
                    lineHeight: 1.15,
                    // Satori has no multi-line clamp, so cap the box instead
                    // and let a very long title be cropped by overflow.
                    maxHeight: 340,
                    overflow: 'hidden'
                }}>
                {title}
            </div>
            <div
                style={{
                    marginTop: 'auto',
                    fontSize: 28,
                    fontWeight: 600,
                    opacity: 0.8
                }}>
                kzamanbd
            </div>
        </div>,
        size
    );
}
