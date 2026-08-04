import type { CatalogSection } from '@/components/common/catalog-card';
import {
    Bot,
    Cloud,
    Code2,
    Database,
    Headphones,
    Keyboard,
    Monitor,
    Server,
    Terminal,
    Wrench
} from 'lucide-react';

/** Page-wise data for /uses: the hardware and software I actually work in. */
export const usesMeta = {
    title: 'What I use',
    subtitle:
        'The hardware, editors and services I reach for every day. Nothing exotic; things that stay out of the way.'
};

// NOTE: the four hardware sections below (Workstation, Displays, Input, Audio)
// describe the setup without naming parts. Swap the `text` for the real models
// when you want the page to be specific; nothing else has to change.
export const usesSections: CatalogSection[] = [
    {
        title: 'Workstation',
        Icon: Monitor,
        wide: true,
        blocks: [
            {
                kind: 'text',
                text: 'A desktop tower built for compile times rather than frame rates: enough cores to run a container stack and a dev server at once, enough RAM that nothing swaps, and NVMe storage so a cold `pnpm install` is not a coffee break.'
            }
        ]
    },
    {
        title: 'Displays',
        Icon: Monitor,
        blocks: [
            {
                kind: 'text',
                text: 'Two panels: the main one holds the editor, the second holds logs, the browser and whatever is currently misbehaving. Two screens beats one large one — a window boundary is a better divider than a maximise button.'
            }
        ]
    },
    {
        title: 'Keyboard & mouse',
        Icon: Keyboard,
        blocks: [
            {
                kind: 'text',
                text: 'A compact mechanical keyboard — no numpad, so the mouse sits closer to the home row — and an ergonomic mouse that survives a full day without wrist ache.'
            }
        ]
    },
    {
        title: 'Audio',
        Icon: Headphones,
        blocks: [
            {
                kind: 'text',
                text: 'Over-ear headphones that make open-plan noise disappear, and desk speakers for calls and for the stretches where music helps more than silence.'
            }
        ]
    },
    {
        title: 'Editor & terminal',
        Icon: Code2,
        wide: true,
        blocks: [
            {
                kind: 'tags',
                label: 'Editing',
                tags: ['VS Code', 'PhpStorm', 'Vim keybindings']
            },
            {
                kind: 'tags',
                label: 'Shell',
                tags: ['zsh', 'Oh My Zsh', 'tmux', 'git CLI']
            }
        ]
    },
    {
        title: 'Languages',
        Icon: Terminal,
        blocks: [
            {
                kind: 'tags',
                tags: ['PHP', 'TypeScript', 'JavaScript', 'SQL', 'Bash']
            }
        ]
    },
    {
        title: 'Frameworks',
        Icon: Monitor,
        blocks: [
            {
                kind: 'tags',
                tags: ['Laravel', 'Next.js', 'React', 'Vue', 'Nuxt', 'Express']
            }
        ]
    },
    {
        title: 'Data',
        Icon: Database,
        blocks: [
            {
                kind: 'tags',
                tags: ['MySQL', 'PostgreSQL', 'Redis', 'Firebase']
            }
        ]
    },
    {
        title: 'Infrastructure',
        Icon: Cloud,
        blocks: [
            {
                kind: 'tags',
                tags: [
                    'Docker',
                    'AWS EC2',
                    'AWS ECS',
                    'AWS RDS',
                    'AWS S3',
                    'Nginx',
                    'GitHub Actions'
                ]
            }
        ]
    },
    {
        title: 'Self-hosting',
        Icon: Server,
        intro: 'A small always-on box for the things that should not depend on someone else staying in business.',
        blocks: [
            {
                kind: 'tags',
                tags: ['Docker Compose', 'Nginx', 'Cloudflare Tunnel', "Let's Encrypt"]
            }
        ]
    },
    {
        title: 'AI tooling',
        Icon: Bot,
        intro: 'Used as a fast pair, not as an oracle: everything it writes gets read before it ships.',
        blocks: [
            {
                kind: 'tags',
                tags: ['Claude Code', 'GitHub Copilot', 'ChatGPT']
            }
        ]
    },
    {
        title: 'Developer tools',
        Icon: Wrench,
        blocks: [
            {
                kind: 'tags',
                tags: ['Git', 'GitHub', 'Postman', 'TablePlus', 'pnpm', 'Docker Desktop']
            }
        ]
    }
];
