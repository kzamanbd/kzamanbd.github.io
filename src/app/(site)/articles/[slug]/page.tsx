import ArticleCard from '@/components/articles/article-card';
import ArticleMeta from '@/components/articles/article-meta';
import ArticlePager from '@/components/articles/article-pager';
import ImageLightbox from '@/components/articles/image-lightbox';
import MobileTableOfContents from '@/components/articles/mobile-table-of-contents';
import ReadingProgress from '@/components/articles/reading-progress';
import ShareMenu from '@/components/articles/share-menu';
import SyncPageGradient from '@/components/backgrounds/page-gradient/sync-page-gradient';
import ArticleContent from '@/components/articles/article-content';
import ArticleCover from '@/components/articles/article-cover';
import Comments from '@/components/articles/comments';
import SeriesNav from '@/components/articles/series-nav';
import TableOfContents from '@/components/articles/table-of-contents';
import TagLink from '@/components/articles/tag-link';
import TechStack from '@/components/articles/tech-stack';
import WhatYoullLearn from '@/components/articles/what-youll-learn';
import SpotlightList from '@/components/common/spotlight-list';
import Breadcrumb from '@/components/layout/breadcrumb';
import { jetBrainsMono } from '@/config/mono-font';
import {
    getAdjacentArticles,
    getAllArticles,
    getArticle,
    getRelatedArticles,
    getSeriesForArticle
} from '@/lib/posts';
import { siteURL } from '@/lib/metadata';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/utils/article-json-ld';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

/** Prerender every published article at build time. */
export function generateStaticParams() {
    return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) return {};

    const url = `${siteURL}/articles/${slug}`;

    return {
        title: article.title,
        description: article.description,
        keywords: [...article.tags, ...article.tech],
        alternates: { canonical: url },
        openGraph: {
            title: article.title,
            description: article.description,
            url,
            type: 'article',
            publishedTime: article.date,
            modifiedTime: article.updated ?? article.date,
            tags: article.tags
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.description
        }
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) notFound();

    const series = getSeriesForArticle(slug);
    const related = getRelatedArticles(slug);
    const { previous, next } = getAdjacentArticles(slug);

    const trail = [
        { label: 'Home', href: '/' },
        { label: 'Articles', href: '/articles' },
        { label: article.title, href: `/articles/${slug}` }
    ];

    return (
        <main className="px-4 pt-28 pb-16">
            {/* The page wash and the progress bar both take the article's own
                cover colours, so the whole route reads as one accent. */}
            <SyncPageGradient colors={article.coverColors} />
            <ReadingProgress accentColors={article.coverColors} />
            <ImageLightbox />

            {/* Structured data for the post itself and for the breadcrumb trail. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(buildArticleJsonLd(article))
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(buildBreadcrumbJsonLd(trail))
                }}
            />

            {/* The monospace face is scoped to this route by applying its
                variable here, so it never ships with the home page. */}
            <div className={`${jetBrainsMono.variable} container mx-auto max-w-6xl`}>
                <Breadcrumb trail={trail} />

                <header className="mt-6 max-w-3xl">
                    <h1 className="text-foreground text-3xl font-bold text-balance sm:text-4xl">
                        {article.title}
                    </h1>

                    <ArticleMeta article={article} className="mt-4" />

                    <p className="text-foreground/70 mt-4 text-lg leading-relaxed">
                        {article.description}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        {article.tags.length > 0 && (
                            <ul className="flex flex-wrap gap-2">
                                {article.tags.map((tag) => (
                                    <TagLink key={tag} tag={tag} />
                                ))}
                            </ul>
                        )}

                        <ShareMenu
                            title={article.title}
                            description={article.description}
                            accentColors={article.coverColors}
                        />
                    </div>
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

                        {/* Below `lg` the sticky aside is hidden, so the TOC
                            rides above the body instead of beside it. */}
                        <MobileTableOfContents items={article.toc} />

                        <ArticleContent html={article.html} />

                        <ArticlePager previous={previous} next={next} />
                    </div>

                    <aside className="space-y-8">
                        <TableOfContents items={article.toc} />
                        {series && <SeriesNav series={series} />}
                    </aside>
                </div>

                <Comments />

                {related.length > 0 && (
                    <section className="border-foreground/10 mt-20 border-t pt-12">
                        <h2 className="text-foreground text-2xl font-bold">Related reading</h2>
                        <SpotlightList className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((item) => (
                                <ArticleCard key={item.slug} article={item} />
                            ))}
                        </SpotlightList>
                    </section>
                )}
            </div>
        </main>
    );
}
