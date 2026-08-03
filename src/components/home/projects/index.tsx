import SectionHeading from '@/components/common/section-heading';
import {
    collapsedShippedProjectCount,
    personalProjects,
    shippedProjects
} from '@/components/home/projects/contents';
import MoreProjects from '@/components/home/projects/more-projects';
import ProjectGrid from '@/components/home/projects/project-grid';
import ResumeBridge from '@/components/home/projects/resume-bridge';

export default function ProjectsArea() {
    const visibleShipped = shippedProjects.slice(0, collapsedShippedProjectCount);
    const hiddenShipped = shippedProjects.slice(collapsedShippedProjectCount);

    return (
        <section id="work" className="relative px-4 py-24">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 flex flex-col items-center text-center">
                    <SectionHeading className="text-foreground">Open Source</SectionHeading>
                    <p className="text-foreground/60 mt-4 max-w-2xl text-lg">
                        Tools, plugins, and experiments I build in the open.
                    </p>
                </div>

                <div className="space-y-6">
                    <h3 className="text-foreground/60 text-center text-sm font-bold tracking-wider uppercase">
                        Shipped &amp; Published
                    </h3>
                    <ProjectGrid projects={visibleShipped} />
                    {hiddenShipped.length > 0 && (
                        <MoreProjects>
                            <ProjectGrid
                                projects={hiddenShipped}
                                indexOffset={visibleShipped.length}
                            />
                        </MoreProjects>
                    )}
                </div>

                <div className="mt-14 space-y-6">
                    <h3 className="text-foreground/60 text-center text-sm font-bold tracking-wider uppercase">
                        Personal Projects
                    </h3>
                    <ProjectGrid projects={personalProjects} indexOffset={shippedProjects.length} />
                </div>

                <ResumeBridge />
            </div>
        </section>
    );
}
