import SectionHeading from '@/components/common/section-heading';
import {
    asideBody,
    asideEyebrow,
    asideHeadline,
    availabilityLabel,
    directEmailLead
} from '@/components/home/contact/contents';
import StatusDot from '@/components/home/contact/status-dot';
import { user } from '@/lib/metadata';

/**
 * The left rail of the contact panel: a short, human pitch plus a live status
 * cue and a direct-email fallback, so the panel reads as an invitation rather
 * than a bare form.
 */
export default function ContactAside() {
    return (
        <div className="flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-3">
                <span className="text-foreground/70 text-xs font-semibold tracking-[0.22em] uppercase">
                    {asideEyebrow}
                </span>
                <SectionHeading className="text-2xl leading-snug font-semibold text-balance sm:text-2xl">
                    {asideHeadline}
                </SectionHeading>
                <p className="text-foreground/65 text-sm leading-relaxed">{asideBody}</p>
            </div>

            <StatusDot label={availabilityLabel} />

            <div className="border-foreground/10 mt-auto border-t pt-5 text-sm">
                <span className="text-foreground/70">{directEmailLead}</span>
                <a
                    href={`mailto:${user.email}`}
                    className="focus-ring mt-1 block rounded-sm font-medium break-all underline decoration-emerald-500/40 underline-offset-4 transition-colors hover:decoration-emerald-500">
                    {user.email}
                </a>
            </div>
        </div>
    );
}
