import type {
    EducationEntry,
    ExperienceEntry,
    ResumeProject,
    SkillRow
} from '@/components/resume/types';
import { careerExperience } from '@/services/metadata';

/**
 * The resume as /resume serves it.
 *
 * PHP/Laravel, API and service design, data modelling and the infrastructure
 * work lead; the React and Next.js work is kept but sits underneath as
 * supporting evidence, so a backend reader is not asked to hunt for the server
 * side beneath a frontend headline.
 */

export const professionalSummary = `Backend engineer with ${careerExperience}+ years designing and operating PHP/Laravel and Node.js services behind high-traffic products — REST API design, data modelling, caching, queue-backed workflows and the deployment around them. Track record building, delivering and maintaining SaaS products (Appsero, weMail) alongside multi-vendor marketplace and enterprise ERP systems: payment gateway integrations, subscription and booking domains, license and update delivery, telemetry ingest from installed WordPress sites, and the query, index and cache work that keeps them fast under concurrent load. Comfortable owning a feature through to production and support, with enough React and Next.js depth to design an API its consumers can actually use.`;

export const skillRows: SkillRow[] = [
    {
        label: 'Languages & Frameworks',
        value: 'PHP 8+ (Laravel), Node.js/Express, TypeScript/JavaScript (ES6+), WordPress plugin development, React.js, Next.js, Vue.js'
    },
    {
        label: 'API & Service Design',
        value: 'REST API design and versioning, service boundaries and microservices, event-driven and queue-backed workflows, job scheduling, webhooks and third-party integrations (Stripe, Twilio), public SDK design and backward compatibility, idempotent retries, failure and timeout handling'
    },
    {
        label: 'Data & Persistence',
        value: 'MySQL, PostgreSQL, schema and index design, query profiling, N+1 elimination, Eloquent ORM and migrations, Redis for caching and rate limiting, cache invalidation strategy'
    },
    {
        label: 'Auth & Security',
        value: 'Token auth (Sanctum, Passport, JWT), authorization boundaries and role-aware access, input validation and output escaping, rate limiting, secret handling and server-only configuration'
    },
    {
        label: 'Performance & Scale',
        value: 'Server-side caching layers, query and hot-path profiling, high-volume concurrent traffic, background processing, infrastructure cost reduction, production debugging under live load'
    },
    {
        label: 'Infrastructure & DevOps',
        value: 'Docker, AWS (EC2, ECS, RDS, S3), Nginx, GitHub Actions (CI/CD), Git and branching strategy, deployment and release support'
    },
    {
        label: 'Real-time',
        value: 'WebSockets (Socket.IO, Pusher), WebRTC signalling, connection lifecycle and reconnection, real-time state sync'
    },
    {
        label: 'Testing & Quality',
        value: 'PHPUnit, Jest, Vitest, Playwright, typed contracts, code review, CI gates on lint, types and build'
    },
    {
        label: 'Frontend',
        value: 'React.js, Next.js (SSR/SSG/ISR), Redux Toolkit and RTK Query, Tailwind CSS, reusable component systems, Core Web Vitals'
    },
    {
        label: 'Other',
        value: 'OOP, Data Structures & Algorithms, System Design, Agile/Scrum'
    }
];

export const experience: ExperienceEntry[] = [
    {
        role: 'Software Engineer L2',
        companies: [{ name: 'weDevs', url: 'https://wedevs.com' }],
        period: 'November 2024 - Present',
        location: 'Mirpur DOHS 1216, Dhaka, Bangladesh',
        bullets: [
            'Architect backend modules for subscriptions, licensing, payments, booking and vendor management, owning the data model and the versioned REST APIs above it.',
            'Own the telemetry pipeline of Appsero, a SaaS analytics and licensing platform for WordPress plugins: ingest from installed sites, the schema it lands in, and the aggregation behind install, version-spread and deactivation reporting.',
            'Design Appsero license management and update delivery, plus a public PHP client SDK kept backward compatible across every version already in the wild.',
            'Build weMail, a SaaS email marketing platform, across backend and frontend — campaigns, automation workflows, subscriber lists and segmentation, an email builder, and delivery through Amazon SES and SendGrid.',
            'Cut response times and infrastructure cost under concurrent load through indexing, caching and N+1 elimination.',
            'Deliver and maintain both SaaS products in production — release support and incident resolution across the stack — and ship the React/TypeScript dashboard screens those APIs serve.',
            'Guard critical flows with PHPUnit, Jest and Playwright in CI; review pull requests and mentor junior developers.'
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
            'Designed backend architecture, REST APIs and service-oriented modules for enterprise ERP systems on Laravel and MySQL.',
            'Modelled the schemas behind them — role-aware access, reporting queries, migrations without downtime.',
            'Optimized performance and automated manual business processes, cutting operational overhead.',
            'Built the Vue.js SPAs against those APIs, led technical discussions and mentored junior engineers.'
        ]
    },
    {
        role: 'Jr. Software Engineer',
        companies: [{ name: 'MaxSOP', url: 'https://maxsop.com/' }],
        period: 'May 2020 - June 2021',
        location: '27/2 Ram Babu Road, Mymensingh-2200',
        bullets: [
            'Built RESTful APIs and integrated third-party services on Laravel and MySQL across a range of client projects.',
            'Maintained full-stack applications on a clean MVC structure, from schema to the Vue.js interfaces on top.',
            'Collaborated in Agile teams on code reviews and gathered requirements directly from clients.'
        ]
    }
];

/**
 * Shipped work a reader can open. Kept to four so the section stays one block
 * on the printed page, and ordered backend-heaviest first.
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
            'Real-time chat and video platform in a Turborepo monorepo — a Socket.IO server handling messaging, presence and WebRTC signalling for one-to-one and group calls, behind JWT auth.',
        tech: ['Node.js', 'Socket.IO', 'WebRTC', 'JWT', 'React 19', 'Redux Toolkit'],
        url: 'https://chat.kzaman.com'
    },
    {
        name: 'laravel/vs-code-extension #273',
        description:
            "Merged upstream into Laravel's official VS Code extension: Blade delimiters now space themselves, shipped as an opt-out setting scoped to Blade files.",
        tech: ['TypeScript', 'VS Code API', 'Laravel'],
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
    'Comfortable with system design and scalable architecture, from schema and service boundaries through to deployment.',
    'Experience with real-time systems (WebSockets, Pusher, Socket.io) and third-party APIs (Stripe, Twilio).',
    'Strong foundation in Data Structures and Algorithms.',
    'Domain depth in multi-vendor marketplaces, payment gateways, SaaS licensing and usage analytics, ERP systems and WordPress plugin development.',
    'Estimate and deliver to schedule, communicate risk early, and keep knowledge transfer part of the team routine.'
];
