import { nowMeta, nowQuote, nowSections } from '@/app/now/contents';
import CatalogGrid from '@/components/common/catalog-grid';
import SectionHeading from '@/components/common/section-heading';
import Breadcrumb from '@/components/layout/breadcrumb';
import { authorName, siteURL } from '@/lib/metadata';
import type { Metadata } from 'next';

const description = `What ${authorName} is focused on right now: current work, what he is building and learning, and what he is aiming at next.`;

export const metadata: Metadata = {
    title: 'Now',
    description,
    alternates: { canonical: `${siteURL}/now` },
    openGraph: { title: 'Now', description, url: `${siteURL}/now`, type: 'profile' }
};

export default function NowPage() {
    return (
        <main className="container mx-auto px-4 pt-28 pb-20">
            <Breadcrumb
                trail={[
                    { label: 'Home', href: '/' },
                    { label: 'Now', href: '/now' }
                ]}
            />

            <SectionHeading as="h1" className="mt-6">
                {nowMeta.title}
            </SectionHeading>
            <p className="text-foreground/70 mt-6 max-w-3xl text-lg leading-relaxed">
                {nowMeta.subtitle}
            </p>

            <p className="border-foreground/10 text-foreground/70 mt-6 inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-3 text-sm">
                <span aria-hidden="true" className="relative grid size-2 place-items-center">
                    <span className="absolute size-2 rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
                    <span className="size-2 rounded-full bg-emerald-500" />
                </span>
                Last updated
                <time className="text-foreground/85 font-semibold">{nowMeta.lastUpdated}</time>
            </p>

            <div className="mt-12">
                <CatalogGrid sections={nowSections} />
            </div>

            <blockquote className="text-foreground/80 mt-16 border-l-4 border-emerald-500 pl-6 text-xl font-semibold italic">
                {nowQuote}
            </blockquote>
        </main>
    );
}
