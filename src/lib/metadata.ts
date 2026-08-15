export interface User {
    name: string;
    designation: string;
    github: string;
    linkedin: string;
    codeforces: string;
    facebook: string;
    leetcode: string;
    medium: string;
    youtube: string;
    twitter: string;
    /** wordpress.org profile: the strongest topical corroboration there is. */
    wordpressOrg: string;
    description: string;
    phone: string;
    email: string;
    address: string;
}

/**
 * The first professional role, from the resume (MaxSOP, May 2020). Every
 * "N+ years" claim on the site derives from this one date: the hero stat, the
 * about copy, the resume summary and the JSON-LD description used to disagree
 * with each other, which is exactly the kind of contradiction a reader — or a
 * search engine assessing the site — notices first.
 */
export const careerStart = new Date('2020-05-01T00:00:00Z');

/** Completed years since `careerStart`, so the claim ages by itself. */
export const careerExperience: number = Math.floor(
    (Date.now() - careerStart.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
);

export const description = `${careerExperience}+ yrs of hands-on experience in PHP, Laravel, WordPress, Vue.js, React, and AWS. Skilled in building and optimizing web apps from architecture to deployment. Passionate about learning new tools and delivering scalable, high-quality solutions in team environments`;

/**
 * One canonical spelling of the name, everywhere. Search engines resolve a
 * person entity by matching this string across every profile that claims to be
 * the same person, so it has to read identically here, on LinkedIn, on GitHub
 * and on wordpress.org. `kzamanbd` is the handle, carried as `alternateName`.
 */
export const authorName = 'Md Kamruzzaman';

export const siteName = authorName;

export const siteURL = 'https://kzaman.com';

export const siteThumbnail = '/thumbnail.png';

export const siteAuthorEmail = 'kzamanbn@gmail.com';

export const profileImage = '/kzaman.jpg';

export const siteKeywords: string[] = [
    'Kamruzzaman',
    'kzaman',
    'kzamanbd',
    'Full Stack Developer',
    'Web Developer',
    'Software Engineer',
    'Portfolio',
    'PHP',
    'Laravel',
    'Vue.js',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Express.js',
    'MySQL',
    'Next.js',
    'Nuxt.js',
    'Tailwind CSS'
];

// workspace
export const currentJobTitle: string = 'Software Engineer (Full Stack)';
export const currentWorkplace: string = 'weDevs';
export const currentWorkplaceURL: string = 'https://wedevs.com';

// education
export const education: string = 'Bachelor of Science in Computer Science and Engineering';
export const educationURL: string = 'https://www.seu.edu.bd/';

// json-ld
/**
 * Every string people actually use for this person, so the entity matches
 * whichever variant is typed. `authorName` is the canonical form and is set
 * separately as `name`; these are the alternates, not replacements for it.
 *
 * `Kamruzzaman` is an ambiguous name — the query returns a politician, several
 * professors and a cricketer — so claiming the variants is what lets Google
 * attach the right one of them to this site.
 */
export const jsonLdAlternateName: string[] = ['Kamruzzaman', 'kzamanbd', 'Zaman'];
export const jsonLdKnowsAbout: string[] = [
    'Web Development',
    'PHP',
    'Laravel',
    'MySQL',
    'PostgreSQL',
    'Docker',
    'Git',
    'Next.js',
    'React',
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS',
    'Tailwind CSS'
];
export const jsonLdDescription: string = `${authorName} is a passionate and experienced Full-Stack Software Engineer with over ${careerExperience} years of expertise in building scalable, high-performance web applications. He specializes in modern JavaScript frameworks, Laravel, RESTful APIs, and DevOps tools like Docker. Currently working at ${currentWorkplace}, he is committed to delivering clean, maintainable code and crafting seamless user experiences across platforms.`;

export const user: User = {
    name: authorName,
    designation: currentJobTitle,
    github: 'https://github.com/kzamanbd',
    linkedin: 'https://www.linkedin.com/in/kzamanbd',
    codeforces: 'https://codeforces.com/profile/kzamanbd',
    facebook: 'https://www.facebook.com/kzaman.me',
    leetcode: 'https://leetcode.com/u/kzamanbd',
    medium: 'https://medium.com/@kzamanbd',
    youtube: 'https://www.youtube.com/@kzamanhq',
    twitter: 'https://x.com/kzamanhq',
    wordpressOrg: 'https://profiles.wordpress.org/kzamanbd/',
    description: description,
    phone: '+8801716724245',
    email: 'kzamanbn@gmail.com',
    address: 'Dhaka, Bangladesh'
};

// Analytics and social identity. Moved here from layout.tsx so every consumer
// reads one source rather than re-declaring the ids.
export const googleTagManagerId: string = 'G-NB5NCE8041';
export const facebookPageId: string = '561025357095593';

/**
 * Search engine ownership tokens. Public strings, not secrets: they only prove
 * control of this site to the tool that issued them, which is why they sit in
 * source next to the analytics ids rather than in the environment.
 *
 * Google is additionally verified at the DNS level — kzaman.com carries a
 * `google-site-verification=` TXT record, which is what backs the Search
 * Console *Domain* property and covers http, https, www and non-www together.
 * The meta tag below is a second, weaker signal for the same ownership; the DNS
 * record is the one that matters and must not be removed from Cloudflare.
 *
 * Leave a token empty and its tag is not rendered at all — an empty
 * `content=""` verifies nothing and reads as a broken deploy. Bing is not set
 * up yet; the fastest route is importing the property from Search Console,
 * which needs no token here.
 */
export const googleSiteVerification: string = '5495XQcOZj0V61G4yEWuxD7eKk4z1C2FPFokFweCtj8';
export const bingSiteVerification: string = '';

/**
 * giscus comment widget, backed by GitHub Discussions.
 *
 * `repoId` and `categoryId` are opaque node IDs generated at https://giscus.app
 * after enabling Discussions on the repository and installing the giscus GitHub
 * App. Until both are filled in, `isGiscusConfigured` is false and the comment
 * section does not render at all, rather than showing giscus's error panel.
 */
export const giscus = {
    repo: 'kzamanbd/kzamanbd.github.io' as `${string}/${string}`,
    repoId: '',
    category: 'Comments',
    categoryId: ''
};

export const isGiscusConfigured: boolean = giscus.repoId.length > 0 && giscus.categoryId.length > 0;
