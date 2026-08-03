'use client';

import { useSpotlightSurfaces } from '@/components/common/hooks/use-spotlight-surfaces';
import SpotlightBorder from '@/components/common/spotlight-border';
import { spotlightSurfaceProps } from '@/components/common/spotlight-surface';
import ContactAside from '@/components/home/contact/contact-aside';
import styles from '@/components/home/contact/contact-form.module.css';
import ContactSuccess from '@/components/home/contact/contact-success';
import {
    contactFields,
    messageField,
    submitLabel,
    submittingLabel
} from '@/components/home/contact/contents';
import { useContactForm } from '@/components/home/contact/hooks/use-contact-form';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const fieldAccentClassName = 'focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/15';
const fieldLabelClassName = 'text-foreground/70 text-xs font-semibold tracking-[0.14em] uppercase';

export default function ContactForm() {
    const { values, status, errorMessage, updateField, handleSubmit, reset } = useContactForm();

    const isSubmitting = status === 'submitting';

    // The panel is its own spotlight group: one delegated pointer listener here
    // writes --pointer-x/y to the panel, which the cursor glow and the lit
    // border in contact-form.module.css both read.
    const panelRef = useRef<HTMLDivElement>(null);
    useSpotlightSurfaces(panelRef);

    return (
        <div className="w-full max-w-4xl">
            {/* No overflow-hidden: the pseudo-elements round their own corners,
                and clipping to the padding box would swallow the lit border
                ring, which sits a pixel out to land on the panel's real
                border. */}
            <div
                ref={panelRef}
                {...spotlightSurfaceProps}
                className={cn(
                    styles.panel,
                    'border-foreground/10 bg-background/50 relative isolate rounded-3xl border p-4 shadow-sm backdrop-blur-sm sm:p-8 md:p-10'
                )}>
                <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-12">
                    <ContactAside />

                    <div className="min-w-0">
                        {status === 'success' ? (
                            <ContactSuccess onResend={reset} />
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                {contactFields.map((field) => (
                                    <Input
                                        key={field.name}
                                        label={field.label}
                                        labelClassName={fieldLabelClassName}
                                        className={fieldAccentClassName}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        autoComplete={field.autoComplete}
                                        required={field.required}
                                        value={values[field.name]}
                                        onChange={(event) =>
                                            updateField(field.name, event.target.value)
                                        }
                                    />
                                ))}

                                <Textarea
                                    label={messageField.label}
                                    labelClassName={fieldLabelClassName}
                                    className={fieldAccentClassName}
                                    placeholder={messageField.placeholder}
                                    required
                                    value={values.message}
                                    onChange={(event) => updateField('message', event.target.value)}
                                />

                                {status === 'error' && errorMessage && (
                                    <p
                                        role="alert"
                                        className="text-sm text-red-600 dark:text-red-400">
                                        {errorMessage}
                                    </p>
                                )}

                                <div className="flex flex-col items-start gap-2">
                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                        className="group w-full sm:w-auto">
                                        {isSubmitting ? submittingLabel : submitLabel}
                                        {!isSubmitting && (
                                            <ArrowRight
                                                aria-hidden="true"
                                                className="size-4 transition-transform group-hover:translate-x-0.5"
                                            />
                                        )}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                <SpotlightBorder className={styles.border} />
            </div>
        </div>
    );
}
