'use client';

import Button from '@/components/ui/button';
import { Printer } from 'lucide-react';

/**
 * The print action for the resume page. It exists as its own client component
 * because the page itself is a server component: an inline `onClick` there
 * cannot be serialised and fails the build.
 */
export default function PrintButton() {
    return (
        <Button onClick={() => window.print()} className="group">
            <Printer aria-hidden="true" className="size-4" />
            Print resume
        </Button>
    );
}
