import BrandIcon from '@/components/icons/brand-icon';
import type { SVGProps } from 'react';
import { siYoutube } from 'simple-icons';

/** The YouTube mark, from the official simple-icons path. */
export default function YouTube(props: SVGProps<SVGSVGElement>) {
    return <BrandIcon icon={siYoutube} {...props} />;
}
