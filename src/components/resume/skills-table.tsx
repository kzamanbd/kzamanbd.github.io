import type { SkillRow } from '@/components/resume/types';

/** The technical-skills block: one labelled row per area of the stack. */
export default function SkillsTable({ rows }: { rows: SkillRow[] }) {
    return (
        <div className="mb-4 text-sm">
            <ul className="bullet-list">
                {rows.map((row) => (
                    <li key={row.label}>
                        <p>
                            <span className="me-2 font-bold">{row.label}:</span>
                            {row.value}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
