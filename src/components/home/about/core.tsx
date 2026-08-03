import styles from '@/components/home/about/core.module.css';
import { profileImage, user } from '@/lib/metadata';
import { cn } from '@/utils/cn';
import Image from 'next/image';

/**
 * The central node of the diagram: the portrait with a soft, slowly pulsing
 * accent glow. No name, title or quote, because the hero already carries those;
 * the portrait itself is the hub the facets wire into.
 */
export default function Core() {
    return (
        <div className="relative z-10 flex justify-center lg:col-start-2 lg:row-start-2">
            <div className="relative">
                <span aria-hidden="true" className={styles.glow} />
                {/* `width`/`height` carry the source file's real 3422x3480
                    ratio rather than a square, so the declared ratio matches the
                    intrinsic one; the circular box is CSS, cropped by
                    object-cover, and sets both dimensions. */}
                <Image
                    src={profileImage}
                    alt={`Portrait of ${user.name}`}
                    width={342}
                    height={348}
                    draggable={false}
                    className={cn(
                        styles.photo,
                        'ring-background relative size-40 shrink-0 rounded-full object-cover shadow-xl ring-4 sm:size-48'
                    )}
                />
            </div>
        </div>
    );
}
