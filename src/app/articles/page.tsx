import ArticleCard from '@/components/articles/article-card';
import Pagination from '@/components/articles/pagination';
import TagFilter from '@/components/articles/tag-filter';
import SectionHeading from '@/components/common/section-heading';
import SpotlightList from '@/components/common/spotlight-list';
import Breadcrumb from '@/components/layout/breadcrumb';
import { siteURL } from '@/lib/metadata';
import { ARTICLES_PER_PAGE, getAllArticles, getAllTags } from '@/lib/posts';
import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Articles';
const description =
    'Notes on backend architecture, performance work, and the WordPress and Laravel systems I build.';

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteURL}/articles`,
        types: {
            'application/rss+xml': `${siteURL}/feed.xml`,
            'application/atom+xml': `${siteURL}/atom.xml`,
            'application/feed+json': `${siteURL}/feed.json`
        }
    },
    openGraph: {
        title,
        description,
        url: `${siteURL}/articles`,
        type: 'website'
    }
};

interface PageProps {
    searchParams: Promise<{ tag?: string; page?: string }>;
}

/** The requested page number, clamped into the range the archive actually has. */
function resolvePage(raw: string | undefined, totalPages: number): number {
    const parsed = Number.parseInt(raw ?? '1', 10);
    if (Number.isNaN(parsed)) {
        return 1;
    }
    return Math.min(Math.max(parsed, 1), Math.max(totalPages, 1));
}

export default async function ArticlesPage({ searchParams }: PageProps) {
    const { tag, page: rawPage } = await searchParams;

    const allArticles = getAllArticles();
    const tags = getAllTags();
    // An unknown tag filters to nothing rather than silently showing everything,
    // so a stale link reads as an empty result instead of a wrong one.
    const activeTag = tag && tags.includes(tag) ? tag : null;
    const filtered = activeTag
        ? allArticles.filter((article) => article.tags.includes(activeTag))
        : allArticles;

    const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE));
    const currentPage = resolvePage(rawPage, totalPages);
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    const articles = filtered.slice(start, start + ARTICLES_PER_PAGE);

    const buildHref = (pageNumber: number) => {
        const params = new URLSearchParams();
        if (activeTag) {
            params.set('tag', activeTag);
        }
        if (pageNumber > 1) {
            params.set('page', String(pageNumber));
        }
        const query = params.toString();
        return query ? `/articles?${query}` : '/articles';
    };

    return (
        <main className="px-4 pt-28 pb-16">
            <div className="container mx-auto max-w-6xl">
                <Breadcrumb
                    trail={[
                        { label: 'Home', href: '/' },
                        { label: 'Articles', href: '/articles' }
                    ]}
                />

                <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <SectionHeading as="h1" className="text-foreground">
                            {title}
                        </SectionHeading>
                        <p className="text-foreground/60 mt-3 max-w-2xl text-lg">{description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                        <Link
                            href="/articles/search"
                            className="focus-ring text-foreground/70 hover:text-foreground rounded-sm transition-colors">
                            Search
                        </Link>
                        <a
                            href="/feed.xml"
                            className="focus-ring text-foreground/70 hover:text-foreground rounded-sm transition-colors">
                            RSS
                        </a>
                    </div>
                </div>

                {tags.length > 0 && (
                    <div className="mt-8">
                        <TagFilter tags={tags} activeTag={activeTag} />
                    </div>
                )}

                {articles.length === 0 ? (
                    <p className="text-foreground/60 mt-16">
                        {activeTag
                            ? `Nothing tagged "${activeTag}" yet.`
                            : 'No articles published yet. Check back soon.'}
                    </p>
                ) : (
                    <>
                        <SpotlightList className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article, index) => (
                                <ArticleCard
                                    key={article.slug}
                                    article={article}
                                    priority={index < 3}
                                />
                            ))}
                        </SpotlightList>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            buildHref={buildHref}
                        />
                    </>
                )}
            </div>
        </main>
    );
}
