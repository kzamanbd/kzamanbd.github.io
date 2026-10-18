import { createResendProvider } from '@/services/contact/providers/resend';
import type { ContactProvider } from '@/services/contact/types';

/** The route that owns the send; the Resend API key lives only behind it. */
export const contactEndpoint = '/api/contact';

/**
 * The active contact provider. To switch vendors, import a different
 * `create...Provider` here and assign it; the form and its UI stay untouched
 * because they depend only on the ContactProvider contract.
 */
export const contactProvider: ContactProvider = createResendProvider({
    endpoint: contactEndpoint
});

export type {
    ContactMessage,
    ContactProvider,
    ContactSubmitResult
} from '@/services/contact/types';
