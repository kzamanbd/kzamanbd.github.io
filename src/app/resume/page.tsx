import CoverLetter from '@/components/resume/cover-letter';
import TimelineIcon from '@/components/resume/timeline-icon';
import { profileImage, user } from '@/lib/metadata';
import Image from 'next/image';

const social = Object.entries({
    GitHub: user.github,
    Linkedin: user.linkedin,
    LeetCode: user.leetcode,
    Codeforces: user.codeforces
});

const Resume = () => {
    return (
        <div>
            <div className="page-container h-auto text-gray-900 print:h-auto">
                <div className="p-10 print:p-0 print:pl-1.5">
                    <div className="mb-2 flex justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">MD KAMRUZZAMAN</h1>
                            <h2 className="text-lg font-semibold">Full Stack Software Engineer</h2>
                            <p className="mt-1 text-sm">
                                PHP • Laravel • JavaScript • React • Vue • AWS
                            </p>
                            <ul className="flex gap-2 text-sm">
                                <li>
                                    <a href="tel:8801716724245" className="contact-link">
                                        <span className="font-semibold">Phone:</span>
                                        <span className="underline">+880 1716-724245</span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href={`mailto:${user.email}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="contact-link">
                                        <span className="font-semibold">Email:</span>
                                        <span className="underline"> {user.email}</span>
                                    </a>
                                </li>

                                <li className="contact-link">
                                    <span className="font-semibold">Address:</span>
                                    <p>Mirpur 12, Dhaka, Bangladesh</p>
                                </li>
                            </ul>
                            {/* Social */}
                            <div className="mb-4 flex flex-wrap gap-2 text-sm">
                                {social.map(([key, value], index) => (
                                    <div key={key} className="contact-link">
                                        <a
                                            href={value}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="resume-link">
                                            <span>
                                                {value.replace('https://', '').replace('www.', '')}
                                            </span>
                                        </a>
                                        <span>{index < social.length - 1 ? '•' : ''}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Image
                            src={profileImage}
                            className="size-25 rounded-xl object-cover"
                            width={100}
                            height={100}
                            alt="kamruzzaman"
                        />
                    </div>
                    {/* contact info */}
                    <div className="about-me">
                        <h5 className="section-heading">PROFESSIONAL SUMMARY</h5>
                        <p className="mb-4 text-justify text-sm">
                            Strong problem-solving skills with a focus on scalable system design,
                            performance optimization, and clean, maintainable code. 4+ years of
                            experience engineering high-throughput web applications, APIs, and
                            distributed systems. Deep expertise in PHP (Laravel) and modern
                            JavaScript frameworks (React, Vue). Proven track record of delivering
                            high-impact solutions across multi-vendor platforms and enterprise ERP
                            systems, bridging product vision with rigorous engineering standards.
                        </p>
                    </div>

                    {/* Technical Skills */}
                    <h5 className="section-heading">TECHNICAL SKILLS</h5>

                    <div className="mb-4 text-sm">
                        <ul className="bullet-list">
                            <li>
                                <p>
                                    <span className="me-2 font-bold">Languages & Frameworks:</span>
                                    JavaScript/TypeScript (ES6+), React.js, Next.js, Redux/Redux
                                    Toolkit, Vue.js, Express.js, PHP 8+ (Laravel)
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="me-2 font-bold">Frontend:</span>
                                    JSX, Virtual DOM, Component Lifecycle, React Hooks, State
                                    Management, HTML5, CSS3, Tailwind CSS, Responsive UI
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="me-2 font-bold">Backend & Architecture:</span>
                                    REST APIs, Microservices, MVC Architecture, WebSockets,
                                    Event-driven systems, Eloquent ORM, Migrations, Queues &amp; Job
                                    Scheduling, Laravel Sanctum &amp; Passport
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="me-2 font-bold">Databases:</span>
                                    MySQL, PostgreSQL, Redis (caching &amp; Laravel Horizon queues),
                                    query optimization
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="me-2 font-bold">DevOps & Tools:</span>
                                    Git, NPM, Docker, GitHub Actions (CI/CD), AWS (EC2, ECS, RDS,
                                    S3), Nginx, Apache
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="me-2 font-bold">Testing & Quality:</span>
                                    Jest, Vitest, PHPUnit, Playwright
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="me-2 font-bold">Other:</span>
                                    OOP, Data Structures & Algorithms, System Design, Agile/Scrum
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* Experience section */}
                    <h5 className="section-heading">PROFESSIONAL EXPERIENCE</h5>

                    <div className="timeline-container">
                        <TimelineIcon>
                            <div className="job-header">
                                <div className="font-bold">
                                    <h3>Software Engineer L2</h3>
                                    <div className="company-info">
                                        <div className="flex items-center rounded border p-0.5">
                                            <Image
                                                src="/images/wedevs-logo.svg"
                                                alt="Company Logo"
                                                className="size-3 object-cover"
                                                width={32}
                                                height={32}
                                            />
                                        </div>
                                        <div className="contact-link">
                                            <a
                                                href="https://wedevs.com"
                                                className="underline"
                                                target="_blank"
                                                rel="noreferrer">
                                                weDevs
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-meta">
                                    <time>November 2024 - Present</time>
                                    <address>Mirpur DOHS 1216, Dhaka, Bangladesh</address>
                                </div>
                            </div>
                            <ul className="bullet-list">
                                <li>
                                    <p>
                                        Design and develop complex features end-to-end across
                                        multiple production products, from design through deployment
                                        and ongoing support.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Architect and ship revenue-critical modules — subscriptions,
                                        booking systems, multi-gateway payments, and vendor
                                        management — built to handle high-volume, concurrent
                                        traffic.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Investigate and resolve difficult production bugs across the
                                        full stack, restoring reliability under live user load.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Profile and optimize slow queries and application hot paths
                                        (indexing, caching, N+1 elimination), cutting response times
                                        and infrastructure cost.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Build robust RESTful APIs and React interfaces, turning
                                        complex requirements into clean, reusable, well-tested code.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Participate in code reviews and mentor junior developers,
                                        contributing to engineering standards and overall code
                                        quality.
                                    </p>
                                </li>
                            </ul>
                        </TimelineIcon>

                        <TimelineIcon>
                            <div className="job-header">
                                <div className="font-bold">
                                    <h3>Software Engineer</h3>
                                    <div className="company-info">
                                        <div className="flex items-center rounded border p-0.5">
                                            <Image
                                                src="/images/mononsoft-logo.svg"
                                                alt="Company Logo"
                                                className="size-3 object-cover"
                                                width={32}
                                                height={32}
                                            />
                                        </div>
                                        <div className="contact-link">
                                            <a
                                                href="https://mononsoft.org"
                                                className="underline"
                                                target="_blank"
                                                rel="noreferrer">
                                                MononSoft Ltd.
                                            </a>
                                            <a
                                                href="https://jmigroup-bd.com"
                                                className="underline"
                                                target="_blank"
                                                rel="noreferrer">
                                                (JMI Group)
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-meta">
                                    <time>July 2021 - October 2024</time>
                                    <address>50/B New Eskaton Road, Dhaka 1000</address>
                                </div>
                            </div>
                            <ul className="bullet-list">
                                <li>
                                    <p>
                                        Built and shipped full-stack web applications end-to-end
                                        across multiple business domains using Laravel, Vue.js, and
                                        MySQL.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Designed scalable backend architectures, REST APIs, and
                                        service-oriented modules supporting diverse product
                                        workflows.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Translated business requirements into clean, maintainable
                                        features spanning frontend, backend, and database layers.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Optimized application performance and automated manual
                                        processes, improving reliability and reducing operational
                                        overhead.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Led technical discussions, owned key system-design
                                        decisions, and mentored junior engineers.
                                    </p>
                                </li>
                            </ul>
                        </TimelineIcon>

                        <TimelineIcon>
                            <div className="job-header">
                                <div className="font-bold">
                                    <h3>Jr. Software Engineer</h3>
                                    <div className="company-info">
                                        <div className="flex items-center rounded border p-0.5">
                                            <Image
                                                src="/images/maxsop-logo.svg"
                                                alt="Company Logo"
                                                className="size-3 object-cover"
                                                width={32}
                                                height={32}
                                            />
                                        </div>
                                        <div className="contact-link">
                                            <a
                                                href="https://maxsop.com/"
                                                className="underline"
                                                target="_blank"
                                                rel="noreferrer">
                                                MaxSOP
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-meta">
                                    <time>May 2020 – June 2021</time>
                                    <address>27/2 Ram Babu Road, Mymensingh-2200</address>
                                </div>
                            </div>
                            <ul className="bullet-list">
                                <li>
                                    <p>
                                        Developed and maintained full-stack web applications across
                                        a range of client projects using Laravel, Vue.js, and MySQL.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Implemented clean MVC architecture and reusable components
                                        for scalable, maintainable codebases.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Built RESTful APIs and integrated third-party services to
                                        extend application functionality.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Collaborated in Agile teams on code reviews and gathered
                                        requirements directly from clients to deliver tailored
                                        solutions.
                                    </p>
                                </li>
                            </ul>
                        </TimelineIcon>
                    </div>

                    {/* Education */}
                    <h5 className="section-heading break-before-page">EDUCATION</h5>

                    <div className="timeline-container">
                        <TimelineIcon>
                            <div className="job-header mb-0">
                                <div className="font-bold">
                                    <h3>BSc in Computer Science & Engineering (Running)</h3>
                                    <div className="text-sm font-medium">
                                        <span className="font-bold">Southeast University</span>
                                    </div>
                                </div>
                                <div className="job-meta">
                                    <time>2022 - Present</time>
                                    <address>Dhaka, Bangladesh</address>
                                </div>
                            </div>
                        </TimelineIcon>

                        <TimelineIcon>
                            <div className="job-header mb-0">
                                <div className="font-bold">
                                    <h3>Diploma in Engineering (Computer Technology)</h3>
                                    <div className="text-sm font-medium">
                                        <span className="font-bold">
                                            Rumdo Institute of Modern Technology
                                        </span>
                                    </div>
                                </div>
                                <div className="job-meta">
                                    <time>2015 - 2019</time>
                                    <address>Mymensingh, Bangladesh</address>
                                </div>
                            </div>
                        </TimelineIcon>
                    </div>

                    {/* Additional Information */}
                    <h5 className="section-heading">ADDITIONAL INFORMATION</h5>

                    <ul className="bullet-list">
                        <li>
                            <p>Strong foundation in Data Structures and Algorithms</p>
                        </li>
                        <li>
                            <p>Experience with real-time systems (WebSockets, Pusher, Socket.io)</p>
                        </li>
                        <li>
                            <p>Familiar with third-party APIs (Stripe, Twilio)</p>
                        </li>
                        <li>
                            <p>Comfortable with system design and scalable architecture</p>
                        </li>
                        <li>
                            <p>
                                Design, code, test, and implement according to software design
                                specifications following standard coding styles and practices.
                            </p>
                        </li>
                        <li>
                            <p>Analyze the requirements and understand the deliverables.</p>
                        </li>
                        <li>
                            <p>
                                Ensure that projects are accurately estimated and delivered to
                                schedule.
                            </p>
                        </li>
                        <li>
                            <p>Participate in code/design reviews.</p>
                        </li>
                        <li>
                            <p>Collaborate with team members and ensure knowledge transfer.</p>
                        </li>
                        <li>
                            <p>
                                Actively contribute to the process of continual improvement,
                                concerning self, team, and systems.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <CoverLetter />
        </div>
    );
};

export default Resume;
