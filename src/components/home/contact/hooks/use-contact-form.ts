import { emptyContactValues } from '@/components/home/contact/contents';
import type { ContactFormValues, ContactStatus } from '@/components/home/contact/types';
import { contactProvider } from '@/lib/contact';
import { useCallback, useState, type SubmitEvent } from 'react';

/**
 * Owns the contact form state and submission flow. Vendor-agnostic: it talks
 * only to `contactProvider`, never to a specific service, so changing how a
 * message is delivered never reaches this hook.
 */
export function useContactForm() {
    const [values, setValues] = useState<ContactFormValues>(emptyContactValues);
    const [status, setStatus] = useState<ContactStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const updateField = useCallback((field: keyof ContactFormValues, value: string) => {
        setValues((previous) => ({ ...previous, [field]: value }));
    }, []);

    const handleSubmit = useCallback(
        async (event: SubmitEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (status === 'submitting') {
                return;
            }

            setStatus('submitting');
            setErrorMessage(null);

            const result = await contactProvider.submit(values);

            if (result.ok) {
                setStatus('success');
                return;
            }

            setStatus('error');
            setErrorMessage(
                result.error ?? 'Something went wrong sending your message. Please try again.'
            );
        },
        [status, values]
    );

    const reset = useCallback(() => {
        setValues(emptyContactValues);
        setStatus('idle');
        setErrorMessage(null);
    }, []);

    return { values, status, errorMessage, updateField, handleSubmit, reset };
}
