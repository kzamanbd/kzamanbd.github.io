import ArticleCard from '@/components/articles/article-card';
import SectionHeading from '@/components/common/section-heading';
import SpotlightList from '@/components/common/spotlight-list';
import { getLatestArticles } from '@/lib/posts';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * Latest articles teaser on the home page. Renders nothing when there are no
 * published articles, so the section never appears as an empty shell.
 */
export default function ArticlesArea() {
    const articles = getLatestArticles(3);
    if (articles.length === 0) return null;

    return (
        <section id="articles" className="relative px-4 py-24">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <SectionHeading className="text-foreground">Latest Articles</SectionHeading>
                        <p className="text-foreground/60 mt-4 max-w-2xl text-lg">
                            Notes on the systems I build and the problems they threw at me.
                        </p>
                    </div>

                    <Link
                        href="/articles"
                        className="focus-ring text-foreground/70 hover:text-foreground group flex items-center gap-2 rounded-sm text-sm font-medium transition-colors">
                        All articles
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>

                <SpotlightList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </SpotlightList>
            </div>
        </section>
    );
}
