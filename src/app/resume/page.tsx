import {
    additionalInformation,
    education,
    experience,
    professionalSummary,
    skillRows
} from '@/app/resume/contents';
import BulletList from '@/components/resume/bullet-list';
import CoverLetter from '@/components/resume/cover-letter';
import EducationItem from '@/components/resume/education-item';
import ExperienceItem from '@/components/resume/experience-item';
import PrintButton from '@/components/resume/print-button';
import ResumeContactHeader from '@/components/resume/resume-contact-header';
import ResumeSection from '@/components/resume/resume-section';
import SkillsTable from '@/components/resume/skills-table';
import { authorName, careerExperience, currentWorkplace, siteURL, user } from '@/lib/metadata';
import type { Metadata } from 'next';

const title = `${authorName} — Full Stack Software Engineer Resume`;
const description = `The full resume of ${authorName}: ${careerExperience}+ years building multi-vendor marketplace software, payment gateways and WordPress plugins, currently at ${currentWorkplace} in ${user.address}.`;

// Without these the page inherits the root title and description verbatim,
// which reads to a search engine as a second copy of the homepage — on the one
// page that answers "who is this engineer and what have they shipped".
export const metadata: Metadata = {
    // `absolute`: the root template would append "| Kamruzzaman" to a title
    // that already carries the name, and Google truncates around 60 characters.
    title: { absolute: title },
    description,
    alternates: { canonical: `${siteURL}/resume` },
    openGraph: {
        title,
        description,
        url: `${siteURL}/resume`,
        type: 'profile'
    }
};

/**
 * The printable resume. Every line of it lives in `contents.ts`, so updating a
 * role or a skill row never means touching layout, and the page itself stays a
 * composition of small sections that the print stylesheet already understands.
 */
const Resume = () => {
    return (
        <div>
            {/* `mt-8`, not the navbar-clearing offset the site pages use: this
                route sits outside the `(site)` group, so there is no navbar. */}
            <div className="mx-auto mt-8 md:w-[210mm] print:hidden">
                <div className="border-foreground/10 bg-background/50 flex items-center justify-between rounded-2xl border p-4 backdrop-blur-sm">
                    <h1 className="text-lg font-bold">Resume</h1>
                    <PrintButton />
                </div>
            </div>

            <div className="page-container h-auto text-gray-900 print:h-auto">
                <div className="p-10 print:p-0 print:pl-1.5">
                    <ResumeContactHeader />

                    <div className="about-me">
                        <h5 className="section-heading">PROFESSIONAL SUMMARY</h5>
                        <p className="mb-4 text-justify text-sm">{professionalSummary}</p>
                    </div>

                    <ResumeSection title="TECHNICAL SKILLS">
                        <SkillsTable rows={skillRows} />
                    </ResumeSection>

                    <ResumeSection title="PROFESSIONAL EXPERIENCE">
                        <div className="timeline-container">
                            {experience.map((entry) => (
                                <ExperienceItem key={entry.role + entry.period} entry={entry} />
                            ))}
                        </div>
                    </ResumeSection>

                    <ResumeSection title="EDUCATION" breakBeforePage>
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
