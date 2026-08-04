import { loadArticleForPreview } from '@/app/studio/article-editor/preview/[slug]/loader.dev';
import ArticleContent from '@/components/articles/article-content';
import ArticleCover from '@/components/articles/article-cover';
import ArticleMeta from '@/components/articles/article-meta';
import MobileTableOfContents from '@/components/articles/mobile-table-of-contents';
import ReadingProgress from '@/components/articles/reading-progress';
import TableOfContents from '@/components/articles/table-of-contents';
import TagLink from '@/components/articles/tag-link';
import TechStack from '@/components/articles/tech-stack';
import WhatYoullLearn from '@/components/articles/what-youll-learn';
import SyncPageGradient from '@/components/backgrounds/page-gradient/sync-page-gradient';
import ImageLightbox from '@/components/articles/image-lightbox';
import { jetBrainsMono } from '@/config/mono-font';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// A development-only route: `.dev.tsx` counts as a page only when
// `pageExtensions` includes it, which next.config.ts arranges outside
// production. Nothing here reaches the deployed site.
export const metadata: Metadata = {
    title: 'Article preview',
    robots: { index: false, follow: false }
};

/**
 * A draft rendered in the real article chrome.
 *
 * The editor's side-by-side pane already renders the body through the production
 * markdown pipeline, but a body is not a page: the cover, the metadata line, the
 * stack strip, the table of contents and the page wash are all things an author
 * can only judge at full width. This assembles them exactly as
 * `/articles/[slug]` does, from the same components, so what is checked here is
 * what ships.
 *
 * Comments, sharing, the pager and related posts are deliberately left out. They
 * depend on a published corpus a draft is not part of, and none of them is what
 * an author is proofreading.
 */
export default async function ArticlePreviewPage({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = await loadArticleForPreview(slug);
    if (!article) notFound();

    return (
        <main className="px-4 pt-28 pb-16">
            <SyncPageGradient colors={article.coverColors} />
            <ReadingProgress accentColors={article.coverColors} />
            <ImageLightbox />

            <div className={`${jetBrainsMono.variable} container mx-auto max-w-6xl`}>
                <div className="border-foreground/10 bg-background/50 mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 text-sm backdrop-blur-sm">
                    <p className="text-foreground/60">
                        Draft preview &mdash; not published, not indexed.
                    </p>
                    <Link
                        href="/studio/article-editor"
                        className="focus-ring text-foreground/70 hover:text-foreground rounded-sm font-medium underline underline-offset-4">
                        Back to the editor
                    </Link>
                </div>

                <header className="max-w-3xl">
                    <h1 className="text-foreground text-3xl font-bold text-balance sm:text-4xl">
                        {article.title}
                    </h1>

                    <ArticleMeta article={article} className="mt-4" />

                    <p className="text-foreground/70 mt-4 text-lg leading-relaxed">
                        {article.description}
                    </p>

                    {article.tags.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                                <TagLink key={tag} tag={tag} />
                            ))}
                        </ul>
                    )}
                </header>

                <div className="mt-10 overflow-hidden rounded-2xl">
                    <ArticleCover
                        slug={article.slug}
                        title={article.title}
                        tag={article.tags[0]}
                        cover={article.cover}
                        colors={article.coverColors}
                        priority
                    />
                </div>

                <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
                    <div className="min-w-0 space-y-8">
                        <WhatYoullLearn items={article.learn} />
                        <TechStack items={article.tech} />
                        <MobileTableOfContents items={article.toc} />
                        <ArticleContent html={article.html} />
                    </div>

                    <aside className="space-y-8">
                        <TableOfContents items={article.toc} />
                    </aside>
                </div>
            </div>
        </main>
    );
}
