import { user } from '@/lib/metadata';

/**
 * Server-only contact settings. Nothing here is prefixed NEXT_PUBLIC, so none
 * of it reaches the browser bundle: the API key is an account secret, and a
 * leaked one lets anyone send mail as this domain.
 *
 * Only `src/app/api/contact/route.ts` reads this module.
 */

export const resendApiKey: string = process.env.RESEND_API_KEY ?? '';

/**
 * The address the notification is sent from. Resend will only accept a domain
 * it has verified, so this defaults to their shared sandbox sender, which can
 * deliver to the Resend account owner's own address. Point it at a verified
 * domain (`Portfolio <hello@draftscripts.com>`) once that domain is set up.
 */
export const contactFromAddress: string =
    process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <hello@draftscripts.com>';

/** Where submissions land. Defaults to the address published on the site. */
export const contactToAddress: string = process.env.CONTACT_TO_EMAIL ?? user.email;
