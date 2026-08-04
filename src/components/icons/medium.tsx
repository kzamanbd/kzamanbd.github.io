import BrandIcon from '@/components/icons/brand-icon';
import type { SVGProps } from 'react';
import { siMedium } from 'simple-icons';

/** The Medium mark, from the official simple-icons path. */
export default function Medium(props: SVGProps<SVGSVGElement>) {
    return <BrandIcon icon={siMedium} {...props} />;
}
