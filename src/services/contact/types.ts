/**
 * Vendor-agnostic contact submission contract. The form depends only on these
 * types and on the active `contactProvider` (see ./index), never on a specific
 * service, so swapping vendors is a one-line change with no UI edits.
 */

export interface ContactMessage {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactSubmitResult {
    ok: boolean;
    /** Human-readable failure reason, present only when `ok` is false. */
    error?: string;
}

export interface ContactProvider {
    /** Stable identifier for the active provider, useful in logs and tests. */
    readonly id: string;
    submit(message: ContactMessage): Promise<ContactSubmitResult>;
}
