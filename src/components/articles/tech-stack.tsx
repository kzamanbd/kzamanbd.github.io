import TechIcon, { techBrandColor, techIconForLabel } from '@/components/icons/tech-icon';
import Tag from '@/components/common/tag';

/**
 * The stack strip under an article header: the concrete tools the post builds
 * on, as declared in its `tech:` frontmatter.
 *
 * A label the site carries a brand mark for renders with that mark tinted to the
 * real brand colour; anything else falls back to a plain chip, so writing a tool
 * we have no logo for never blocks the article.
 */
export default function TechStack({ items }: { items: string[] }) {
    if (items.length === 0) return null;

    return (
        <div>
            <h2 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">
                Built with
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => {
                    const icon = techIconForLabel(item);

                    return (
                        <Tag
                            key={item}
                            className="text-foreground/70 flex items-center gap-1.5 px-3 py-1 text-xs">
                            {icon && (
                                <TechIcon
                                    name={icon}
                                    className="size-3.5 shrink-0"
                                    style={{ color: techBrandColor(icon) }}
                                />
                            )}
                            {item}
                        </Tag>
                    );
                })}
            </ul>
        </div>
    );
}
