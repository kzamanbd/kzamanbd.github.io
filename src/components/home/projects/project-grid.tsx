import SpotlightList from '@/components/common/spotlight-list';
import type { Project } from '@/components/home/projects/contents';
import ProjectCard from '@/components/home/projects/project-card';

/**
 * A responsive project card grid. `indexOffset` keeps each card's golden-angle
 * glow hue distinct across the several grids on the page.
 *
 * The list is a SpotlightList, which owns the one delegated pointer listener
 * driving every card's cursor spotlight; the cards themselves stay server
 * components.
 */
export default function ProjectGrid({
    projects,
    indexOffset = 0
}: {
    projects: Project[];
    indexOffset?: number;
}) {
    return (
        <SpotlightList className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
                <ProjectCard key={project.repoURL} project={project} index={indexOffset + index} />
            ))}
        </SpotlightList>
    );
}
