import TimelineIcon from '@/components/resume/timeline-icon';
import type { EducationEntry } from '@/components/resume/types';

/** One qualification: degree, institution, and when and where it was taken. */
export default function EducationItem({ entry }: { entry: EducationEntry }) {
    return (
        <TimelineIcon>
            {/* `-mt-1` lifts the title onto the timeline dot; `mb-0` because no
                bullets follow. */}
            <div className="job-header -mt-1 mb-0">
                <div>
                    <h3 className="job-title">{entry.degree}</h3>
                    <div className="company-info">{entry.institution}</div>
                </div>
                <div className="job-meta">
                    <time>{entry.period}</time>
                    <address>{entry.location}</address>
                </div>
            </div>
        </TimelineIcon>
    );
}
