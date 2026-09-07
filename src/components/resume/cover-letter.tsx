import { careerExperience, currentWorkplace } from '@/lib/metadata';

/**
 * The optional second sheet, printed alongside the resume from the print menu.
 *
 * The years figure is derived from `careerExperience` rather than written out,
 * because the hardcoded one went stale — it still claimed "more than two years"
 * long after the resume beside it said otherwise, and a letter that contradicts
 * the attached resume is worse than no letter.
 */
export default function CoverLetter() {
    return (
        <div className="page-container cover-letter mt-6 hidden p-8 print:p-0">
            <div className="text-justify text-sm">
                <h1 className="subtitle mb-8 text-3xl capitalize">Dear Hiring Manager!</h1>

                <div className="mt-2 space-y-4">
                    <p>
                        I am writing to apply for the role you advertised. I have over{' '}
                        {careerExperience} years of professional experience building and maintaining
                        production web applications, and the responsibilities in your posting line
                        up closely with the work I do day to day.
                    </p>
                    <p>
                        Most of my recent work is in React, Next.js and TypeScript: designing
                        reusable component systems, integrating REST APIs, managing application
                        state, and profiling interfaces that had grown slow. I take features from
                        requirement analysis through to deployment and support, rather than handing
                        them over at the pull request. A full-stack background in PHP (Laravel),
                        Node and MySQL means API contracts, authentication and deployment concerns
                        are things I can work through with the team instead of waiting on someone
                        else.
                    </p>
                    <p>
                        At {currentWorkplace} I own revenue-critical modules — subscriptions,
                        booking, multi-gateway payments and vendor management — on products that
                        carry high-volume, concurrent traffic. That work has meant debugging under
                        real user load, cutting response times through caching and query work, and
                        reviewing pull requests and mentoring junior developers along the way.
                    </p>
                    <p>
                        I would welcome the chance to talk about the role in more detail. My resume
                        is attached, along with links to projects and open-source contributions you
                        are welcome to look through.
                    </p>
                </div>

                <p className="mt-8">Thanks & Regards</p>
                <p>Md. Kamruzzaman</p>
                <p>Software Engineer</p>
                <p className="italic">Dhaka, Bangladesh</p>
            </div>
        </div>
    );
}
