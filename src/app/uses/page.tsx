import { usesMeta, usesSections } from '@/app/uses/contents';
import CatalogGrid from '@/components/common/catalog-grid';
import SectionHeading from '@/components/common/section-heading';
import Breadcrumb from '@/components/layout/breadcrumb';
import { authorName, siteURL } from '@/lib/metadata';
import type { Metadata } from 'next';

const description = `The hardware, editors, languages and services ${authorName} works in every day.`;

export const metadata: Metadata = {
    title: 'Uses',
    description,
    alternates: { canonical: `${siteURL}/uses` },
    openGraph: { title: 'Uses', description, url: `${siteURL}/uses`, type: 'profile' }
};

export default function UsesPage() {
    return (
        <main className="container mx-auto px-4 pt-28 pb-20">
            <Breadcrumb
                trail={[
                    { label: 'Home', href: '/' },
                    { label: 'Uses', href: '/uses' }
                ]}
            />

            <SectionHeading as="h1" className="mt-6">
                {usesMeta.title}
            </SectionHeading>
            <p className="text-foreground/70 mt-6 max-w-3xl text-lg leading-relaxed">
                {usesMeta.subtitle}
            </p>

            <div className="mt-12">
                <CatalogGrid sections={usesSections} />
            </div>
        </main>
    );
}
