/**
 * Selected work, curated from real public repositories.
 *
 * Descriptions are honest summaries of what each repo actually does. Add real
 * outcome numbers (installs, downloads, stars) through `links` only where they
 * can be backed up; never invent a metric.
 */
export interface ProjectExternalLink {
    url: string;
    label: string;
}

export interface Project {
    name: string;
    category: string;
    description: string;
    tech: string[];
    repoURL: string;
    links?: ProjectExternalLink[];
}

/**
 * How many shipped projects stay on screen before the "Show more" toggle. Bump
 * this when a project should be visible without a click.
 */
export const collapsedShippedProjectCount = 4;

// Things published for other people to install: the WordPress plugin
// directory, the Chrome Web Store, a GitHub Action. These carry `links` to the
// distribution page alongside the source.
export const shippedProjects: Project[] = [
    {
        name: 'WP Debug Suite',
        category: 'WordPress Plugin',
        description:
            'An all-in-one debugging toolkit for WordPress: query and hook inspection, log viewing, and site introspection from inside wp-admin, so a problem can be traced without shell access.',
        tech: ['PHP', 'WordPress', 'JavaScript'],
        repoURL: 'https://github.com/kzamanbd/debug-suite',
        links: [
            {
                url: 'https://wordpress.org/plugins/debug-suite/',
                label: 'WordPress.org'
            }
        ]
    },
    {
        name: 'Codeforces Stats',
        category: 'GitHub Action',
        description:
            'A GitHub Action that renders a live Codeforces activity card and rating badge for a profile README, regenerated on a schedule so the numbers never go stale.',
        tech: ['Python', 'GitHub Actions', 'SVG'],
        repoURL: 'https://github.com/kzamanbd/cf-stats'
    },
    {
        name: 'GitHub Stats',
        category: 'GitHub Action',
        description:
            'Generates richer GitHub statistics images for a profile, counting contributions from private repositories that the default cards leave out.',
        tech: ['Python', 'GitHub Actions', 'GraphQL'],
        repoURL: 'https://github.com/kzamanbd/github-stats'
    },
    {
        name: 'Fly CLI',
        category: 'Developer Tool',
        description:
            'A Go command line wrapper over Docker Compose that collapses the everyday container operations, start, stop, logs, exec, into short commands with sane defaults.',
        tech: ['Go', 'Docker', 'CLI'],
        repoURL: 'https://github.com/kzamanbd/fly-cli'
    },
    {
        name: 'WP Magic Login',
        category: 'WordPress Plugin',
        description:
            'Token based passwordless sign-in for WordPress, driven from an external management portal: a signed token in the query string authenticates a known user and drops them straight into wp-admin.',
        tech: ['PHP', 'WordPress', 'Auth'],
        repoURL: 'https://github.com/kzamanbd/wp-magic-login'
    },
    {
        name: 'Talent Portal',
        category: 'WordPress Plugin',
        description:
            'A recruitment plugin that collects applications through a front-end form, stores each submission as a first-class record, and gives HR a review queue inside the WordPress admin.',
        tech: ['PHP', 'WordPress', 'MySQL'],
        repoURL: 'https://github.com/kzamanbd/talent-portal'
    },
    {
        name: 'AI Content Finder',
        category: 'Chrome Extension',
        description:
            'A browser extension that detects AI generated media on a page and makes it downloadable, working around players that hide the underlying source URL.',
        tech: ['JavaScript', 'Chrome APIs'],
        repoURL: 'https://github.com/kzamanbd/ai-extension'
    },
    {
        name: 'WP Docker',
        category: 'Dev Environment',
        description:
            'A small Docker Compose stack for local WordPress work, with a Cloudflare Tunnel wired in so a machine-local site is reachable over a real HTTPS hostname for webhook and OAuth testing.',
        tech: ['Docker', 'Shell', 'Cloudflare'],
        repoURL: 'https://github.com/kzamanbd/wp-docker',
        links: [{ url: 'https://wp.kzaman.me', label: 'Live' }]
    }
];

// Things built to answer a question or scratch an itch, kept public so the
// approach is readable even where the project is deliberately a prototype.
export const personalProjects: Project[] = [
    {
        name: 'DraftScripts',
        category: 'Monorepo',
        description:
            'A full-stack monorepo of shared component libraries, applications, and utilities, used as the proving ground for patterns before they go into production work.',
        tech: ['TypeScript', 'React', 'Vue', 'Node.js'],
        repoURL: 'https://github.com/kzamanbd/draftscripts',
        links: [{ url: 'https://draftscripts.com', label: 'Live' }]
    },
    {
        name: 'Laravel Tenancy',
        category: 'SaaS Boilerplate',
        description:
            'A multi-tenant Laravel starter: per-tenant database resolution, subdomain routing, and tenant-aware migrations, so a SaaS can start with isolation already in place rather than retrofitted.',
        tech: ['Laravel', 'PHP', 'TypeScript', 'MySQL'],
        repoURL: 'https://github.com/kzamanbd/laravel-tenancy',
        links: [{ url: 'https://www.draftscripts.com/tenancy', label: 'Demo' }]
    },
    {
        name: 'DPMS',
        category: 'Network Tooling',
        description:
            'A device monitoring and control proof of concept: ping and TCP reachability checks, PJLink projector control with telemetry, and Wake-on-LAN including a cross-VLAN relay strategy.',
        tech: ['TypeScript', 'Node.js', 'PJLink', 'WoL'],
        repoURL: 'https://github.com/kzamanbd/dpms'
    },
    {
        name: 'TypeOn',
        category: 'Web App',
        description:
            'A typing practice platform with real-time per-keystroke feedback, accuracy and speed history, and progress tracking across sessions.',
        tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
        repoURL: 'https://github.com/kzamanbd/typeon',
        links: [{ url: 'https://typeon.kzaman.me', label: 'Live' }]
    },
    {
        name: 'Browser Terminal',
        category: 'Web App',
        description:
            'A web SSH client: xterm.js in the browser talking over socket.io to an ssh2 session on the server, so a shell is one URL away with no local client installed.',
        tech: ['TypeScript', 'ssh2', 'Socket.IO', 'xterm.js'],
        repoURL: 'https://github.com/kzamanbd/browser-terminal',
        links: [{ url: 'https://console.kzaman.me', label: 'Live' }]
    },
    {
        name: 'Task Queue',
        category: 'Backend System',
        description:
            'A PHP 8.2 background job system built from scratch: worker management, distributed processing, delayed and scheduled jobs, retries, and a real-time monitor for the queue.',
        tech: ['PHP', 'Redis', 'Queues', 'PSR-4'],
        repoURL: 'https://github.com/kzamanbd/bs23-task-queue'
    }
];
