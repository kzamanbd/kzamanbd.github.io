import type { CatalogSection } from '@/components/common/catalog-card';
import { BookOpen, Briefcase, Code, Cpu, Target } from 'lucide-react';

/**
 * Page-wise data for /now. Update `lastUpdated` whenever you revise this file:
 * the whole point of a "now" page is that the date is honest.
 */
export const nowMeta = {
    title: 'What I am doing now',
    subtitle:
        'A snapshot of what has my attention at the moment: the work, the side projects, and what I am trying to get better at.',
    lastUpdated: 'August 2026'
};

export const nowQuote = 'Ship the boring thing that works, then make it fast.';

export const nowSections: CatalogSection[] = [
    {
        title: 'Work',
        Icon: Briefcase,
        intro: 'Software Engineer L2 at weDevs, on the Dokan multi-vendor marketplace platform.',
        wide: true,
        blocks: [
            {
                kind: 'list',
                items: [
                    'Building and maintaining marketplace features that have to hold up across thousands of stores',
                    'Payment gateway integrations and the reconciliation work that comes with them',
                    'Tracking down the queries that quietly got slow as the data grew'
                ]
            },
            { kind: 'tags', label: 'Day to day', tags: ['PHP', 'Laravel', 'WordPress', 'MySQL'] }
        ]
    },
    {
        title: 'Building',
        Icon: Code,
        blocks: [
            {
                kind: 'list',
                items: [
                    'This site, rebuilt from scratch on Next.js 16',
                    'Small internal tools that remove repetitive work'
                ]
            }
        ]
    },
    {
        title: 'Learning',
        Icon: Cpu,
        blocks: [
            {
                kind: 'tags',
                tags: ['System design', 'Query optimization', 'Caching strategies', 'AWS']
            }
        ]
    },
    {
        title: 'Reading',
        Icon: BookOpen,
        blocks: [
            {
                kind: 'text',
                text: 'Mostly engineering write-ups and postmortems. A good incident report teaches more than a chapter of theory.'
            }
        ]
    },
    {
        title: 'Goals',
        Icon: Target,
        blocks: [
            {
                kind: 'list',
                items: [
                    'Finish the BSc in Computer Science and Engineering',
                    'Write more of what I learn down, here rather than in a notes app'
                ]
            }
        ]
    }
];
