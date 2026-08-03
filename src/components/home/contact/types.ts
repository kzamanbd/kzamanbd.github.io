export interface ContactFormValues {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';
