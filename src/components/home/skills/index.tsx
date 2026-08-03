import DotBackground from '@/components/backgrounds/dot-background';
import SectionHeading from '@/components/common/section-heading';
import SpotlightList from '@/components/common/spotlight-list';
import { skills } from '@/components/home/skills/contents';
import SkillCard from '@/components/home/skills/skill-card';

export default function SkillsArea() {
    return (
        <section id="skills" className="relative px-4 py-24">
            <DotBackground />

            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <SectionHeading className="text-foreground">
                        Skills &amp; Tooling
                    </SectionHeading>
                    <p className="text-foreground/60 mx-auto mt-4 max-w-2xl text-lg">
                        The stack I reach for day to day, ordered by where each piece sits in a
                        system.
                    </p>
                </div>

                <SpotlightList className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {skills.map((skill) => (
                        <SkillCard key={skill.name} skill={skill} />
                    ))}
                </SpotlightList>
            </div>
        </section>
    );
}
