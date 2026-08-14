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
    description: string;
    phone: string;
    email: string;
    address: string;
}

export const description = `5+ yrs of hands-on experience in PHP, Laravel, WordPress, Vue.js, React, and AWS. Skilled in building and optimizing web apps from architecture to deployment. Passionate about learning new tools and delivering scalable, high-quality solutions in team environments`;

export const authorName = 'KAMRUZZAMAN';

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
export const careerExperience: number = new Date().getFullYear() - 2021;

// education
export const education: string = 'Bachelor of Science in Computer Science and Engineering';
export const educationURL: string = 'https://www.seu.edu.bd/';

// json-ld
export const jsonLdAlternateName: string = 'kzamanbd';
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
    youtube: 'https://www.youtube.com/@draftscripts',
    twitter: 'https://x.com/_kzamanbd',
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
