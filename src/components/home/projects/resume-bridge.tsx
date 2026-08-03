import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * In-context pointer from the open-source grid to the resume, where the
 * professional, client-facing work lives in full. Keeps this section honest
 * about its scope without duplicating that work here.
 */
export default function ResumeBridge() {
    return (
        <div className="mt-14 text-center">
            <p className="text-foreground/70">
                The professional, client-facing work lives on the resume.
            </p>
            <Link
                href="/resume"
                className="focus-ring group text-foreground decoration-foreground/30 hover:decoration-foreground mt-3 inline-flex items-center gap-1.5 rounded-sm font-medium underline underline-offset-4 transition-colors">
                View resume
                <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                />
            </Link>
        </div>
    );
}
