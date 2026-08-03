import SpotlightGroup from '@/components/common/spotlight-group';
import { facets } from '@/components/home/about/contents';
import Core from '@/components/home/about/core';
import FacetCard from '@/components/home/about/facet-card';

/**
 * The sub-lg view: the centred portrait over a 2x2 of glowing facet tiles. The
 * radial diagram needs width to read, so below lg the same content is stacked
 * instead of wired.
 */
export default function Bento() {
    return (
        <div className="flex flex-col items-center gap-8 lg:hidden">
            <Core />

            <SpotlightGroup className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                {facets.map((facet) => (
                    <FacetCard key={facet.title} facet={facet} persistent className="p-4" />
                ))}
            </SpotlightGroup>
        </div>
    );
}
