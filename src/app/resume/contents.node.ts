import type {
    EducationEntry,
    ExperienceEntry,
    ResumeProject,
    SkillRow
} from '@/components/resume/types';
import { careerExperience } from '@/services/metadata';

/**
 * The JavaScript/TypeScript full-stack cut of the resume.
 *
 * Same shape and the same export names as `contents.ts`, so switching which
 * version `page.tsx` renders is one import line and nothing else. The facts are
 * identical to the other two cuts — what changes is the order they arrive in:
 * TypeScript on both ends, Node.js services and React/Next.js lead, and the
 * PHP/Laravel and WordPress work is kept but demoted to supporting evidence.
 *
 * Written for Node/NestJS + React postings, where the reader is scanning for
 * JavaScript depth and stops at the first PHP-shaped headline.
 */

export const professionalSummary = `Full-stack JavaScript/TypeScript engineer with ${careerExperience}+ years shipping production React and Next.js applications and the Node.js and REST services beneath them — API design and versioning, data modelling, caching, queue-backed workflows and the deployment around them. Track record building, delivering and maintaining SaaS products (Appsero, weMail) and high-traffic multi-vendor marketplace products: payment gateway integrations, subscription and licensing domains, telemetry ingest and aggregation, real-time features over WebSockets and WebRTC, and the query, index and cache work that keeps them fast under concurrent load. Comfortable owning a feature from requirement analysis through to production and support, with the same types describing the API and the client that calls it.`;

export const skillRows: SkillRow[] = [
    {
        label: 'Languages & Runtimes',
        value: 'TypeScript, JavaScript (ES6+), Node.js, PHP 8+, SQL'
    },
    {
        label: 'Backend & Services',
        value: 'Node.js/Express, REST API design and versioning, service boundaries and microservices, event-driven and queue-backed workflows, job scheduling, webhooks and third-party integrations (Stripe, Twilio), public SDK design and backward compatibility, idempotent retries, failure and timeout handling'
    },
    {
        label: 'Frontend',
        value: 'React.js, Next.js (App Router, SSR/SSG/ISR), Redux Toolkit and RTK Query, Tailwind CSS, CSS Modules, reusable component systems and design tokens, data-dense dashboards and charts, Core Web Vitals, Vue.js'
    },
    {
        label: 'Data & Persistence',
        value: 'PostgreSQL, MySQL, schema and index design, query profiling, N+1 elimination, ORM and migrations, Redis for caching and rate limiting, cache invalidation strategy'
    },
    {
        label: 'Real-time',
        value: 'WebSockets (Socket.IO, Pusher), WebRTC signalling, connection lifecycle and reconnection, stream backpressure, real-time state sync'
    },
    {
        label: 'Auth & Security',
        value: 'JWT and token auth (Sanctum, Passport), authorization boundaries and role-aware access, input validation and output escaping, rate limiting, secret handling and server-only configuration'
    },
    {
        label: 'Performance & Scale',
        value: 'Server-side caching layers, query and hot-path profiling, render profiling and re-render elimination, bundle budgets and code splitting, high-volume concurrent traffic, background processing, infrastructure cost reduction, production debugging under live load'
    },
    {
        label: 'Infrastructure & DevOps',
        value: 'Docker, AWS (EC2, ECS, RDS, S3), Nginx, GitHub Actions (CI/CD), Turborepo monorepos, Git and branching strategy, deployment and release support'
    },
    {
        label: 'Testing & Quality',
        value: 'Jest, Vitest, Playwright, PHPUnit, typed contracts, code review, CI gates on lint, types and build'
    },
    {
        label: 'Other',
        value: 'Laravel, WordPress plugin development, OOP, Data Structures & Algorithms, System Design, Agile/Scrum'
    }
];

export const experience: ExperienceEntry[] = [
    {
        role: 'Software Engineer L2',
        companies: [{ name: 'weDevs', url: 'https://wedevs.com' }],
        period: 'November 2024 - Present',
        location: 'Mirpur DOHS 1216, Dhaka, Bangladesh',
        bullets: [
            'Own features end-to-end — the React/TypeScript screens, the versioned REST APIs beneath them, the data model, deployment and support.',
            'Design revenue-critical modules (subscriptions, licensing, payments, booking, vendor management), owning both the API contract and the client state that consumes it.',
            'Build the data-dense analytics dashboard of Appsero, a SaaS analytics and licensing platform, in React and TypeScript — usage and version-spread charts, filterable tables over site telemetry, product, plan and license management views.',
            'Own the telemetry pipeline behind it: ingest from installed sites, the schema it lands in, and the aggregation behind install, version-spread and deactivation reporting.',
            'Build weMail, a SaaS email marketing platform, across the stack — campaign and automation workflows, subscriber lists and segmentation, a React email builder, and the sending layer on Amazon SES and SendGrid.',
            'Cut response times and infrastructure cost under concurrent load through indexing, caching and N+1 elimination, and profile the browser side for re-renders, bundle splitting and Core Web Vitals.',
            'Guard critical flows with Jest, Playwright and PHPUnit in CI; review pull requests and mentor junior developers.'
        ]
    },
    {
        role: 'Software Engineer',
        companies: [
            { name: 'MononSoft Ltd.', url: 'https://mononsoft.org' },
            { name: '(JMI Group)', url: 'https://jmigroup-bd.com' }
        ],
        period: 'July 2021 - October 2024',
        location: '50/B New Eskaton Road, Dhaka 1000',
        bullets: [
            'Built enterprise ERP systems as JavaScript single-page applications over REST APIs I designed on the other side of the contract — data-heavy tables, filters, multi-step forms and role-aware views.',
            'Established the reusable component and layout conventions those apps were composed from, so new modules were assembled rather than copied.',
            'Modelled the MySQL schemas behind them — role-aware access, reporting queries, migrations without downtime.',
            'Optimized performance and automated manual business processes, cutting operational overhead; led technical discussions and mentored junior engineers.'
        ]
    },
    {
        role: 'Jr. Software Engineer',
        companies: [{ name: 'MaxSOP', url: 'https://maxsop.com/' }],
        period: 'May 2020 - June 2021',
        location: '27/2 Ram Babu Road, Mymensingh-2200',
        bullets: [
            'Built full-stack applications across a range of client projects — JavaScript interfaces over RESTful APIs, on a clean MVC structure from schema upward.',
            'Integrated third-party services and handled async state, loading and failure cases.',
            'Collaborated in Agile teams on code reviews and gathered requirements directly from clients.'
        ]
    }
];

/**
 * Shipped work a reader can open. Kept short enough that the section stays one
 * block on the printed page, and ordered Node/TypeScript-heaviest first — this
 * cut's reader is looking for JavaScript that runs on a server.
 */
export const projects: ResumeProject[] = [
    {
        name: 'Browser Terminal',
        description:
            'Web SSH client: a Node service bridging socket.io to an ssh2 session, streaming a real shell to xterm.js in the browser — session lifecycle, auth and stream backpressure handled server-side, so a shell is one URL away with no local client installed.',
        tech: ['Node.js', 'TypeScript', 'ssh2', 'Socket.IO', 'xterm.js'],
        url: 'https://console.kzaman.com'
    },
    {
        name: 'RTK Chat',
        description:
            'Real-time chat and video platform in a Turborepo monorepo — a Socket.IO server handling messaging, presence and WebRTC signalling for one-to-one and group calls, behind JWT auth, with the React client and shared packages beside it.',
        tech: ['Node.js', 'Socket.IO', 'WebRTC', 'JWT', 'React 19', 'RTK Query', 'Turborepo'],
        url: 'https://chat.kzaman.com'
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
    'TypeScript across both ends of the stack: the same types describe the API and the client that calls it.',
    'Experience with real-time systems (WebSockets, Socket.IO, Pusher, WebRTC) and third-party APIs (Stripe, Twilio).',
    'Comfortable with system design and scalable architecture, from schema and service boundaries through to deployment.',
    'Strong foundation in Data Structures and Algorithms.',
    'Domain depth in multi-vendor marketplaces, payment gateways, SaaS licensing and usage analytics, and enterprise ERP systems.',
    'Estimate and deliver to schedule, communicate risk early, and keep knowledge transfer part of the team routine.'
];
