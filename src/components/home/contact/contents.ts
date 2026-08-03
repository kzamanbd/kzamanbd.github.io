import type { ContactFormValues } from '@/components/home/contact/types';

// Left rail copy.
export const asideEyebrow = 'Get in touch';
export const asideHeadline = 'Have something in mind? Start the conversation.';
export const asideBody =
    'Whether it is a product to build, a system to untangle, or just a question about the work, send a note and it lands straight in my inbox.';
export const availabilityLabel = 'Usually replies within a day';
export const directEmailLead = 'Prefer email?';

export const emptyContactValues: ContactFormValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
};

interface ContactFieldConfig {
    name: keyof ContactFormValues;
    label: string;
    type: 'text' | 'email';
    placeholder: string;
    autoComplete: string;
    required: boolean;
}

export const contactFields: ContactFieldConfig[] = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Your name',
        autoComplete: 'name',
        required: true
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'you@example.com',
        autoComplete: 'email',
        required: true
    },
    {
        name: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'What is this about?',
        autoComplete: 'off',
        required: false
    }
];

export const messageField = {
    label: 'Message',
    placeholder: 'Tell me a little about what you have in mind...'
};

export const submitLabel = 'Send message';
export const submittingLabel = 'Sending...';

export const successTitle = 'Message sent successfully';
export const successSubtitle =
    'Thanks for reaching out. I will get back to you soon. Need to add something?';
export const resendLabel = 'Send another';
