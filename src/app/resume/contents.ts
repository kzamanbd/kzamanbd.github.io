import type { EducationEntry, ExperienceEntry, SkillRow } from '@/components/resume/types';
import { careerExperience } from '@/lib/metadata';

export const professionalSummary = `Strong problem-solving skills with a focus on scalable system design, performance optimization, and clean, maintainable code. ${careerExperience}+ years of experience engineering high-throughput web applications, APIs, and distributed systems. Deep expertise in PHP (Laravel) and modern JavaScript frameworks (React, Vue). Proven track record of delivering high-impact solutions across multi-vendor platforms and enterprise ERP systems, bridging product vision with rigorous engineering standards.`;

export const skillRows: SkillRow[] = [
    {
        label: 'Languages & Frameworks',
        value: 'JavaScript/TypeScript (ES6+), React.js, Next.js, Redux/Redux Toolkit, Vue.js, Express.js, PHP 8+ (Laravel)'
    },
    {
        label: 'Frontend',
        value: 'JSX, Virtual DOM, Component Lifecycle, React Hooks, State Management, HTML5, CSS3, Tailwind CSS, Responsive UI'
    },
    {
        label: 'Backend & Architecture',
        value: 'REST APIs, Microservices, MVC Architecture, WebSockets, Event-driven systems, Eloquent ORM, Migrations, Queues & Job Scheduling, Laravel Sanctum & Passport'
    },
    {
        label: 'Databases',
        value: 'MySQL, PostgreSQL, Redis (caching & Laravel Horizon queues), query optimization'
    },
    {
        label: 'DevOps & Tools',
        value: 'Git, NPM, Docker, GitHub Actions (CI/CD), AWS (EC2, ECS, RDS, S3), Nginx, Apache'
    },
    { label: 'Testing & Quality', value: 'Jest, Vitest, PHPUnit, Playwright' },
    {
        label: 'Other',
        value: 'OOP, Data Structures & Algorithms, System Design, Agile/Scrum'
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
            'Design and develop complex features end-to-end across multiple production products, from design through deployment and ongoing support.',
            'Architect and ship revenue-critical modules (subscriptions, booking systems, multi-gateway payments, and vendor management) built to handle high-volume, concurrent traffic.',
            'Investigate and resolve difficult production bugs across the full stack, restoring reliability under live user load.',
            'Profile and optimize slow queries and application hot paths (indexing, caching, N+1 elimination), cutting response times and infrastructure cost.',
            'Build robust RESTful APIs and React interfaces, turning complex requirements into clean, reusable, well-tested code.',
            'Participate in code reviews and mentor junior developers, contributing to engineering standards and overall code quality.'
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
            'Built and shipped full-stack web applications end-to-end across multiple business domains using Laravel, Vue.js, and MySQL.',
            'Designed scalable backend architectures, REST APIs, and service-oriented modules supporting diverse product workflows.',
            'Translated business requirements into clean, maintainable features spanning frontend, backend, and database layers.',
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
            'Developed and maintained full-stack web applications across a range of client projects using Laravel, Vue.js, and MySQL.',
            'Implemented clean MVC architecture and reusable components for scalable, maintainable codebases.',
            'Built RESTful APIs and integrated third-party services to extend application functionality.',
            'Collaborated in Agile teams on code reviews and gathered requirements directly from clients to deliver tailored solutions.'
        ]
    }
];

export const education: EducationEntry[] = [
    {
        degree: 'BSc in Computer Science & Engineering (Running)',
        institution: 'Southeast University',
        period: '2022 - Present',
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
    'Strong foundation in Data Structures and Algorithms',
    'Experience with real-time systems (WebSockets, Pusher, Socket.io)',
    'Familiar with third-party APIs (Stripe, Twilio)',
    'Comfortable with system design and scalable architecture',
    'Design, code, test, and implement according to software design specifications following standard coding styles and practices.',
    'Analyze the requirements and understand the deliverables.',
    'Ensure that projects are accurately estimated and delivered to schedule.',
    'Participate in code/design reviews.',
    'Collaborate with team members and ensure knowledge transfer.',
    'Actively contribute to the process of continual improvement, concerning self, team, and systems.'
];
