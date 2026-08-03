import BrandIcon from '@/components/icons/brand-icon';
import type { SVGProps } from 'react';
import { siX } from 'simple-icons';

/** The X (formerly Twitter) mark, from the official simple-icons path. */
export default function X(props: SVGProps<SVGSVGElement>) {
    return <BrandIcon icon={siX} {...props} />;
}
