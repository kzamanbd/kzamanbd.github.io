import { searchTerms } from '@/utils/search-articles';
import { Fragment } from 'react';

/** Escapes the regex metacharacters in a term, so a query like `c++` is literal. */
function escapeForRegex(term: string): string {
    return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Renders `text` with every stretch matching a search term marked, so a reader
 * can see why a result was returned. Matching is case-insensitive and works on
 * the raw text, so nothing about the source markup has to be trusted.
 */
export default function HighlightedText({ text, query }: { text: string; query: string }) {
    const terms = searchTerms(query);
    if (terms.length === 0) {
        return <>{text}</>;
    }

    // Splitting on a capturing group puts the matched stretches at the odd
    // indexes, which is what marks them: `pattern.test` is deliberately not used,
    // since a /g regex carries lastIndex between calls.
    const pattern = new RegExp(`(${terms.map(escapeForRegex).join('|')})`, 'gi');
    const parts = text.split(pattern);

    return (
        <>
            {parts.map((part, index) =>
                index % 2 === 1 ? (
                    <mark
                        key={`${part}-${index}`}
                        className="bg-foreground/15 text-foreground rounded-sm px-0.5">
                        {part}
                    </mark>
                ) : (
                    <Fragment key={`${part}-${index}`}>{part}</Fragment>
                )
            )}
        </>
    );
}
