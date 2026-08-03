'use client';

import type { ArticleListItem, SaveState } from '@/components/articles/editor/types';
import Button from '@/components/ui/button';
import { fieldControlClassName } from '@/components/ui/field';
import { cn } from '@/utils/cn';
import { BookOpen, Eye, EyeOff, FilePlus2, Save, Trash2 } from 'lucide-react';

interface SaveBarProps {
    existing: ArticleListItem[];
    slug: string;
    isSlugAuto: boolean;
    isPreviewVisible: boolean;
    isDirty: boolean;
    saveState: SaveState;
    errorMessage: string | null;
    canDelete: boolean;
    onSlugChange: (value: string) => void;
    onResetSlug: () => void;
    onNew: () => void;
    onOpen: (file: string) => void;
    onSave: () => void;
    onPreview: () => void;
    onDelete: () => void;
    onTogglePreview: () => void;
    onOpenGuide: () => void;
}

/** The status line, which never claims a save that did not happen. */
function statusText(saveState: SaveState, isDirty: boolean): string {
    if (saveState === 'saving') return 'Saving...';
    if (saveState === 'error') return 'Save failed';
    if (isDirty) return 'Unsaved changes';
    if (saveState === 'saved') return 'Saved';
    return 'No changes';
}

/** File name, open/new/save/delete, and the preview and guide toggles. */
export default function SaveBar({
    existing,
    slug,
    isSlugAuto,
    isPreviewVisible,
    isDirty,
    saveState,
    errorMessage,
    canDelete,
    onSlugChange,
    onResetSlug,
    onNew,
    onOpen,
    onSave,
    onPreview,
    onDelete,
    onTogglePreview,
    onOpenGuide
}: SaveBarProps) {
    return (
        <div className="border-foreground/10 bg-background/50 mb-6 flex flex-col gap-4 rounded-2xl border p-4 backdrop-blur-sm">
            <div className="flex flex-wrap items-end gap-3">
                <div className="flex min-w-56 flex-1 flex-col gap-1.5">
                    <label
                        htmlFor="article-slug"
                        className="text-foreground/70 text-xs font-semibold tracking-[0.14em] uppercase">
                        File name
                        {isSlugAuto && (
                            <span className="text-foreground/45 ml-2 font-normal normal-case">
                                following the title
                            </span>
                        )}
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            id="article-slug"
                            value={slug}
                            onChange={(event) => onSlugChange(event.target.value)}
                            className={cn(fieldControlClassName, 'font-mono')}
                        />
                        {!isSlugAuto && (
                            <Button variant="text" onClick={onResetSlug}>
                                Reset
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex min-w-48 flex-col gap-1.5">
                    <label
                        htmlFor="open-article"
                        className="text-foreground/70 text-xs font-semibold tracking-[0.14em] uppercase">
                        Open
                    </label>
                    <select
                        id="open-article"
                        value=""
                        onChange={(event) => event.target.value && onOpen(event.target.value)}
                        className={cn(fieldControlClassName)}>
                        <option value="">
                            {existing.length > 0 ? 'Pick an article...' : 'No articles yet'}
                        </option>
                        {existing.map((article) => (
                            <option key={article.file} value={article.file}>
                                {article.draft ? '[draft] ' : ''}
                                {article.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Button onClick={onSave} isLoading={saveState === 'saving'}>
                    <Save aria-hidden="true" className="size-4" />
                    Save
                </Button>
                <Button variant="outline" onClick={onPreview}>
                    <Eye aria-hidden="true" className="size-4" />
                    Open full page
                </Button>
                <Button variant="outline" onClick={onNew}>
                    <FilePlus2 aria-hidden="true" className="size-4" />
                    New
                </Button>
                <Button variant="outline" onClick={onOpenGuide}>
                    <BookOpen aria-hidden="true" className="size-4" />
                    Guide
                </Button>
                <Button variant="outline" onClick={onTogglePreview}>
                    {isPreviewVisible ? (
                        <EyeOff aria-hidden="true" className="size-4" />
                    ) : (
                        <Eye aria-hidden="true" className="size-4" />
                    )}
                    {isPreviewVisible ? 'Hide preview' : 'Show preview'}
                </Button>
                {canDelete && (
                    <Button
                        variant="outline"
                        onClick={onDelete}
                        className="border-red-500/30 text-red-600 hover:border-red-500/60 dark:text-red-400">
                        <Trash2 aria-hidden="true" className="size-4" />
                        Delete
                    </Button>
                )}

                <span
                    className={cn(
                        'ml-auto text-sm',
                        saveState === 'error'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-foreground/60'
                    )}>
                    {statusText(saveState, isDirty)}
                </span>
            </div>

            {saveState === 'error' && errorMessage && (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
