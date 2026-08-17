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
 * A merged pull request into somebody else's repository. Kept separate from
 * `projects` because the interesting facts are different ones: whose repo it is,
 * what the change was, and the diff that landed — not a tech stack and a demo
 * link.
 *
 * `mergedAt` is an ISO date so the card can render a real `<time>`; every field
 * here is checkable against the PR itself, so nothing is rounded or dressed up.
 */
export interface Contribution {
    /** `owner/repo`, shown verbatim so the upstream project is unambiguous. */
    repo: string;
    /** What that upstream repository is, for a reader who does not recognise it. */
    repoDescription: string;
    repoURL: string;
    title: string;
    number: number;
    pullRequestURL: string;
    mergedAt: string;
    description: string;
    tech: string[];
    diff: {
        additions: number;
        deletions: number;
        files: number;
    };
    links?: ProjectExternalLink[];
}

export const contributions: Contribution[] = [
    {
        repo: 'laravel/vs-code-extension',
        repoDescription: "Laravel's official VS Code extension",
        repoURL: 'https://github.com/laravel/vs-code-extension',
        title: 'Add auto-space in blade syntax',
        number: 273,
        pullRequestURL: 'https://github.com/laravel/vs-code-extension/pull/273',
        mergedAt: '2025-03-06',
        description:
            'Blade delimiters now space themselves: typing `{{`, `{!!` or `{{--` inserts the inner padding and leaves the caret between it, so the braces come out formatted instead of being fixed up by hand afterwards. Shipped as an opt-out setting and scoped to Blade files, so it cannot disturb any other syntax.',
        tech: ['TypeScript', 'VS Code API', 'Blade'],
        diff: { additions: 139, deletions: 1, files: 4 },
        links: [
            {
                url: 'https://github.com/laravel/vs-code-extension/issues/270',
                label: 'Issue #270'
            }
        ]
    }
];

// The public repositories worth a reader's time: what each one is, what it is
// built from, and where to see it running.
export const projects: Project[] = [
    {
        name: 'RTK Chat App',
        category: 'Real-time App',
        description:
            'A real-time chat platform in a Turborepo monorepo: a React 19 client with Redux Toolkit and RTK Query over an Express API, messaging on Socket.IO, and one-to-one and group video calls over WebRTC behind JWT auth.',
        tech: ['React', 'Redux Toolkit', 'Socket.IO', 'WebRTC'],
        repoURL: 'https://github.com/kzamanbd/rtk-chat-app',
        links: [{ url: 'https://chat.kzaman.com', label: 'Live app' }]
    },
    {
        name: 'Browser Terminal',
        category: 'Web App',
        description:
            'A web SSH client: xterm.js in the browser talking over socket.io to an ssh2 session on the server, so a shell is one URL away with no local client installed.',
        tech: ['TypeScript', 'ssh2', 'Socket.IO', 'xterm.js'],
        repoURL: 'https://github.com/kzamanbd/browser-terminal',
        links: [{ url: 'https://console.kzaman.com', label: 'Live app' }]
    },
    {
        name: 'WP Debug Suite',
        category: 'WordPress Plugin',
        description:
            'An all-in-one debugging toolkit for WordPress: query and hook inspection, log viewing, and site introspection from inside wp-admin, so a problem can be traced without shell access.',
        tech: ['PHP', 'WordPress', 'JavaScript'],
        repoURL: 'https://github.com/kzamanbd/debug-suite',
        links: [
            // Relative first: /plugins/debug-suite had no inbound link anywhere
            // on the site, so the one product page here was unreachable by a
            // reader and by a crawler alike.
            { url: '/plugins/debug-suite', label: 'Overview' },
            { url: 'https://wordpress.org/plugins/debug-suite/', label: 'WordPress.org' }
        ]
    },
    {
        name: 'Smriti AI',
        category: 'AI / Retrieval',
        description:
            'Question answering over your own documents, held to two rules: answer only from the retrieved passages, and cite them. Uploads are chunked and embedded with Gemini into PostgreSQL via pgvector, and a question that the corpus does not cover gets a refusal rather than a guess.',
        tech: ['Laravel', 'React', 'pgvector', 'Gemini'],
        repoURL: 'https://github.com/kzamanbd/smriti-ai'
    },
    {
        name: 'TypeOn',
        category: 'Web App',
        description:
            'A typing practice platform with real-time per-keystroke feedback, accuracy and speed history, and progress tracking across sessions.',
        tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
        repoURL: 'https://github.com/kzamanbd/typeon',
        links: [{ url: 'https://typeon.kzaman.com', label: 'Live app' }]
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
