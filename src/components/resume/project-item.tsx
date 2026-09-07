import type { ResumeProject } from '@/components/resume/types';

/**
 * One project, as a single bullet: what it is, what it is built from, and where
 * to go and see it. It renders inside the same `bullet-list` the additional
 * information section uses, so the print stylesheet already paginates it and
 * this section needs no CSS of its own.
 *
 * The link text drops the scheme — a printed resume is read, not clicked, and
 * `chat.kzaman.com` is what a reader would type.
 */
export default function ProjectItem({ project }: { project: ResumeProject }) {
    return (
        <li>
            <p>
                <span className="font-bold">{project.name}</span> — {project.description}{' '}
                <span className="italic">{project.tech.join(', ')}</span>.{' '}
                <a href={project.url} className="underline">
                    {project.url.replace(/^https?:\/\//, '')}
                </a>
            </p>
        </li>
    );
}
