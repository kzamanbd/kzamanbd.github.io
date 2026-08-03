import { buttonStyles, type ButtonVariant } from '@/components/ui/button';
import Link from 'next/link';
import type { ComponentProps } from 'react';

interface ButtonLinkProps extends ComponentProps<typeof Link> {
    variant?: ButtonVariant;
}

/** A link that looks like a Button, sharing one style definition with it. */
export default function ButtonLink({ variant = 'solid', className, ...rest }: ButtonLinkProps) {
    return <Link className={buttonStyles(variant, className)} {...rest} />;
}
