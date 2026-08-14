'use server';

import type {
    ArticleDraft,
    ArticleListItem,
    EditorSuggestions
} from '@/components/articles/editor/types';
import { slugifyHeading } from '@/lib/markdown';
import {
    fileSlug,
    nextNumberPrefix,
    parseArticleFile,
    serializeArticle
} from '@/utils/article-file';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Filesystem access for the article editor, development only.
 *
 * This site is server-rendered rather than statically exported, so unlike the
 * project this pattern is borrowed from, "it cannot run in production" is not
 * free. Two things enforce it:
 *
 *  1. the `.dev.ts` extension, which `next.config.ts` only treats as a route in
 *     development, so nothing here is compiled into the production build; and
 *  2. the runtime assertion below, in case a future refactor imports this module
 *     from a file that does ship.
 *
 * Every path is confined to `content/articles` and built from a slugified name,
 * so a crafted slug cannot escape the folder.
 */

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'content/articles');

function assertDevelopment(): void {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('The article editor is a development-only tool.');
    }
}

/** Markdown files in the content folder, or `[]` when it does not exist yet. */
function readFolder(): string[] {
    if (!fs.existsSync(ARTICLES_DIRECTORY)) {
        return [];
    }
    return fs.readdirSync(ARTICLES_DIRECTORY).filter((name) => /\.mdx?$/.test(name));
}

/** The file backing a slug, if one exists, so a save edits in place. */
function findFileBySlug(slug: string): string | undefined {
    return readFolder().find((name) => fileSlug(name) === slug);
}

/**
 * Rejects anything that is not a plain slug. `path.join` with a crafted slug
 * would otherwise walk out of the content folder.
 */
function safeSlug(slug: string): string {
    const cleaned = slugifyHeading(slug);
    if (!cleaned) {
        throw new Error('An article needs a title or an explicit file name.');
    }
    return cleaned;
}

export async function listArticles(): Promise<ArticleListItem[]> {
    assertDevelopment();

    return readFolder()
        .map((file) => {
            const raw = fs.readFileSync(path.join(ARTICLES_DIRECTORY, file), 'utf8');
            const { frontmatter } = parseArticleFile(raw);
            return {
                file,
                slug: fileSlug(file),
                title: frontmatter.title || fileSlug(file),
                date: frontmatter.date,
                draft: frontmatter.draft === true
            };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function loadArticle(file: string): Promise<ArticleDraft> {
    assertDevelopment();

    // Read by slug rather than by the given name, so the parameter can never
    // carry a path of its own.
    const target = findFileBySlug(fileSlug(path.basename(file)));
    if (!target) {
        throw new Error(`No article file matches ${file}.`);
    }

    const raw = fs.readFileSync(path.join(ARTICLES_DIRECTORY, target), 'utf8');
    return parseArticleFile(raw);
}

export async function saveArticle(draft: ArticleDraft, slug: string): Promise<{ file: string }> {
    assertDevelopment();

    const cleanSlug = safeSlug(slug);
    const existing = findFileBySlug(cleanSlug);
    // A new article takes the next ordering prefix; an existing one keeps the
    // file name it already has, so saving never renumbers the folder.
    const file = existing ?? `${nextNumberPrefix(readFolder())}-${cleanSlug}.md`;

    fs.mkdirSync(ARTICLES_DIRECTORY, { recursive: true });
    fs.writeFileSync(
        path.join(ARTICLES_DIRECTORY, file),
        serializeArticle(draft.frontmatter, draft.body),
        'utf8'
    );

    return { file };
}

export async function deleteArticle(slug: string): Promise<{ file: string } | null> {
    assertDevelopment();

    const file = findFileBySlug(safeSlug(slug));
    if (!file) {
        return null;
    }

    fs.unlinkSync(path.join(ARTICLES_DIRECTORY, file));
    return { file };
}

/**
 * Values already in use across the corpus, offered as autocomplete in the
 * frontmatter form so the taxonomy converges instead of drifting into three
 * spellings of the same tag.
 */
export async function getSuggestions(): Promise<EditorSuggestions> {
    assertDevelopment();

    const tags = new Set<string>();
    const tech = new Set<string>();
    const categories = new Set<string>();
    const series = new Set<string>();

    for (const file of readFolder()) {
        const raw = fs.readFileSync(path.join(ARTICLES_DIRECTORY, file), 'utf8');
        const { frontmatter } = parseArticleFile(raw);
        frontmatter.tags.forEach((tag) => tags.add(tag));
        frontmatter.tech.forEach((item) => tech.add(item));
        if (frontmatter.category) {
            categories.add(frontmatter.category);
        }
        if (frontmatter.series) {
            series.add(frontmatter.series.name);
        }
    }

    const sorted = (values: Set<string>) => [...values].sort((a, b) => a.localeCompare(b));

    return {
        tags: sorted(tags),
        tech: sorted(tech),
        categories: sorted(categories),
        series: sorted(series)
    };
}
