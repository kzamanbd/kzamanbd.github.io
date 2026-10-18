import type { EducationEntry } from '@/components/resume/types';

/** One qualification: degree, institution, and when and where it was taken. */
export default function EducationItem({ entry }: { entry: EducationEntry }) {
    return (
        // `mb-0` because no bullets follow. The institution stays regular weight:
        // unlike an employer it carries no link underline, so semibold would read
        // as a second title.
        <div className="job-header mb-0">
            <div>
                <h3 className="job-title">{entry.degree}</h3>
                <div className="text-xs">{entry.institution}</div>
            </div>
            <div className="job-meta">
                <time>{entry.period}</time>
                <address>{entry.location}</address>
            </div>
        </div>
    );
}
