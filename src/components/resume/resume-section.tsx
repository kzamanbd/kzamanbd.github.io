import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

/**
 * One titled block of the resume. The heading keeps the `section-heading` class
 * the print stylesheet targets, so a section added here paginates like the rest.
 */
export default function ResumeSection({
    title,
    breakBeforePage = false,
    children
}: {
    title: string;
    /** Starts this section on a fresh sheet when the resume is printed. */
    breakBeforePage?: boolean;
    children: ReactNode;
}) {
    return (
        <section>
            <h5 className={cn('section-heading', breakBeforePage && 'break-before-page')}>
                {title}
            </h5>
            {children}
        </section>
    );
}
