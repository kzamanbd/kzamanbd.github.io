import type { CatalogSection } from '@/components/common/catalog-card';
import { Cloud, Code2, Database, Keyboard, Monitor, Terminal } from 'lucide-react';

/** Page-wise data for /uses: the hardware and software I actually work in. */
export const usesMeta = {
    title: 'What I use',
    subtitle:
        'The hardware, editors and services I reach for every day. Nothing exotic; things that stay out of the way.'
};

export const usesSections: CatalogSection[] = [
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
        title: 'Desk',
        Icon: Keyboard,
        blocks: [
            {
                kind: 'text',
                text: 'A mechanical keyboard, an external monitor, and a pair of headphones that make open-plan noise disappear.'
            }
        ]
    }
];
