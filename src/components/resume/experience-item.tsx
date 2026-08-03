import BulletList from '@/components/resume/bullet-list';
import TimelineIcon from '@/components/resume/timeline-icon';
import type { ExperienceEntry } from '@/components/resume/types';
import Image from 'next/image';

/** One role: employer, dates and location, then what the work actually was. */
export default function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
    return (
        <TimelineIcon>
            <div className="job-header">
                <div className="font-bold">
                    <h3>{entry.role}</h3>
                    <div className="company-info">
                        <div className="flex items-center rounded border p-0.5">
                            <Image
                                src={entry.logo}
                                alt={`${entry.companies[0]?.name ?? 'Company'} logo`}
                                className="size-3 object-cover"
                                width={32}
                                height={32}
                            />
                        </div>
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
        </TimelineIcon>
    );
}
