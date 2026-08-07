import CatalogCard, { type CatalogSection } from '@/components/common/catalog-card';
import SpotlightList from '@/components/common/spotlight-list';

/**
 * Bento grid used by /now. Wide sections span two columns; cards
 * stretch to fill their cell, so a row has no gaps even when its cards hold
 * different amounts of content. `grid-flow-row-dense` backfills the slot a wide
 * card would otherwise leave open at the end of a row.
 */
export default function CatalogGrid({ sections }: { sections: CatalogSection[] }) {
    return (
        <SpotlightList className="grid grid-flow-row-dense gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
                <CatalogCard key={section.title} section={section} index={index} />
            ))}
        </SpotlightList>
    );
}
