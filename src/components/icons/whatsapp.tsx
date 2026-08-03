import BrandIcon from '@/components/icons/brand-icon';
import type { SVGProps } from 'react';
import { siWhatsapp } from 'simple-icons';

/** The WhatsApp mark, from the official simple-icons path. */
export default function WhatsApp(props: SVGProps<SVGSVGElement>) {
    return <BrandIcon icon={siWhatsapp} {...props} />;
}
