import ContactForm from '@/components/home/contact/contact-form';
import { socialLinks } from '@/components/home/hero/contents';

export default function ContactArea() {
    return (
        <section id="contact" className="relative px-4 py-24">
            <div className="container mx-auto flex max-w-6xl flex-col items-center text-center">
                <ContactForm />

                <ul className="mt-16 flex flex-wrap justify-center gap-4">
                    {socialLinks.map(({ href, Icon, label }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="focus-ring text-foreground/50 hover:text-foreground block rounded-sm transition-colors duration-300">
                                <Icon className="size-6" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
