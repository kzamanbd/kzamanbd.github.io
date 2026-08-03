// Marks an element inside a SpotlightList/SpotlightGroup as a spotlit surface,
// so the group's delegated pointer listener can resolve which one the cursor is
// over. An explicit attribute rather than a tag match, because a surface can
// itself contain list items (a project card holds a <ul> of Tag chips), so
// closest('li') would light the chip under the cursor instead of the card.
//
// Deliberately a plain module with no 'use client': the attribute is consumed by
// server-rendered surfaces as well as by the client-side hook, and every export
// of a 'use client' module becomes a client reference rather than the value.
export const spotlightSurfaceAttribute = 'data-spotlight-surface';

/** Spread onto the surface element: `<li {...spotlightSurfaceProps}>`. */
export const spotlightSurfaceProps = {
    [spotlightSurfaceAttribute]: true
};
