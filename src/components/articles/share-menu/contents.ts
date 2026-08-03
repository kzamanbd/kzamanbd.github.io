import type { ShareTarget } from '@/components/articles/share-menu/types';
import { Facebook, Linkedin } from '@/components/icons';
import WhatsApp from '@/components/icons/whatsapp';
import X from '@/components/icons/x';
import { user } from '@/lib/metadata';

const twitterHandle = user.twitter.split('/').pop() ?? '';

/**
 * The URL-based share targets, in menu order. The hover tints match each
 * platform's brand colour, so a hovered row reads as that destination.
 */
export const shareTargets: ShareTarget[] = [
    {
        name: 'X',
        Icon: X,
        buildShareUrl: ({ url, title }) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&via=${twitterHandle}`,
        brandHoverClassName: 'hover:text-black dark:hover:text-white'
    },
    {
        name: 'LinkedIn',
        Icon: Linkedin,
        buildShareUrl: ({ url }) =>
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        brandHoverClassName: 'hover:text-[#0A66C2]'
    },
    {
        name: 'Facebook',
        Icon: Facebook,
        buildShareUrl: ({ url }) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        brandHoverClassName: 'hover:text-[#0866FF]'
    },
    {
        name: 'WhatsApp',
        Icon: WhatsApp,
        buildShareUrl: ({ url, title }) =>
            `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
        brandHoverClassName: 'hover:text-[#25D366]'
    }
];
