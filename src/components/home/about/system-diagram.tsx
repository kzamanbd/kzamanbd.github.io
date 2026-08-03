'use client';

import { useSpotlightSurfaces } from '@/components/common/hooks/use-spotlight-surfaces';
import { facets } from '@/components/home/about/contents';
import Core from '@/components/home/about/core';
import FacetCard from '@/components/home/about/facet-card';
import { useDrawOnScroll } from '@/components/home/about/hooks/use-draw-on-scroll';

/**
 * The wide-screen view of the about section: the portrait at the centre with
 * four facet cards wired to it by connector lines that draw themselves in as
 * the section scrolls into view.
 */
export default function SystemDiagram() {
    const { ref, state } = useDrawOnScroll<HTMLDivElement>();
    // The diagram grid doubles as the spotlight group for the cards placed
    // around it, so it shares the draw-on-scroll ref rather than nesting a
    // wrapper that would break their grid placement.
    useSpotlightSurfaces(ref);
    const collapsed = state === 'collapsed';

    return (
        <div
            ref={ref}
            className="relative mx-auto hidden w-full max-w-4xl lg:grid lg:min-h-[30rem] lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-[1fr_auto_1fr] lg:place-items-center lg:gap-x-10">
            {/* Connector lines from the core to each facet. `preserveAspectRatio="none"`
                maps the coordinates to percentages of the box, and non-scaling-stroke
                keeps the line weight constant however the box is stretched. */}
            <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 hidden size-full lg:block">
                {facets.map((facet, index) => (
                    <path
                        key={facet.title}
                        d={`M50 50 L${facet.line.x} ${facet.line.y}`}
                        fill="none"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        pathLength={1}
                        strokeDasharray={1}
                        opacity={0.55}
                        style={{
                            stroke: facet.accent,
                            strokeDashoffset: collapsed ? 1 : 0,
                            transition:
                                state === 'static'
                                    ? 'none'
                                    : `stroke-dashoffset 900ms ease ${index * 160}ms`
                        }}
                    />
                ))}
            </svg>

            <Core />

            {facets.map((facet) => (
                <FacetCard key={facet.title} facet={facet} />
            ))}
        </div>
    );
}
