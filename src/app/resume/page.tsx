// The resume has several cuts of the same facts, differing only in what leads:
// Laravel and data design, React and component architecture, or Node and
// TypeScript on both ends. `?variant=` picks one — see `variants.ts` for the
// registry and the fallback rules.
import {
    resolveResumeVariant,
    resumeVariantHref,
    resumeVariantKeys,
    resumeVariants
} from '@/app/resume/variants';
import BulletList from '@/components/resume/bullet-list';
import CoverLetter from '@/components/resume/cover-letter';
import EducationItem from '@/components/resume/education-item';
import ExperienceItem from '@/components/resume/experience-item';
import PrintButton from '@/components/resume/print-button';
import ProjectItem from '@/components/resume/project-item';
import ResumeContactHeader from '@/components/resume/resume-contact-header';
import ResumeSection from '@/components/resume/resume-section';
import SkillsTable from '@/components/resume/skills-table';
import VariantSwitcher from '@/components/resume/variant-switcher';
import {
    authorName,
    careerExperience,
    currentJobTitle,
    currentWorkplace,
    siteURL,
    user
} from '@/services/metadata';
import type { Metadata } from 'next';

interface PageProps {
    searchParams: Promise<{ variant?: string | string[] }>;
}

const description = `The full resume of ${authorName}: ${careerExperience}+ years building multi-vendor marketplace software, payment gateways and WordPress plugins, currently at ${currentWorkplace} in ${user.address}.`;

// Without these the page inherits the root title and description verbatim,
// which reads to a search engine as a second copy of the homepage — on the one
// page that answers "who is this engineer and what have they shipped".
export async function generateMetadata(): Promise<Metadata> {
    const title = `${authorName} — ${currentJobTitle} Resume`;

    return {
        // `absolute`: the root template would append "| Kamruzzaman" to a title
        // that already carries the name, and Google truncates around 60
        // characters.
        title: { absolute: title },
        description,
        // Every cut is the same person's resume, so they all point at the bare
        // URL rather than competing with each other in the index.
        alternates: { canonical: `${siteURL}/resume` },
        openGraph: {
            title,
            description,
            url: `${siteURL}/resume`,
            type: 'profile'
        }
    };
}

/**
 * The printable resume. Every line of it lives in a `contents*.ts`, so updating
 * a role or a skill row never means touching layout, and the page itself stays
 * a composition of small sections that the print stylesheet already
 * understands.
 *
 * Reading `searchParams` opts this route into dynamic rendering — it no longer
 * prerenders, which is the price of serving every cut from one URL.
 */
const Resume = async ({ searchParams }: PageProps) => {
    const variantKey = resolveResumeVariant((await searchParams).variant);
    const {
        additionalInformation,
        education,
        experience,
        professionalSummary,
        projects,
        skillRows
    } = resumeVariants[variantKey].contents;

    // The switcher is a development affordance, not something a visitor should
    // see: the deployed page is whichever cut its link asked for, and offering
    // a stranger the other two invites them to read the resume as three
    // pitches rather than one. `?variant=` still works in production — that is
    // the URL that goes into an application — it simply has no visible control.
    const variantLinks =
        process.env.NODE_ENV === 'production'
            ? []
            : resumeVariantKeys.map((key) => ({
                  href: resumeVariantHref(key),
                  label: resumeVariants[key].label,
                  active: key === variantKey
              }));

    return (
        <div>
            {/* `mt-8`, not the navbar-clearing offset the site pages use: this
                route sits outside the `(site)` group, so there is no navbar. */}
            <div className="mx-auto mt-8 md:w-[210mm] print:hidden">
                <div className="border-foreground/10 bg-background/50 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 backdrop-blur-sm">
                    <h1 className="text-lg font-bold">Resume</h1>
                    <VariantSwitcher items={variantLinks} />
                    <PrintButton />
                </div>
            </div>

            <div className="page-container h-auto text-gray-900 print:h-auto">
                <div className="flex flex-col gap-4 p-10 print:p-0">
                    <ResumeContactHeader />

                    <div className="about-me">
                        <h5 className="section-heading">PROFESSIONAL SUMMARY</h5>
                        <p className="text-justify text-sm">{professionalSummary}</p>
                    </div>

                    <ResumeSection title="TECHNICAL SKILLS">
                        <SkillsTable rows={skillRows} />
                    </ResumeSection>

                    <ResumeSection title="PROFESSIONAL EXPERIENCE">
                        <div className="flex flex-col gap-4">
                            {experience.map((entry) => (
                                <ExperienceItem key={entry.role + entry.period} entry={entry} />
                            ))}
                        </div>
                    </ResumeSection>

                    <ResumeSection title="PROJECTS">
                        <ul className="bullet-list">
                            {projects.map((project) => (
                                <ProjectItem key={project.name} project={project} />
                            ))}
                        </ul>
                    </ResumeSection>

                    <ResumeSection title="EDUCATION">
                        <div className="timeline-container">
                            {education.map((entry) => (
                                <EducationItem key={entry.degree} entry={entry} />
                            ))}
                        </div>
                    </ResumeSection>

                    <ResumeSection title="ADDITIONAL INFORMATION">
                        <BulletList items={additionalInformation} />
                    </ResumeSection>
                </div>
            </div>

            <CoverLetter />
        </div>
    );
};

export default Resume;
