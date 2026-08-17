import SectionHeading from '@/components/common/section-heading';
import SpotlightList from '@/components/common/spotlight-list';
import { contributions, projects } from '@/components/home/projects/contents';
import ContributionCard from '@/components/home/projects/contribution-card';
import ProjectGrid from '@/components/home/projects/project-grid';
import ResumeBridge from '@/components/home/projects/resume-bridge';

/**
 * Contributions lead, then my own projects. A change merged into somebody
 * else's repository is the harder claim to make and the easier one to verify,
 * so it goes first and gets the full width; the projects follow in the grid.
 */
export default function ProjectsArea() {
    return (
        <section id="work" className="relative px-4 py-24">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 flex flex-col items-center text-center">
                    <SectionHeading className="text-foreground">Open Source</SectionHeading>
                    <p className="text-foreground/60 mt-4 max-w-2xl text-lg">
                        Work merged upstream, and the tools and experiments I build in the open.
                    </p>
                </div>

                {contributions.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-foreground/60 text-center text-sm font-bold tracking-wider uppercase">
                            Merged Upstream
                        </h3>
                        <SpotlightList className="grid grid-cols-1 gap-6">
                            {contributions.map((contribution) => (
                                <ContributionCard
                                    key={contribution.pullRequestURL}
                                    contribution={contribution}
                                />
                            ))}
                        </SpotlightList>
                    </div>
                )}

                <div className="mt-14 space-y-6">
                    <h3 className="text-foreground/60 text-center text-sm font-bold tracking-wider uppercase">
                        Projects
                    </h3>
                    <ProjectGrid projects={projects} />
                </div>

                <ResumeBridge />
            </div>
        </section>
    );
}
