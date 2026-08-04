import type { Article } from '@/lib/posts';
import { renderMarkdown, slugifyHeading } from '@/lib/markdown';
import { coverGradientForSlug } from '@/utils/article-cover';
import { fileSlug, parseArticleFile } from '@/utils/article-file';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Loads an article for the editor's full-page preview, drafts included.
 *
 * `getArticle` deliberately returns null for anything marked `draft: true`, so
 * an unfinished post can never be linked, crawled or fed to the sitemap. A draft
 * is exactly what the preview is for, so this reads the file itself rather than
 * relaxing that rule for everyone.
 *
 * Development only, enforced the same two ways `actions.dev.ts` is: the `.dev.ts`
 * extension keeps it out of the production build, and the assertion catches a
 * future refactor that imports it from a file which does ship.
 */

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'content/articles');

function assertDevelopment(): void {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('The article preview is a development-only tool.');
    }
}

/** Estimated at the same 200 wpm the published pipeline uses. */
function estimateReadingMinutes(content: string): number {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

export async function loadArticleForPreview(slug: string): Promise<Article | null> {
    assertDevelopment();

    // A crafted slug must not walk out of the content folder, so the incoming
    // value is only ever compared against names already read from disk.
    const wanted = slugifyHeading(slug);
    if (!wanted || !fs.existsSync(ARTICLES_DIRECTORY)) return null;

    const fileName = fs
        .readdirSync(ARTICLES_DIRECTORY)
        .filter((name) => /\.mdx?$/.test(name))
        .find((name) => fileSlug(name) === wanted);
    if (!fileName) return null;

    const raw = fs.readFileSync(path.join(ARTICLES_DIRECTORY, fileName), 'utf8');
    const { frontmatter, body } = parseArticleFile(raw);
    const { html, toc } = await renderMarkdown(body);

    return {
        slug: wanted,
        title: frontmatter.title || wanted,
        description: frontmatter.description ?? '',
        // A draft often has no date yet. The published pipeline throws on that,
        // because an invalid date poisons the feeds; here it would only stop the
        // author seeing their own work, so today stands in.
        date: frontmatter.date || new Date().toISOString().slice(0, 10),
        updated: frontmatter.updated,
        tags: frontmatter.tags ?? [],
        cover: frontmatter.cover,
        coverColors: coverGradientForSlug(wanted),
        readingMinutes: estimateReadingMinutes(body),
        category: frontmatter.category,
        difficulty: frontmatter.difficulty,
        series: frontmatter.series,
        html,
        toc,
        learn: frontmatter.learn ?? [],
        tech: frontmatter.tech ?? []
    };
}
