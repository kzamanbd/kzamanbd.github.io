import type { ResumeVariantLink } from '@/components/resume/types';
import Link from 'next/link';

/**
 * Picks which cut of the resume the page renders.
 *
 * Plain links rather than a client-side toggle: each cut is a real URL that can
 * be pasted into an application, so the switcher is navigation, not state. It
 * is `print:hidden` for the same reason the print button is — it is chrome for
 * choosing a resume, not part of the resume.
 *
 * No items means nothing to switch between, so the whole control disappears
 * rather than leaving an empty pill rail behind. That is how the route hides it
 * outside development.
 */
export default function VariantSwitcher({ items }: { items: ResumeVariantLink[] }) {
    if (items.length === 0) {
        return null;
    }

    return (
        <nav aria-label="Resume variant" className="print:hidden">
            <ul className="border-foreground/10 bg-foreground/5 flex flex-wrap items-center gap-1 rounded-full border p-1">
                {items.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            aria-current={item.active ? 'page' : undefined}
                            className={`focus-ring block rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                item.active
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-foreground/60 hover:text-foreground'
                            }`}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
