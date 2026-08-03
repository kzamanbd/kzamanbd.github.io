import TimelineIcon from '@/components/resume/timeline-icon';
import type { EducationEntry } from '@/components/resume/types';

/** One qualification: degree, institution, and when and where it was taken. */
export default function EducationItem({ entry }: { entry: EducationEntry }) {
    return (
        <TimelineIcon>
            <div className="job-header mb-0">
                <div className="font-bold">
                    <h3>{entry.degree}</h3>
                    <div className="text-sm font-medium">
                        <span className="font-bold">{entry.institution}</span>
                    </div>
                </div>
                <div className="job-meta">
                    <time>{entry.period}</time>
                    <address>{entry.location}</address>
                </div>
            </div>
        </TimelineIcon>
    );
}
