import DotBackground from '@/components/backgrounds/dot-background';
import SectionHeading from '@/components/common/section-heading';
import SpotlightList from '@/components/common/spotlight-list';
import { skillGroups } from '@/components/home/skills/contents';
import SkillCard from '@/components/home/skills/skill-card';

export default function SkillsArea() {
    return (
        <section id="skills" className="relative px-4 py-24">
            <DotBackground />

            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <SectionHeading className="text-foreground">Skills & Tooling</SectionHeading>
                    <p className="text-foreground/60 mx-auto mt-4 max-w-2xl text-lg">
                        The stack I reach for day to day, grouped by where it sits in a system.
                    </p>
                </div>

                <SpotlightList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {skillGroups.map((group) => (
                        <SkillCard key={group.title} {...group} />
                    ))}
                </SpotlightList>
            </div>
        </section>
    );
}
