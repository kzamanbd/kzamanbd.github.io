import { spotlightSurfaceAttribute } from '@/components/common/spotlight-surface';
import { nameToEmoji } from 'gemoji';
import { marked, type Token, type Tokens, type TokenizerAndRendererExtension } from 'marked';
import markedAlert from 'marked-alert';
import { markedEmoji } from 'marked-emoji';
import markedFootnote from 'marked-footnote';
import { codeToHtml } from 'shiki';

/** A heading in the article body, used to build the table of contents. */
export interface TocItem {
    id: string;
    text: string;
    /** Heading level: 2 for `##`, 3 for `###`. */
    level: number;
}

function escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// A token that carries already inline-tokenized children, so nested Markdown
// (bold, code, links) inside the wrapper still renders.
type InlineWrapToken = Tokens.Generic & { tokens: Token[] };

/**
 * A small inline extension that wraps `regex`-matched text in a single `tag`
 * (`<mark>`, `<sub>`, `<sup>`). The captured inner text is inline-tokenized so it
 * keeps formatting; `startNeedle` tells marked where a match might begin. These
 * are tried before marked's core tokenizers, so each regex is anchored (`^`) and
 * self-guarding (see subscript's `~~` guard).
 */
function inlineWrapExtension(
    name: string,
    regex: RegExp,
    startNeedle: string,
    tag: string
): TokenizerAndRendererExtension {
    return {
        name,
        level: 'inline',
        start(src) {
            const index = src.indexOf(startNeedle);
            return index < 0 ? undefined : index;
        },
        tokenizer(src) {
            const match = regex.exec(src);
            if (!match) return undefined;
            return {
                type: name,
                raw: match[0],
                tokens: this.lexer.inlineTokens(match[1] ?? '')
            };
        },
        renderer(token) {
            const inner = this.parser.parseInline((token as InlineWrapToken).tokens);
            return `<${tag}>${inner}</${tag}>`;
        }
    };
}

// Highlight: ==text== -> <mark>.
const highlightExtension = inlineWrapExtension('highlight', /^==(?=\S)([^\n]+?)==/, '==', 'mark');
// Subscript: ~text~ -> <sub>. The (?!~) guards reject ~~strikethrough~~ so it
// falls through to marked's core GFM `del` tokenizer.
const subscriptExtension = inlineWrapExtension('subscript', /^~(?!~)([^~\n]+?)~(?!~)/, '~', 'sub');
// Superscript: ^text^ -> <sup>.
const superscriptExtension = inlineWrapExtension('superscript', /^\^([^^\n]+?)\^/, '^', 'sup');

// A term line followed by one or more `: definition` lines.
type DefinitionListToken = Tokens.Generic & {
    termTokens: Token[];
    defs: { tokens: Token[] }[];
};
const DEFINITION_LIST_PATTERN = /^([^\n:][^\n]*)\n((?::[ \t][^\n]+(?:\n|$))+)/;

const definitionListExtension: TokenizerAndRendererExtension = {
    name: 'definitionList',
    level: 'block',
    start(src) {
        const match = src.match(/\n[^\n:][^\n]*\n:[ \t]/);
        return match?.index === undefined ? undefined : match.index + 1;
    },
    tokenizer(src) {
        const match = DEFINITION_LIST_PATTERN.exec(src);
        if (!match) return undefined;
        const defs = (match[2] ?? '')
            .split('\n')
            .filter((line) => line.startsWith(':'))
            .map((line) => line.replace(/^:[ \t]/, ''));
        return {
            type: 'definitionList',
            raw: match[0],
            termTokens: this.lexer.inlineTokens((match[1] ?? '').trim()),
            defs: defs.map((text) => ({ tokens: this.lexer.inlineTokens(text) }))
        };
    },
    renderer(token) {
        const definitionToken = token as DefinitionListToken;
        const term = `<dt>${this.parser.parseInline(definitionToken.termTokens)}</dt>`;
        const definitions = definitionToken.defs
            .map((def) => `<dd>${this.parser.parseInline(def.tokens)}</dd>`)
            .join('');
        return `<dl>${term}${definitions}</dl>`;
    }
};

// A GitHub shortcode -> Unicode map for :emoji: syntax, from GitHub's own gemoji
// dataset; resolved at render time, so no external images or runtime requests.
const emojiMap: Record<string, string> = nameToEmoji;

// Syntax highlighting with two themes baked into the markup; the article
// stylesheet picks the dark palette so code matches the site theme.
type CodeToken = Tokens.Code & { highlighted?: string };
const CODE_THEMES = { light: 'github-light', dark: 'github-dark' } as const;

interface CodeMeta {
    lang: string;
    filePath?: string;
}

/**
 * The file path a fence points at, in precedence order: an explicit
 * `title="..."` wins, then a bare trailing path. Anything else in the info
 * string is some other `key=value` attribute, not a path, so it yields none.
 */
function resolveFilePath(titled: RegExpMatchArray | null, remainder: string): string | undefined {
    if (titled) return titled[1];
    if (remainder && !remainder.includes('=')) return remainder;
    return undefined;
}

/**
 * Parses a fenced block's info string into a language plus an optional file path
 * (where the snippet belongs). Supports `lang path/to/file.ext` and
 * `lang title="path/to/file.ext"`.
 */
function parseCodeMeta(token: CodeToken): CodeMeta {
    const info = (token.lang ?? '').trim();
    if (!info) return { lang: 'text' };
    const [lang, ...rest] = info.split(/\s+/);
    const titled = info.match(/title="([^"]+)"/);
    const remainder = rest.join(' ').trim();
    return { lang: lang || 'text', filePath: resolveFilePath(titled, remainder) };
}

/** Header label: the file extension when a path is given, else the language. */
function codeLabel(lang: string, filePath?: string): string {
    if (!filePath) return lang;
    const name = filePath.split('/').pop() ?? filePath;
    const dot = name.lastIndexOf('.');
    return dot > 0 ? name.slice(dot + 1) : lang;
}

/**
 * Wraps highlighted code in a header (language/extension badge plus optional
 * file path) with a copy-button slot the client fills in (see CodeCopy).
 */
function renderCodeBlock(highlighted: string, lang: string, filePath?: string): string {
    const pathHtml = filePath
        ? `<span class="code-block__path">${escapeHtml(filePath)}</span>`
        : '';
    return (
        // The surface attribute marks the block for the cursor spotlight, which
        // the SpotlightGroup around the article body delegates to. Emitted here
        // rather than applied by a client hook so it ships in the server HTML.
        `<figure class="code-block not-prose" ${spotlightSurfaceAttribute}="true">` +
        `<figcaption class="code-block__bar">` +
        `<span class="code-block__meta">` +
        `<span class="code-block__lang">${escapeHtml(codeLabel(lang, filePath))}</span>` +
        pathHtml +
        `</span>` +
        `<span class="code-block__copy" data-code-copy></span>` +
        `</figcaption>` +
        highlighted +
        `</figure>`
    );
}

async function highlightCode(code: string, lang: string): Promise<string> {
    try {
        return await codeToHtml(code, { lang, themes: CODE_THEMES, defaultColor: false });
    } catch {
        return await codeToHtml(code, {
            lang: 'text',
            themes: CODE_THEMES,
            defaultColor: false
        });
    }
}

marked.use({
    async: true,
    extensions: [
        highlightExtension,
        subscriptExtension,
        superscriptExtension,
        definitionListExtension
    ],
    async walkTokens(token) {
        if (token.type !== 'code') return;
        const codeToken = token as CodeToken;
        const { lang } = parseCodeMeta(codeToken);
        // Mermaid blocks render to SVG in the browser (see MermaidRenderer), so
        // skip Shiki and let the code renderer emit a <pre class="mermaid">.
        if (lang === 'mermaid') return;
        codeToken.highlighted = await highlightCode(codeToken.text, lang);
    },
    renderer: {
        code(token) {
            const codeToken = token as CodeToken;
            const { lang, filePath } = parseCodeMeta(codeToken);
            if (lang === 'mermaid') {
                return `<pre class="mermaid not-prose">${escapeHtml(codeToken.text)}</pre>`;
            }
            const highlighted =
                codeToken.highlighted ?? `<pre><code>${escapeHtml(codeToken.text)}</code></pre>`;
            return renderCodeBlock(highlighted, lang, filePath);
        }
    }
});

// GitHub-parity Markdown extensions: footnotes ([^1] plus an auto footnotes
// section), GitHub alerts (> [!NOTE]/[!TIP]/[!WARNING]/...), and :shortcode:
// emoji rendered to Unicode from the gemoji dataset.
marked.use(markedFootnote());
marked.use(markedAlert());
marked.use(
    markedEmoji<string>({
        emojis: emojiMap,
        renderer: (token) => token.emoji
    })
);

// Raw HTML in the Markdown body (e.g. <kbd>, <details>/<summary>, <br>) passes
// through untouched: marked ships no sanitizer, and ArticleContent renders the
// result with dangerouslySetInnerHTML. That is safe here because articles are
// first-party content authored in content/ by the site owner; there is no
// untrusted input. If third-party Markdown is ever ingested, add sanitization
// (rehype-sanitize / DOMPurify) at that boundary.

/** Turn heading text into a URL-safe anchor slug (`Cache-aside` -> `cache-aside`). */
export function slugifyHeading(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

const HTML_ENTITIES: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
};

/** Strip inline tags and decode the few entities marked emits, for plain text. */
function headingPlainText(inner: string): string {
    return (
        inner
            .replace(/<[^>]+>/g, '')
            .replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (entity) => HTML_ENTITIES[entity] ?? '')
            // Drop any other entity (e.g. &hellip;) so it never leaks a literal
            // "hellip" into the slug; the visible heading keeps its glyph.
            .replace(/&#?[a-z0-9]+;/gi, '')
            .trim()
    );
}

/**
 * Adds stable `id` anchors to the body's H2/H3 headings and returns the table of
 * contents alongside the rewritten HTML. IDs and the TOC are produced in a single
 * pass so they always agree; duplicate slugs are disambiguated with a numeric
 * suffix (`-2`, `-3`). Headings that already carry an id never match the pattern,
 * so they pass through untouched and stay out of the TOC.
 *
 * Every id, slugified or explicit, is claimed from one pool: an explicit `{#id}`
 * that duplicates a slug would otherwise emit the same id twice, and
 * `getElementById` resolves only the first, leaving the second heading
 * unreachable from its own TOC link.
 */
function addHeadingIdsAndExtractToc(html: string): { html: string; toc: TocItem[] } {
    const toc: TocItem[] = [];
    const used = new Set<string>();

    /** `base`, or the first free `base-N`, reserved so no later heading repeats it. */
    const claimId = (base: string): string => {
        let candidate = base;
        let suffix = 2;
        while (used.has(candidate)) {
            candidate = `${base}-${suffix}`;
            suffix += 1;
        }
        used.add(candidate);
        return candidate;
    };

    const rewritten = html.replace(
        /<h([23])>([\s\S]*?)<\/h\1>/g,
        (match, level: string, inner: string) => {
            // An explicit `{#custom-id}` trailing the heading wins over the slug;
            // strip it from the visible heading and the TOC label either way.
            const explicit = inner.match(/\s*\{#([a-z0-9-]+)\}\s*$/i);
            const displayInner =
                explicit && explicit.index !== undefined
                    ? inner.slice(0, explicit.index).trimEnd()
                    : inner;
            const text = headingPlainText(displayInner);
            if (!text) return match;
            const id = claimId(explicit?.[1] ?? slugifyHeading(text) ?? 'section');
            toc.push({ id, text, level: Number(level) });
            return `<h${level} id="${id}">${displayInner}</h${level}>`;
        }
    );
    return { html: rewritten, toc };
}

/**
 * Wrap each Markdown table in a horizontally scrollable container so wide tables
 * scroll within the article column instead of overflowing on narrow screens.
 * Matches the opening and closing tag as a pair, and only the bare `<table>` that
 * marked emits, so tables inside embedded HTML are left untouched and their
 * `</table>` never gets an orphaned closing div.
 *
 * Two nested wrappers, not one: the outer `.table-window` draws the rounded frame
 * and carries the cursor-lit border (hence the surface attribute), while the
 * inner `.table-scroll` does the scrolling. They have to be separate elements
 * because a scroll container clips to its padding box, which would swallow a ring
 * sitting on the frame's border.
 */
function wrapTables(html: string): string {
    return html.replace(
        /<table>([\s\S]*?)<\/table>/g,
        `<div class="table-window not-prose" ${spotlightSurfaceAttribute}="true">` +
            '<div class="table-scroll"><table>$1</table></div>' +
            '</div>'
    );
}

/** Render Markdown through the full Shiki, Mermaid and heading pipeline. */
export async function renderMarkdown(content: string): Promise<{
    html: string;
    toc: TocItem[];
}> {
    const rendered = await marked.parse(content);
    const { html, toc } = addHeadingIdsAndExtractToc(rendered);
    return { html: wrapTables(html), toc };
}
