// A fixed grid of 0/1 digits used as the footer signature's "binary" reveal.
// The output must be identical on the server and the first client render, so it
// is generated from a seeded pseudo-random sequence (never Math.random), keeping
// hydration stable. useBinaryFlicker mutates it afterwards, on the client only.

// The alphabet the field is drawn from, one entry picked at random per cell.
// This is the single place to change the look: swap in any characters you like
// (hex digits, ['+', '-'], or a custom set). Both the initial grid and
// useBinaryFlicker read from here, so they always stay in sync.
export const FIELD_CHARACTERS: readonly string[] = ['0', '1'];

// Rows and columns are chosen once and scaled by the reveal's font size (in
// container-query units), so the same character counts fill the wordmark at
// every width. The grid is anchored at the left and the letterform mask crops
// the overflow, so the column count over-covers generously on purpose: the last
// glyph sits flush against the right edge, so a narrow monospace fallback must
// never leave it short.
export const BINARY_FIELD_ROWS = 26;
export const BINARY_FIELD_COLS = 300;
export const BINARY_FIELD_SEED = 0x5f3759df;

// Small deterministic PRNG (mulberry32): same seed, same sequence, everywhere.
function createRandom(seed: number): () => number {
    let state = seed >>> 0;
    return () => {
        state = (state + 0x6d2b79f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/**
 * Builds `rows` lines of `cols` binary digits, newline-separated, so a
 * `white-space: pre` block renders it as an aligned monospace grid.
 */
export function generateBinaryField(
    rows = BINARY_FIELD_ROWS,
    cols = BINARY_FIELD_COLS,
    seed = BINARY_FIELD_SEED
): string {
    const random = createRandom(seed);
    const lines: string[] = [];
    for (let row = 0; row < rows; row++) {
        let line = '';
        for (let col = 0; col < cols; col++) {
            line += FIELD_CHARACTERS[Math.floor(random() * FIELD_CHARACTERS.length)] ?? '0';
        }
        lines.push(line);
    }
    return lines.join('\n');
}
