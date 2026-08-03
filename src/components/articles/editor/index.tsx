'use client';

import { createEmptyDraft } from '@/components/articles/editor/contents';
import EditorPreview from '@/components/articles/editor/editor-preview';
import FrontmatterForm from '@/components/articles/editor/frontmatter-form';
import { useArticleActions } from '@/components/articles/editor/hooks/use-article-actions';
import { useMarkdownInsertion } from '@/components/articles/editor/hooks/use-markdown-insertion';
import { useUnsavedChangesWarning } from '@/components/articles/editor/hooks/use-unsaved-changes-warning';
import MarkdownInput from '@/components/articles/editor/markdown-input';
import SaveBar from '@/components/articles/editor/save-bar';
import type {
    ArticleDraft,
    ArticleListItem,
    EditorActions,
    EditorSuggestions
} from '@/components/articles/editor/types';
import WritingGuide from '@/components/articles/editor/writing-guide';
import { useDisclosure } from '@/components/layout/hooks/use-disclosure';
import { slugifyHeading } from '@/lib/markdown';
import { fileSlug } from '@/utils/article-file';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface ArticleEditorProps {
    actions: EditorActions;
    existing: ArticleListItem[];
    suggestions: EditorSuggestions;
}

/**
 * The editor shell: it owns the draft, what was last saved (which is how "dirty"
 * is decided), and the file name the draft maps to. Everything that touches disk
 * goes through `useArticleActions`.
 *
 * The file name follows the title until the author overrides it, so a rename is
 * possible without making every new article a two-field chore.
 */
export default function ArticleEditor({
    actions,
    existing,
    suggestions: initialSuggestions
}: ArticleEditorProps) {
    const [draft, setDraft] = useState<ArticleDraft>(createEmptyDraft);
    const [savedDraft, setSavedDraft] = useState<ArticleDraft>(draft);
    // null means the file name follows the title; a string is an explicit override.
    const [slugOverride, setSlugOverride] = useState<string | null>(null);
    const [savedSlugOverride, setSavedSlugOverride] = useState<string | null>(null);
    const [isPreviewVisible, setIsPreviewVisible] = useState(true);
    const guide = useDisclosure();

    const { articles, suggestions, saveState, errorMessage, save, open, remove } =
        useArticleActions(actions, existing, initialSuggestions);

    const { textareaRef, insertSnippet } = useMarkdownInsertion(draft.body, (body) =>
        setDraft((current) => ({ ...current, body }))
    );

    const autoSlug = slugifyHeading(draft.frontmatter.title) || 'untitled-article';
    const slug = slugOverride ?? autoSlug;
    const savedFile = articles.find((article) => article.slug === slug);

    const isDirty =
        JSON.stringify(draft) !== JSON.stringify(savedDraft) || slugOverride !== savedSlugOverride;
    useUnsavedChangesWarning(isDirty);

    /** Guards an article switch behind a confirm when there are unsaved edits. */
    const confirmDiscard = () =>
        !isDirty || window.confirm('You have unsaved changes. Discard them and continue?');

    /** Points the file-name field at a file's real slug, overriding only if it differs. */
    const syncSlugToFile = (file: string, title: string) => {
        const onDisk = fileSlug(file);
        const auto = slugifyHeading(title) || 'untitled-article';
        const override = onDisk === auto ? null : onDisk;
        setSlugOverride(override);
        setSavedSlugOverride(override);
    };

    const startNewArticle = () => {
        if (!confirmDiscard()) return;
        const next = createEmptyDraft();
        setDraft(next);
        setSavedDraft(next);
        setSlugOverride(null);
        setSavedSlugOverride(null);
    };

    const openArticle = async (file: string) => {
        if (!confirmDiscard()) return;
        const loaded = await open(file);
        setDraft(loaded);
        setSavedDraft(loaded);
        syncSlugToFile(file, loaded.frontmatter.title);
    };

    const saveArticle = async () => {
        const result = await save(draft, slug);
        // A failed save keeps the dirty state, so the work is still there to retry.
        if (!result) return null;
        setSavedDraft(draft);
        syncSlugToFile(result.file, draft.frontmatter.title);
        return result;
    };

    const deleteArticle = async () => {
        if (!savedFile) return;
        if (
            !window.confirm(
                `Delete ${savedFile.file}? This removes the file from disk and cannot be undone.`
            )
        ) {
            return;
        }
        const result = await remove(slug);
        if (!result) return;
        startNewArticleAfterDelete();
    };

    const startNewArticleAfterDelete = () => {
        const next = createEmptyDraft();
        setDraft(next);
        setSavedDraft(next);
        setSlugOverride(null);
        setSavedSlugOverride(null);
    };

    /** Saves first, since the article route reads from disk, then opens it. */
    const previewFullPage = async () => {
        const result = await saveArticle();
        if (!result) return;
        if (draft.frontmatter.draft) {
            window.alert(
                'This article is marked as a draft, so the article route will 404. Untick Draft to preview the full page.'
            );
            return;
        }
        window.open(`/articles/${fileSlug(result.file)}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <main className="mx-auto w-full max-w-[112rem] px-4 pt-28 pb-16 sm:px-6 lg:px-8">
            <header className="mb-8">
                <div className="flex flex-wrap items-center gap-3">
                    <p className="text-foreground/50 text-sm font-semibold tracking-[0.2em] uppercase">
                        Studio
                    </p>
                    <span className="border-foreground/10 bg-foreground/5 rounded-full border px-2.5 py-1 text-xs">
                        Development only
                    </span>
                </div>
                <h1 className="text-foreground mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    Article editor
                </h1>
                <p className="text-foreground/65 mt-3 max-w-3xl">
                    Structured frontmatter and Markdown side by side, saved straight into
                    content/articles. The preview renders through the same pipeline as the published
                    site, so what you see here is what ships.
                </p>
            </header>

            <SaveBar
                existing={articles}
                slug={slug}
                isSlugAuto={slugOverride === null}
                isPreviewVisible={isPreviewVisible}
                isDirty={isDirty}
                saveState={saveState}
                errorMessage={errorMessage}
                canDelete={savedFile !== undefined}
                onSlugChange={(value) => setSlugOverride(slugifyHeading(value) || null)}
                onResetSlug={() => setSlugOverride(null)}
                onNew={startNewArticle}
                onOpen={openArticle}
                onSave={saveArticle}
                onPreview={previewFullPage}
                onDelete={deleteArticle}
                onTogglePreview={() => setIsPreviewVisible((visible) => !visible)}
                onOpenGuide={guide.show}
            />

            <div className="grid gap-6">
                <FrontmatterForm
                    frontmatter={draft.frontmatter}
                    suggestions={suggestions}
                    onChange={(patch) =>
                        setDraft((current) => ({
                            ...current,
                            frontmatter: { ...current.frontmatter, ...patch }
                        }))
                    }
                />

                <div
                    className={cn(
                        'grid items-stretch gap-6',
                        isPreviewVisible && 'xl:grid-cols-2'
                    )}>
                    <MarkdownInput
                        value={draft.body}
                        textareaRef={textareaRef}
                        onChange={(body) => setDraft((current) => ({ ...current, body }))}
                    />
                    {isPreviewVisible && <EditorPreview body={draft.body} />}
                </div>
            </div>

            {guide.open && (
                <WritingGuide
                    onClose={guide.close}
                    onInsert={(snippet) => {
                        insertSnippet(snippet);
                        guide.close();
                    }}
                />
            )}
        </main>
    );
}
