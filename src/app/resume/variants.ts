import * as backendContents from '@/app/resume/contents';
import * as frontendContents from '@/app/resume/contents.frontend';
import * as nodeContents from '@/app/resume/contents.node';
import type {
    EducationEntry,
    ExperienceEntry,
    ResumeProject,
    SkillRow
} from '@/components/resume/types';

/**
 * The resume ships as several cuts of the same facts, differing only in what
 * leads. This is the registry `/resume` reads to pick one from `?variant=`, so
 * a single URL can be pointed at a backend, a frontend or a Node/React posting
 * without editing an import and redeploying.
 *
 * Each cut lives in its own `contents*.ts` and exports the same names, which is
 * what lets them be namespace-imported and held in one table. Adding a cut is a
 * new contents file plus a row here — nothing in `page.tsx` changes.
 */

/**
 * The shape every cut exports. Declared here rather than in each contents file
 * so a new cut that forgets an export fails to typecheck at the registry.
 */
export interface ResumeContents {
    professionalSummary: string;
    skillRows: SkillRow[];
    experience: ExperienceEntry[];
    projects: ResumeProject[];
    education: EducationEntry[];
    additionalInformation: string[];
}

export interface ResumeVariant {
    /** The switcher's button text. Kept short enough to sit on one line. */
    label: string;
    /** How the page title names this cut, e.g. "Backend Engineer Resume". */
    role: string;
    contents: ResumeContents;
}

export const resumeVariants = {
    backend: {
        label: 'Backend',
        role: 'Backend Engineer',
        contents: backendContents
    },
    frontend: {
        label: 'Frontend',
        role: 'Frontend Engineer',
        contents: frontendContents
    },
    node: {
        label: 'Node / React',
        role: 'Full Stack Engineer (Node.js / React)',
        contents: nodeContents
    }
} as const satisfies Record<string, ResumeVariant>;

export type ResumeVariantKey = keyof typeof resumeVariants;

/**
 * What a bare `/resume` serves, and the fallback for anything unrecognised.
 */
export const defaultResumeVariant: ResumeVariantKey = 'backend';

export const resumeVariantKeys = Object.keys(resumeVariants) as ResumeVariantKey[];

function isResumeVariantKey(value: string): value is ResumeVariantKey {
    return value in resumeVariants;
}

/**
 * The cut a request asked for.
 *
 * An unknown or repeated `?variant=` falls back to the default rather than
 * 404ing: this URL gets pasted into applications and emails, and a resume that
 * renders the wrong cut is recoverable in a way a broken link is not. A
 * repeated parameter arrives as an array, so only the first value is read.
 */
export function resolveResumeVariant(raw: string | string[] | undefined): ResumeVariantKey {
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value && isResumeVariantKey(value)) {
        return value;
    }
    return defaultResumeVariant;
}

/** `/resume` for the default cut, `/resume?variant=x` for the rest. */
export function resumeVariantHref(key: ResumeVariantKey): string {
    return key === defaultResumeVariant ? '/resume' : `/resume?variant=${key}`;
}
