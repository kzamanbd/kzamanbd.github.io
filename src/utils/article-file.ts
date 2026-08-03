import type { ArticleFrontmatter } from '@/lib/article-schema';
import matter from 'gray-matter';

/**
 * Reading and writing the article files themselves. Serialisation is hand-rolled
 * rather than handed to a YAML library so the output matches the house style the
 * existing files use exactly: single-quoted scalars, 4-space indented list items,
 * a fixed field order, and optional fields omitted entirely rather than written
 * as empty values. A generic dump would reflow every file it touched.
 */

/** The URL slug a file maps to: extension and `NN-` ordering prefix stripped. */
export function fileSlug(fileName: string): string {
    return fileName.replace(/\.mdx?$/, '').replace(/^\d+-/, '');
}

/** The next zero-padded ordering prefix for a folder's existing file names. */
export function nextNumberPrefix(fileNames: string[]): string {
    const highest = fileNames.reduce((max, name) => {
        const matched = /^(\d+)-/.exec(name);
        return matched ? Math.max(max, Number(matched[1])) : max;
    }, 0);

    return String(highest + 1).padStart(2, '0');
}

/** Escapes a value for a single-quoted YAML scalar. */
function quote(value: string): string {
    return `'${value.replace(/'/g, "''")}'`;
}

function listBlock(field: string, items: string[]): string {
    if (items.length === 0) {
        return '';
    }
    return `${field}:\n${items.map((item) => `    - ${item}`).join('\n')}\n`;
}

/**
 * Writes a draft back out as a complete article file. Field order is fixed and
 * matches the existing articles, so a file round-tripped through the editor
 * produces a small, readable diff rather than a wholesale rewrite.
 */
export function serializeArticle(frontmatter: ArticleFrontmatter, body: string): string {
    const lines = [
        `title: ${quote(frontmatter.title)}`,
        `description: ${quote(frontmatter.description)}`,
        `date: ${quote(frontmatter.date)}`
    ];

    if (frontmatter.updated) {
        lines.push(`updated: ${quote(frontmatter.updated)}`);
    }

    let yaml = `${lines.join('\n')}\n`;
    yaml += listBlock('tags', frontmatter.tags);

    if (frontmatter.cover) {
        yaml += `cover: ${quote(frontmatter.cover)}\n`;
    }
    if (frontmatter.category) {
        yaml += `category: ${quote(frontmatter.category)}\n`;
    }
    if (frontmatter.difficulty) {
        yaml += `difficulty: ${quote(frontmatter.difficulty)}\n`;
    }

    yaml += listBlock('tech', frontmatter.tech);
    yaml += listBlock('learn', frontmatter.learn);

    if (frontmatter.series) {
        yaml += `series:\n    name: ${quote(frontmatter.series.name)}\n    order: ${frontmatter.series.order}\n`;
    }

    // Written only when true, matching the existing files: absence already means
    // published, so a `draft: false` line is noise on every article.
    if (frontmatter.draft) {
        yaml += 'draft: true\n';
    }

    // CRLF to match the rest of the repository (prettier is configured with
    // `endOfLine: 'crlf'`, and the existing article files follow it). Writing LF
    // here would turn every editor save into a whole-file diff.
    return `---\n${yaml}---\n\n${body.trim()}\n`.replace(/\r?\n/g, '\r\n');
}

/**
 * Splits a file into its frontmatter and body, filling in every list field.
 * The body is normalised to LF so the textarea round-trips it unchanged;
 * `serializeArticle` puts the CRLF endings back on the way out.
 */
export function parseArticleFile(raw: string): {
    frontmatter: ArticleFrontmatter;
    body: string;
} {
    const { data, content } = matter(raw);
    const stringList = (value: unknown): string[] =>
        Array.isArray(value)
            ? value.filter((item): item is string => typeof item === 'string')
            : [];

    const series = data.series as { name?: unknown; order?: unknown } | undefined;

    return {
        frontmatter: {
            title: typeof data.title === 'string' ? data.title : '',
            description: typeof data.description === 'string' ? data.description : '',
            date: typeof data.date === 'string' ? data.date : String(data.date ?? ''),
            updated: typeof data.updated === 'string' ? data.updated : undefined,
            tags: stringList(data.tags),
            cover: typeof data.cover === 'string' ? data.cover : undefined,
            category: typeof data.category === 'string' ? data.category : undefined,
            difficulty: data.difficulty,
            tech: stringList(data.tech),
            learn: stringList(data.learn),
            series:
                series && typeof series.name === 'string'
                    ? { name: series.name, order: Number(series.order) || 0 }
                    : undefined,
            draft: data.draft === true
        },
        body: content.trim().replace(/\r\n/g, '\n')
    };
}
