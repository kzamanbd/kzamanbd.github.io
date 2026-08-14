import ArticleSearch from '@/components/articles/article-search';
import SectionHeading from '@/components/common/section-heading';
import Breadcrumb from '@/components/layout/breadcrumb';
import { getAllArticles } from '@/lib/posts';
import { siteURL } from '@/lib/metadata';
import type { Metadata } from 'next';

const title = 'Search articles';
const description = 'Search every published article by title, tag or description.';

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: `${siteURL}/articles/search` },
    // A search box has nothing to index, and indexing it competes with the
    // article index for the same queries.
    robots: { index: false, follow: true }
};

export default function ArticleSearchPage() {
    return (
        <main className="px-4 pt-28 pb-16">
            <div className="container mx-auto max-w-6xl">
                <Breadcrumb
                    trail={[
                        { label: 'Home', href: '/' },
                        { label: 'Articles', href: '/articles' },
                        { label: 'Search', href: '/articles/search' }
                    ]}
                />

                <SectionHeading as="h1" className="text-foreground mt-6">
                    {title}
                </SectionHeading>
                <p className="text-foreground/60 mt-3 max-w-2xl text-lg">{description}</p>

                <div className="mt-10">
                    <ArticleSearch articles={getAllArticles()} />
                </div>
            </div>
        </main>
    );
}
