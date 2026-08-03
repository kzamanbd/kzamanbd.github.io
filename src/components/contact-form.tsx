'use client';

import { Check, Loader, Mail, MessageSquare, Send, Sparkles, User, X } from 'lucide-react';
import { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormStatus {
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
}

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<FormStatus>({
        type: 'idle',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({
                type: 'error',
                message: 'Please fill in all required fields.'
            });
            return;
        }

        setStatus({
            type: 'loading',
            message: 'Sending your message...'
        });

        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject || 'New message from portfolio',
                message: formData.message,
                to_name: 'Kamruzzaman',
                reply_to: formData.email
            };

            console.log('Sending email with params:', templateParams);
        } catch (error) {
            console.error('Error:', error);
            setStatus({
                type: 'error',
                message: 'Sorry, there was an error sending your message. Please try again.'
            });
        }
    };

    return (
        <section
            id="contact"
            className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-20 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-800/20" />
                <div className="absolute bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-800/20" />
            </div>

            <div className="relative container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                    {/* Section Header */}
                    <div className="mb-16 text-center">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-sm font-medium shadow-sm dark:border-blue-800/30 dark:from-blue-900/20 dark:to-purple-900/20">
                            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                                Get In Touch
                            </span>
                        </div>

                        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                            Let&apos;s Work{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                                Together
                            </span>
                        </h2>

                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                            Have a project in mind? I&apos;d love to hear about it. Send me a
                            message and let&apos;s discuss how we can bring your ideas to life.
                        </p>
                    </div>

                    {/* Contact Form Card */}
                    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm md:p-12 dark:border-gray-700 dark:bg-gray-800/80">
                        {/* Gradient Border Effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-[1px] opacity-20">
                            <div className="h-full w-full rounded-3xl bg-white dark:bg-gray-800"></div>
                        </div>

                        <div className="relative z-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name and Email Row */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="name"
                                            className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="email"
                                            className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Subject Input */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="subject"
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        Subject
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400"
                                            placeholder="Project discussion, collaboration, etc."
                                        />
                                    </div>
                                </div>

                                {/* Message Input */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="message"
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        Message *
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={6}
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400"
                                            placeholder="Tell me about your project, ideas, or how I can help you..."
                                        />
                                    </div>
                                </div>

                                {/* Status Message */}
                                {status.type !== 'idle' && (
                                    <div
                                        className={`flex items-center gap-3 rounded-xl p-4 ${
                                            status.type === 'success'
                                                ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                                : status.type === 'error'
                                                  ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                                  : 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                                        }`}>
                                        {status.type === 'loading' && (
                                            <Loader className="h-5 w-5 animate-spin" />
                                        )}
                                        {status.type === 'success' && <Check className="h-5 w-5" />}
                                        {status.type === 'error' && <X className="h-5 w-5" />}
                                        <span className="font-medium">{status.message}</span>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={status.type === 'loading'}
                                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-70 dark:from-blue-500 dark:to-purple-500">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <div className="relative flex items-center justify-center gap-2">
                                            {status.type === 'loading' ? (
                                                <>
                                                    <Loader className="h-5 w-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                                    Send Message
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 dark:text-gray-300">
                            Prefer email? Reach me directly at{' '}
                            <a
                                href="mailto:kzamanbn@gmail.com"
                                className="font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                kzamanbn@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
