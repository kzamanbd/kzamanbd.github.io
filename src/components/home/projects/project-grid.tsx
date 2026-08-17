import SpotlightList from '@/components/common/spotlight-list';
import type { Project } from '@/components/home/projects/contents';
import ProjectCard from '@/components/home/projects/project-card';

/**
 * A responsive project card grid. Each card's golden-angle glow hue comes from
 * its position in the list, so a project added to contents.ts is tinted
 * automatically.
 *
 * The list is a SpotlightList, which owns the one delegated pointer listener
 * driving every card's cursor spotlight; the cards themselves stay server
 * components.
 */
export default function ProjectGrid({ projects }: { projects: Project[] }) {
    return (
        <SpotlightList className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
                <ProjectCard key={project.repoURL} project={project} index={index} />
            ))}
        </SpotlightList>
    );
}
