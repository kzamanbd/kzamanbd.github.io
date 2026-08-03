import type { ContactMessage, ContactProvider, ContactSubmitResult } from '@/lib/contact/types';

interface ResendProviderConfig {
    /** The route that performs the send. Same origin, so no CORS involved. */
    endpoint: string;
}

interface ContactApiResponse {
    ok: boolean;
    error?: string;
}

/**
 * The browser half of the Resend integration. It deliberately does not talk to
 * Resend: the API key is an account secret, so the actual send happens in the
 * route handler at `endpoint` (see `src/app/api/contact/route.ts`) and the key
 * never reaches the client bundle. This provider only forwards the message and
 * translates the response into the shared result contract.
 */
export function createResendProvider({ endpoint }: ResendProviderConfig): ContactProvider {
    return {
        id: 'resend',
        async submit(message: ContactMessage): Promise<ContactSubmitResult> {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(message)
                });

                const data = (await response.json().catch(() => null)) as ContactApiResponse | null;

                if (response.ok && data?.ok) {
                    return { ok: true };
                }

                return {
                    ok: false,
                    error:
                        data?.error ??
                        'Something went wrong sending your message. Please try again.'
                };
            } catch {
                return {
                    ok: false,
                    error: 'Network error. Please check your connection and try again.'
                };
            }
        }
    };
}
