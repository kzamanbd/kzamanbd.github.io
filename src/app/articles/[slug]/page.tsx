import ArticleCard from '@/components/articles/article-card';
import ArticleContent from '@/components/articles/article-content';
import ArticleCover from '@/components/articles/article-cover';
import SeriesNav from '@/components/articles/series-nav';
import TableOfContents from '@/components/articles/table-of-contents';
import WhatYoullLearn from '@/components/articles/what-youll-learn';
import SpotlightList from '@/components/common/spotlight-list';
import Tag from '@/components/common/tag';
import Breadcrumb from '@/components/layout/breadcrumb';
import {
    getAdjacentArticles,
    getAllArticles,
    getArticle,
    getRelatedArticles,
    getSeriesForArticle
} from '@/lib/posts';
import { siteURL } from '@/lib/metadata';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/utils/article-json-ld';
import { formatArticleDate } from '@/utils/format-date';
import type { Metadata } from 'next';
import Link from 'next/link';
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

            <div className="container mx-auto max-w-6xl">
                <Breadcrumb trail={trail} />

                <header className="mt-6 max-w-3xl">
                    <h1 className="text-foreground text-3xl font-bold text-balance sm:text-4xl">
                        {article.title}
                    </h1>

                    <div className="text-foreground/60 mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{article.readingMinutes} min read</span>
                        {article.difficulty && (
                            <>
                                <span aria-hidden="true">&middot;</span>
                                <span>{article.difficulty}</span>
                            </>
                        )}
                        {article.updated && (
                            <>
                                <span aria-hidden="true">&middot;</span>
                                <span>Updated {formatArticleDate(article.updated)}</span>
                            </>
                        )}
                    </div>

                    <p className="text-foreground/70 mt-4 text-lg leading-relaxed">
                        {article.description}
                    </p>

                    {article.tags.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                                <Tag key={tag} className="text-foreground/70 px-3 py-1 text-xs">
                                    {tag}
                                </Tag>
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

                        {article.tech.length > 0 && (
                            <div>
                                <h2 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">
                                    Built with
                                </h2>
                                <ul className="mt-3 flex flex-wrap gap-2">
                                    {article.tech.map((item) => (
                                        <Tag
                                            key={item}
                                            className="text-foreground/70 px-3 py-1 text-xs">
                                            {item}
                                        </Tag>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <ArticleContent html={article.html} />

                        {(previous || next) && (
                            <nav
                                aria-label="Adjacent articles"
                                className="border-foreground/10 grid gap-4 border-t pt-8 sm:grid-cols-2">
                                {previous && (
                                    <Link
                                        href={`/articles/${previous.slug}`}
                                        className="focus-ring border-foreground/10 hover:border-foreground/30 rounded-xl border p-4 transition-colors">
                                        <span className="text-foreground/50 text-xs">Previous</span>
                                        <span className="text-foreground mt-1 block font-semibold">
                                            {previous.title}
                                        </span>
                                    </Link>
                                )}
                                {next && (
                                    <Link
                                        href={`/articles/${next.slug}`}
                                        className="focus-ring border-foreground/10 hover:border-foreground/30 rounded-xl border p-4 text-right transition-colors sm:col-start-2">
                                        <span className="text-foreground/50 text-xs">Next</span>
                                        <span className="text-foreground mt-1 block font-semibold">
                                            {next.title}
                                        </span>
                                    </Link>
                                )}
                            </nav>
                        )}
                    </div>

                    <aside className="space-y-8">
                        <TableOfContents items={article.toc} />
                        {series && <SeriesNav series={series} />}
                    </aside>
                </div>

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
