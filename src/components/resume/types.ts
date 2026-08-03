/**
 * The resume's shapes. They live beside the components rather than beside the
 * route so `src/components` never has to import from `src/app`: the page owns
 * the data, the components own its contract.
 */

export interface ResumeCompany {
    name: string;
    url: string;
}

export interface ExperienceEntry {
    role: string;
    /** One employer, or an employer plus the group it belongs to. */
    companies: ResumeCompany[];
    logo: string;
    period: string;
    location: string;
    bullets: string[];
}

export interface EducationEntry {
    degree: string;
    institution: string;
    period: string;
    location: string;
}

export interface SkillRow {
    label: string;
    value: string;
}
