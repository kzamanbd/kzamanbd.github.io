import BulletList from '@/components/resume/bullet-list';
import type { ExperienceEntry } from '@/components/resume/types';

/** One role: employer, dates and location, then what the work actually was. */
export default function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
    return (
        <div>
            <div className="job-header mt-0">
                <div className="font-bold">
                    <h3>{entry.role}</h3>
                    <div className="company-info">
                        <div className="contact-link">
                            {entry.companies.map((company) => (
                                <a
                                    key={company.url}
                                    href={company.url}
                                    className="underline"
                                    target="_blank"
                                    rel="noreferrer">
                                    {company.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="job-meta">
                    <time>{entry.period}</time>
                    <address>{entry.location}</address>
                </div>
            </div>
            <BulletList items={entry.bullets} />
        </div>
    );
}
