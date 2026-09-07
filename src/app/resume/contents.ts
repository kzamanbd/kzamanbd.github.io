import type {
    EducationEntry,
    ExperienceEntry,
    ResumeProject,
    SkillRow
} from '@/components/resume/types';
import { careerExperience } from '@/lib/metadata';

export const professionalSummary = `Strong problem-solving skills with a focus on scalable system design, performance optimization, and clean, maintainable code. ${careerExperience}+ years of experience engineering high-throughput web applications, APIs, and distributed systems. Deep expertise in modern JavaScript frameworks (React, Next.js, TypeScript, Vue) and PHP (Laravel). Proven track record of delivering high-impact solutions across multi-vendor platforms and enterprise ERP systems, bridging product vision with rigorous engineering standards.`;

export const skillRows: SkillRow[] = [
    {
        label: 'Languages & Frameworks',
        value: 'TypeScript/JavaScript (ES6+), React.js, Next.js, Vue.js, Node.js/Express, PHP 8+ (Laravel)'
    },
    {
        label: 'Frontend',
        value: 'HTML5, CSS3, Tailwind CSS, CSS Modules, Next.js App Router (SSR/SSG/ISR), component libraries and design systems, theming, responsive and accessible UI, cross-browser compatibility'
    },
    {
        label: 'State & Data',
        value: 'Store and cache design (Redux Toolkit, Context API), cache invalidation, optimistic updates and rollback, race conditions and cancellation, idempotent retries, real-time sync over WebSockets, auth and authorization boundaries'
    },
    {
        label: 'Performance',
        value: 'Core Web Vitals (LCP, CLS, INP), bundle budgets and code splitting, render profiling, image optimization, PWA offline caching, server-side caching, N+1 elimination'
    },
    {
        label: 'Backend & Architecture',
        value: 'REST API design and versioning, service boundaries and microservices, event-driven and queue-backed workflows, job scheduling, token auth (Sanctum, Passport), Eloquent ORM and migrations'
    },
    {
        label: 'Databases',
        value: 'MySQL, PostgreSQL, Redis (caching), schema and index design, query profiling'
    },
    {
        label: 'Testing & Quality',
        value: 'Jest, Vitest, Playwright, PHPUnit, typed contracts, code review, CI gates'
    },
    {
        label: 'DevOps & Tools',
        value: 'Git and branching strategy, GitHub Actions (CI/CD), Docker, AWS (EC2, ECS, RDS, S3), Nginx'
    },
    {
        label: 'Other',
        value: 'OOP, Data Structures & Algorithms, System Design, SEO, Agile/Scrum'
    }
];

export const experience: ExperienceEntry[] = [
    {
        role: 'Software Engineer L2',
        companies: [{ name: 'weDevs', url: 'https://wedevs.com' }],
        logo: '/images/wedevs-logo.svg',
        period: 'November 2024 - Present',
        location: 'Mirpur DOHS 1216, Dhaka, Bangladesh',
        bullets: [
            'Own complex features end-to-end across Dokan and other production products — requirement analysis, React/TypeScript interfaces, the APIs behind them, deployment and support.',
            'Architect revenue-critical modules (subscriptions, booking, multi-gateway payments, vendor management) for high-volume concurrent traffic, owning the state boundaries and the API contracts beneath them.',
            'Extract shared components and UI patterns out of duplicated screens, so one treatment ships across products instead of being rebuilt per feature.',
            'Profile and optimize hot paths on both sides — indexing, caching and N+1 elimination on the server; re-renders and bundle splitting in the browser — cutting response times and infrastructure cost.',
            'Investigate and resolve difficult production bugs across the full stack, restoring reliability under live user load.',
            'Review pull requests and mentor junior developers, raising standards for component structure, typing and accessibility.'
        ]
    },
    {
        role: 'Software Engineer',
        companies: [
            { name: 'MononSoft Ltd.', url: 'https://mononsoft.org' },
            { name: '(JMI Group)', url: 'https://jmigroup-bd.com' }
        ],
        logo: '/images/mononsoft-logo.svg',
        period: 'July 2021 - October 2024',
        location: '50/B New Eskaton Road, Dhaka 1000',
        bullets: [
            'Built and shipped full-stack web applications end-to-end across multiple business domains using Laravel, Vue.js and MySQL.',
            'Built enterprise ERP frontends as Vue.js single-page apps — data-heavy tables, filters, multi-step forms and role-aware views on a shared component layer.',
            'Designed scalable backend architectures, REST APIs and service-oriented modules, owning the contract on both sides rather than waiting on a handoff.',
            'Optimized application performance and automated manual processes, improving reliability and reducing operational overhead.',
            'Led technical discussions, owned key system-design decisions, and mentored junior engineers.'
        ]
    },
    {
        role: 'Jr. Software Engineer',
        companies: [{ name: 'MaxSOP', url: 'https://maxsop.com/' }],
        logo: '/images/maxsop-logo.svg',
        period: 'May 2020 - June 2021',
        location: '27/2 Ram Babu Road, Mymensingh-2200',
        bullets: [
            'Developed and maintained full-stack web applications across a range of client projects using Laravel, Vue.js and MySQL.',
            'Built responsive, cross-browser interfaces with reusable components and a clean MVC structure, so screens could be composed rather than copied.',
            'Built RESTful APIs and integrated third-party services, handling async state and failure cases.',
            'Collaborated in Agile teams on code reviews and gathered requirements directly from clients.'
        ]
    }
];

/**
 * Shipped work a reader can open. Kept to four so the section stays one block
 * on the printed page, and ordered frontend-heaviest first.
 */
export const projects: ResumeProject[] = [
    {
        name: 'RTK Chat',
        description:
            'Real-time chat and video platform in a Turborepo monorepo — messaging over Socket.IO, one-to-one and group calls over WebRTC, behind JWT auth.',
        tech: ['React 19', 'Redux Toolkit', 'RTK Query', 'Socket.IO', 'WebRTC'],
        url: 'https://chat.kzaman.com'
    },
    {
        name: 'Browser Terminal',
        description:
            'Web SSH client: xterm.js in the browser over socket.io to an ssh2 session, so a shell is one URL away with no local client installed.',
        tech: ['TypeScript', 'xterm.js', 'Socket.IO'],
        url: 'https://console.kzaman.com'
    },
    {
        name: 'TypeOn',
        description:
            'Typing practice platform with per-keystroke feedback and speed, accuracy and progress tracked across sessions.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        url: 'https://typeon.kzaman.com'
    },
    {
        name: 'laravel/vs-code-extension #273',
        description:
            "Merged upstream into Laravel's official VS Code extension: Blade delimiters now space themselves, shipped as an opt-out setting scoped to Blade files.",
        tech: ['TypeScript', 'VS Code API'],
        url: 'https://github.com/laravel/vs-code-extension/pull/273'
    }
];

export const education: EducationEntry[] = [
    {
        degree: 'BSc in Computer Science & Engineering',
        institution: 'Southeast University',
        period: '2022 - 2026',
        location: 'Dhaka, Bangladesh'
    },
    {
        degree: 'Diploma in Engineering (Computer Technology)',
        institution: 'Rumdo Institute of Modern Technology',
        period: '2015 - 2019',
        location: 'Mymensingh, Bangladesh'
    }
];

export const additionalInformation: string[] = [
    'Comfortable with system design and scalable architecture, on both the component and the service side.',
    'Experience with real-time systems (WebSockets, Pusher, Socket.io) and third-party APIs (Stripe, Twilio).',
    'Strong foundation in Data Structures and Algorithms.',
    'Treat accessibility, semantic markup and SEO as part of the build, not a later pass.',
    'Estimate and deliver to schedule, communicate risk early, and keep knowledge transfer part of the team routine.'
];
