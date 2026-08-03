import { contactFromAddress, contactToAddress, resendApiKey } from '@/lib/contact/config';
import type { ContactMessage } from '@/lib/contact/types';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// The route reads a secret and sends mail, so it must never be prerendered or
// cached: every submission is its own request.
export const dynamic = 'force-dynamic';

const MAX_LENGTHS = { name: 120, email: 200, subject: 200, message: 5000 } as const;

// Without a captcha in front of the form, this is the only thing standing
// between a script and the mailbox. It is deliberately simple: a per-IP window
// held in module memory, which resets when the server does. That is enough to
// stop a naive flood; a determined sender rotating IPs needs a real service.
const RATE_LIMIT = { windowMs: 60_000, maxRequests: 3 };
const submissionLog = new Map<string, number[]>();

function isRateLimited(clientKey: string, now: number): boolean {
    const windowStart = now - RATE_LIMIT.windowMs;
    const recent = (submissionLog.get(clientKey) ?? []).filter((time) => time > windowStart);
    submissionLog.set(clientKey, recent);

    if (recent.length >= RATE_LIMIT.maxRequests) {
        return true;
    }

    recent.push(now);
    submissionLog.set(clientKey, recent);
    return false;
}

/** The sender's address, from whichever proxy header the host populates. */
function clientKeyFrom(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Reads the submission, rejecting anything that is not a complete, plausible
 * message. Every field is trimmed and length-capped here rather than trusted
 * from the client, since the form is not the only thing that can post here.
 */
function parseMessage(body: unknown): ContactMessage | null {
    if (typeof body !== 'object' || body === null) {
        return null;
    }

    const { name, email, subject, message } = body as Record<string, unknown>;
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
        return null;
    }

    const parsed = {
        name: name.trim().slice(0, MAX_LENGTHS.name),
        email: email.trim().slice(0, MAX_LENGTHS.email),
        subject: (typeof subject === 'string' ? subject : '').trim().slice(0, MAX_LENGTHS.subject),
        message: message.trim().slice(0, MAX_LENGTHS.message)
    };

    if (!parsed.name || !parsed.message || !isValidEmail(parsed.email)) {
        return null;
    }

    return parsed;
}

/** Escapes the sender's text so it cannot inject markup into the email body. */
function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function buildHtml(message: ContactMessage): string {
    const rows = [
        ['From', `${message.name} &lt;${escapeHtml(message.email)}&gt;`],
        ['Subject', escapeHtml(message.subject) || '(none)']
    ]
        .map(
            ([label, value]) => `<p style="margin:0 0 4px"><strong>${label}:</strong> ${value}</p>`
        )
        .join('');

    return `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6">
        ${rows}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
        <div style="white-space:pre-wrap">${escapeHtml(message.message)}</div>
    </div>`;
}

export async function POST(request: Request) {
    if (!resendApiKey) {
        // A misconfigured deploy is an operator problem, not a sender problem,
        // so it is logged here and reported plainly rather than as a silent
        // success the sender would never learn about.
        console.error('Contact form: RESEND_API_KEY is not set.');
        return NextResponse.json(
            {
                ok: false,
                error: 'The contact form is not configured yet. Please email me instead.'
            },
            { status: 503 }
        );
    }

    if (isRateLimited(clientKeyFrom(request), Date.now())) {
        return NextResponse.json(
            { ok: false, error: 'Too many messages just now. Please try again in a minute.' },
            { status: 429 }
        );
    }

    const message = parseMessage(await request.json().catch(() => null));
    if (!message) {
        return NextResponse.json(
            { ok: false, error: 'Please fill in your name, a valid email, and a message.' },
            { status: 400 }
        );
    }

    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
        from: contactFromAddress,
        to: contactToAddress,
        // The mail comes from the site, so replying should reach the sender
        // rather than the site's own from-address.
        replyTo: `${message.name} <${message.email}>`,
        subject: message.subject || `New message from ${message.name}`,
        html: buildHtml(message),
        text: `From: ${message.name} <${message.email}>\nSubject: ${message.subject || '(none)'}\n\n${message.message}`
    });

    if (error) {
        // Logged field by field, not as the object: the SDK's error carries its
        // details on a class instance, so `console.error(error)` prints `{}` and
        // hides the one line that says what actually went wrong (an unverified
        // sending domain, a restricted key, a rejected recipient).
        console.error(
            `Contact form: Resend rejected the message. [${error.name}] ${error.message}`
        );
        return NextResponse.json(
            { ok: false, error: 'The message could not be sent. Please try again shortly.' },
            { status: 502 }
        );
    }

    return NextResponse.json({ ok: true });
}
