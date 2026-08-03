import ArticleCard from '@/components/articles/article-card';
import SectionHeading from '@/components/common/section-heading';
import SpotlightList from '@/components/common/spotlight-list';
import Breadcrumb from '@/components/layout/breadcrumb';
import { getAllArticles } from '@/lib/posts';
import { siteURL } from '@/lib/metadata';
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

export default function ArticlesPage() {
    const articles = getAllArticles();

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

                {articles.length === 0 ? (
                    <p className="text-foreground/60 mt-16">
                        No articles published yet. Check back soon.
                    </p>
                ) : (
                    <SpotlightList className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article, index) => (
                            <ArticleCard
                                key={article.slug}
                                article={article}
                                priority={index < 3}
                            />
                        ))}
                    </SpotlightList>
                )}
            </div>
        </main>
    );
}
