/**
 * Coordinates programmatic (animated) scrolls with the section -> URL sync.
 *
 * While the page is being scrolled programmatically (the initial fragment glide,
 * a nav-link click, or the logo's scroll-to-top), the sync stands down so it does
 * not rewrite the hash to every section the page glides past on the way to its
 * destination. The initiator of the scroll already owns the final URL, so the
 * sync simply waits for the animation to finish.
 *
 * Time-based with a safety cap rather than an explicit begin/end pair: a missed
 * "end" can only ever leave the sync briefly idle, never stuck off.
 */
let unlockAt = 0;

/** Suppress the section -> URL sync for the next `durationMs`. */
export function lockScrollSync(durationMs: number) {
    const until = Date.now() + durationMs;
    if (until > unlockAt) unlockAt = until;
}

/** Whether the section -> URL sync is currently suppressed. */
export function isScrollSyncLocked() {
    return Date.now() < unlockAt;
}

/** Milliseconds until the sync lock lifts, or 0 when it is not locked. */
export function scrollSyncLockRemaining() {
    return Math.max(0, unlockAt - Date.now());
}
