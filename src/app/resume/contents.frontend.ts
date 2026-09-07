import type {
    EducationEntry,
    ExperienceEntry,
    ResumeProject,
    SkillRow
} from '@/components/resume/types';
import { careerExperience } from '@/lib/metadata';

/**
 * The frontend-focused cut of the resume.
 *
 * Same shape and the same export names as `contents.ts`, so switching which
 * version `page.tsx` renders is one import line and nothing else. The facts are
 * identical to the full-stack version — what changes is the order they arrive
 * in: React, Next.js, TypeScript and component architecture lead, and the
 * Laravel and infrastructure work is kept but demoted to supporting evidence.
 */

export const professionalSummary = `Frontend engineer with ${careerExperience}+ years building production React, Next.js and TypeScript applications, from component architecture and design systems through API integration, state management and performance work. Comfortable owning a feature from requirement analysis to deployment, and the API contract underneath it. Track record on high-traffic multi-vendor marketplace products and data-dense SaaS analytics dashboards, with a focus on Core Web Vitals, reusable UI systems and code that stays maintainable after the first release.`;

export const skillRows: SkillRow[] = [
    {
        label: 'Core Frontend',
        value: 'React.js, Next.js (App Router, SSR/SSG/ISR), TypeScript/JavaScript (ES6+), Vue.js, HTML5, CSS3, Tailwind CSS, CSS Modules'
    },
    {
        label: 'UI Architecture',
        value: 'Reusable component systems and design tokens, shared UI libraries across products, Turborepo monorepos, data-dense dashboards and charts, theming, responsive layout, accessibility (semantic markup, keyboard and focus behaviour), cross-browser and cross-device compatibility'
    },
    {
        label: 'State & Data',
        value: 'Redux Toolkit, RTK Query, Context API, cache design and invalidation, optimistic updates and rollback, race conditions and cancellation, idempotent retries, real-time sync over WebSockets (Socket.IO, Pusher), auth and authorization boundaries'
    },
    {
        label: 'Performance',
        value: 'Core Web Vitals (LCP, CLS, INP), bundle budgets and code splitting, lazy loading, render profiling and re-render elimination, image optimization, PWA offline caching, server-side caching'
    },
    {
        label: 'Testing & Quality',
        value: 'Jest, Vitest, Playwright, PHPUnit, typed contracts, code review, CI gates on lint, types and build'
    },
    {
        label: 'APIs & Backend',
        value: 'REST API design and versioning, async data flows and error handling, token auth (Sanctum, Passport), Node.js/Express, PHP 8+ (Laravel), Eloquent ORM and migrations, service boundaries, queue-backed workflows'
    },
    {
        label: 'Databases',
        value: 'MySQL, PostgreSQL, Redis (caching), schema and index design, query profiling'
    },
    {
        label: 'DevOps & Tools',
        value: 'Git and branching strategy, GitHub Actions (CI/CD), Docker, AWS (EC2, ECS, RDS, S3), Nginx'
    },
    {
        label: 'Other',
        value: 'OOP, Data Structures & Algorithms, System Design, SEO, Web security fundamentals, Agile/Scrum'
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
            'Own frontend features end-to-end across Dokan and Appsero — requirement analysis, React/TypeScript interfaces, the APIs behind them, deployment and support.',
            'Design the frontend architecture for revenue-critical modules (subscriptions, licensing, payments, booking, vendor management), owning the state boundaries and the API contracts beneath them.',
            "Build Appsero's dashboard as a data-dense analytics surface — usage and version-spread charts, filterable tables over site telemetry, product, plan and license management views.",
            'Extract shared components out of duplicated screens into a reusable layer, so one treatment ships across products instead of being rebuilt per feature.',
            'Profile and optimize the browser side — re-renders, bundle splitting, asset delivery, Core Web Vitals — and resolve production issues under live user load.',
            'Guard critical flows with Jest and Playwright in CI; review pull requests and mentor junior developers on component structure, typing and accessibility.'
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
            'Built enterprise ERP frontends as Vue.js single-page apps — data-heavy tables, filters, multi-step forms and role-aware views.',
            'Established the reusable component and layout conventions those apps were composed from, so new modules were assembled rather than copied.',
            'Designed the REST APIs those interfaces consumed, owning the contract on both sides rather than waiting on a handoff.',
            'Optimized performance, led technical discussions and mentored junior engineers.'
        ]
    },
    {
        role: 'Jr. Software Engineer',
        companies: [{ name: 'MaxSOP', url: 'https://maxsop.com/' }],
        logo: '/images/maxsop-logo.svg',
        period: 'May 2020 - June 2021',
        location: '27/2 Ram Babu Road, Mymensingh-2200',
        bullets: [
            'Built responsive, cross-browser interfaces with reusable components on Vue.js, Laravel and MySQL across a range of client projects.',
            'Integrated RESTful APIs and third-party services, handling async state, loading and failure cases.',
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
            'Real-time chat and video platform structured as a Turborepo monorepo — app, shared UI and config as separate packages. Messaging over Socket.IO, one-to-one and group calls over WebRTC, behind JWT auth.',
        tech: ['React 19', 'Redux Toolkit', 'RTK Query', 'Socket.IO', 'WebRTC', 'Turborepo'],
        url: 'https://chat.kzaman.com'
    },
    {
        name: 'TypeOn',
        description:
            'Typing practice platform with per-keystroke feedback and speed, accuracy and progress tracked across sessions.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        url: 'https://typeon.kzaman.com'
    },
    {
        name: 'Browser Terminal',
        description:
            'Web SSH client: xterm.js in the browser over socket.io to an ssh2 session, so a shell is one URL away with no local client installed.',
        tech: ['TypeScript', 'xterm.js', 'Socket.IO'],
        url: 'https://console.kzaman.com'
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
    'Treat accessibility, semantic markup and SEO as part of the build, not a later pass.',
    'Experience with real-time systems (WebSockets, Pusher, Socket.io) and third-party APIs (Stripe, Twilio).',
    'Comfortable with system design and scalable architecture, on both the component and the service side.',
    'Strong foundation in Data Structures and Algorithms.',
    'Estimate and deliver to schedule, communicate risk early, and keep knowledge transfer part of the team routine.'
];
