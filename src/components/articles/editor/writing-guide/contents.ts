export interface GuideEntry {
    label: string;
    note: string;
    snippet: string;
}

export interface GuideGroup {
    title: string;
    entries: GuideEntry[];
}

/**
 * The authoritative catalogue of what an article body can contain here. Every
 * snippet is exactly what `renderMarkdown` handles, so inserting one and looking
 * at the preview is the fastest way to answer "is this supported?".
 *
 * Keep it in step with `src/lib/markdown.ts`: a feature added there and missing
 * here is a feature nobody will ever use.
 */
export const guideGroups: GuideGroup[] = [
    {
        title: 'Text',
        entries: [
            {
                label: 'Emphasis',
                note: 'Bold, italic, inline code and strikethrough behave as usual.',
                snippet:
                    'Ordinary text with **bold**, _italic_, `inline code` and ~~strikethrough~~.'
            },
            {
                label: 'Highlight, sub, sup',
                note: 'Custom inline extensions: ==text==, ~sub~ and ^sup^.',
                snippet: 'Water is H~2~O, ten squared is 10^2^, and ==this stands out==.'
            },
            {
                label: 'Link',
                note: 'Relative links stay in-app; external ones open as written.',
                snippet: 'See [the articles index](/articles).'
            },
            {
                label: 'Footnote',
                note: 'Collected at the end of the article automatically.',
                snippet: 'A claim that needs a source.[^1]\n\n[^1]: Where the claim comes from.'
            }
        ]
    },
    {
        title: 'Structure',
        entries: [
            {
                label: 'Headings',
                note: 'Use ## and ### only: the title supplies the h1, and h4+ gets no anchor or table-of-contents entry.',
                snippet: '## A section\n\n### A subsection'
            },
            {
                label: 'Lists',
                note: 'Bullet and numbered lists, nested by indentation.',
                snippet: '* First point\n* Second point\n    * A nested one'
            },
            {
                label: 'Table',
                note: 'Rendered in a scrollable window that carries the cursor spotlight.',
                snippet: '| Column | Meaning |\n| --- | --- |\n| `value` | What it does |'
            },
            {
                label: 'Quote',
                note: 'A plain blockquote, for quoting rather than for asides.',
                snippet: '> Someone else said this.'
            }
        ]
    },
    {
        title: 'Callouts and code',
        entries: [
            {
                label: 'Note callout',
                note: 'The house style for an aside, in preference to the [!NOTE] syntax.',
                snippet: '> **Note:** the detail worth pausing on.'
            },
            {
                label: 'Warning callout',
                note: 'For the thing that will bite the reader.',
                snippet: '> **Warning:** this deletes data and cannot be undone.'
            },
            {
                label: 'Code fence',
                note: 'Tag the language: Shiki highlights it and a copy button is added.',
                snippet:
                    '```ts\nexport function example(): string {\n    return "highlighted by Shiki";\n}\n```'
            },
            {
                label: 'Mermaid diagram',
                note: 'A parse error degrades silently to a plain block, so check the preview.',
                snippet: '```mermaid\nflowchart LR\n    Request --> Handler --> Response\n```'
            },
            {
                label: 'Image',
                note: 'Body images open full screen when clicked on the published page.',
                snippet: '![What the image shows](/images/example.png)'
            }
        ]
    }
];
