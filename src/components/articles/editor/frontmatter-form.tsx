'use client';

import { difficultyOptions } from '@/components/articles/editor/contents';
import TagListInput from '@/components/articles/editor/tag-list-input';
import type { EditorSuggestions } from '@/components/articles/editor/types';
import { fieldControlClassName } from '@/components/ui/field';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import type { ArticleDifficulty, ArticleFrontmatter } from '@/lib/article-schema';
import { cn } from '@/utils/cn';

const labelClassName = 'text-foreground/70 text-xs font-semibold tracking-[0.14em] uppercase';

interface FrontmatterFormProps {
    frontmatter: ArticleFrontmatter;
    suggestions: EditorSuggestions;
    onChange: (patch: Partial<ArticleFrontmatter>) => void;
}

/**
 * The typed frontmatter fields. Editing structured inputs rather than raw YAML
 * is the point of the editor: the file is serialised from this state, so it
 * cannot come out malformed, and the required fields are visible rather than
 * remembered.
 */
export default function FrontmatterForm({
    frontmatter,
    suggestions,
    onChange
}: FrontmatterFormProps) {
    return (
        <section className="border-foreground/10 bg-background/40 rounded-2xl border p-5 backdrop-blur-sm sm:p-6">
            <h2 className={labelClassName}>Frontmatter</h2>

            <div className="mt-4 grid gap-5 lg:grid-cols-2">
                <Input
                    label="Title"
                    labelClassName={labelClassName}
                    required
                    value={frontmatter.title}
                    placeholder="What the article is called"
                    onChange={(event) => onChange({ title: event.target.value })}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                        label="Publish date"
                        labelClassName={labelClassName}
                        required
                        type="date"
                        value={frontmatter.date}
                        onChange={(event) => onChange({ date: event.target.value })}
                    />
                    <Input
                        label="Updated"
                        labelClassName={labelClassName}
                        type="date"
                        value={frontmatter.updated ?? ''}
                        onChange={(event) => onChange({ updated: event.target.value || undefined })}
                    />
                </div>

                <div className="lg:col-span-2">
                    <Textarea
                        label="Description"
                        labelClassName={labelClassName}
                        rows={2}
                        required
                        value={frontmatter.description}
                        placeholder="One or two sentences. Used as the card text and the SEO description."
                        onChange={(event) => onChange({ description: event.target.value })}
                    />
                </div>

                <TagListInput
                    label="Tags"
                    values={frontmatter.tags}
                    suggestions={suggestions.tags}
                    placeholder="Add a tag, then press Enter"
                    onChange={(tags) => onChange({ tags })}
                />

                <TagListInput
                    label="Tech"
                    values={frontmatter.tech}
                    suggestions={suggestions.tech}
                    placeholder="Tools the article builds on"
                    onChange={(tech) => onChange({ tech })}
                />

                <div className="lg:col-span-2">
                    <TagListInput
                        label="What you'll learn"
                        values={frontmatter.learn}
                        placeholder="One takeaway per entry"
                        onChange={(learn) => onChange({ learn })}
                    />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                        label="Category"
                        labelClassName={labelClassName}
                        list="category-suggestions"
                        value={frontmatter.category ?? ''}
                        placeholder="Broader than a tag"
                        onChange={(event) =>
                            onChange({ category: event.target.value || undefined })
                        }
                    />
                    <datalist id="category-suggestions">
                        {suggestions.categories.map((category) => (
                            <option key={category} value={category} />
                        ))}
                    </datalist>

                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="difficulty" className={labelClassName}>
                            Difficulty
                        </label>
                        <select
                            id="difficulty"
                            value={frontmatter.difficulty ?? ''}
                            onChange={(event) =>
                                onChange({
                                    difficulty: (event.target.value || undefined) as
                                        ArticleDifficulty | undefined
                                })
                            }
                            className={cn(fieldControlClassName)}>
                            <option value="">Not set</option>
                            {difficultyOptions.map((level) => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_8rem]">
                    <Input
                        label="Series"
                        labelClassName={labelClassName}
                        list="series-suggestions"
                        value={frontmatter.series?.name ?? ''}
                        placeholder="Leave empty for a standalone post"
                        onChange={(event) =>
                            onChange({
                                series: event.target.value
                                    ? {
                                          name: event.target.value,
                                          order: frontmatter.series?.order ?? 1
                                      }
                                    : undefined
                            })
                        }
                    />
                    <datalist id="series-suggestions">
                        {suggestions.series.map((name) => (
                            <option key={name} value={name} />
                        ))}
                    </datalist>

                    <Input
                        label="Part"
                        labelClassName={labelClassName}
                        type="number"
                        min={1}
                        disabled={!frontmatter.series}
                        value={frontmatter.series?.order ?? ''}
                        onChange={(event) =>
                            onChange({
                                series: frontmatter.series
                                    ? {
                                          name: frontmatter.series.name,
                                          order: Number(event.target.value) || 1
                                      }
                                    : undefined
                            })
                        }
                    />
                </div>

                <div className="lg:col-span-2">
                    <label className="text-foreground/80 flex w-fit items-center gap-2.5 text-sm">
                        <input
                            type="checkbox"
                            checked={frontmatter.draft === true}
                            onChange={(event) => onChange({ draft: event.target.checked })}
                            className="border-foreground/25 size-4 rounded"
                        />
                        Draft, so it stays out of the site, the feeds and the sitemap
                    </label>
                </div>
            </div>
        </section>
    );
}
