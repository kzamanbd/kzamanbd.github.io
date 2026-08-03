import { Code, Sparkles } from 'lucide-react';
import ProjectCard from './project-card';

export interface Project {
    id: number;
    name: string;
    description: string;
    tools: string[];
    role: string;
    code: string;
    demo: string;
    image: string;
}

const projectsData: Project[] = [
    {
        id: 1,
        name: 'AI Powered Financial App',
        description:
            "Me and my team built an AI-powered financial mobile application. I have developed API using Express, Typescript, OpenAI, AWS, and MongoDB. Used OTP via AWS SES, Google, and Facebook for the authentication system. Built AI assistants using OpenAI's latest model and trained using our dataset.",
        tools: [
            'Express',
            'MongoDB',
            'OpenAI API',
            'AWS SES',
            'AWS S3',
            'Node Mailer',
            'Joi',
            'Puppeteer',
            'EC2',
            'PM2',
            'Nginx'
        ],
        role: 'Backend Developer',
        code: '',
        demo: '',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    },
    {
        id: 2,
        name: 'Travel Agency App',
        description:
            'I have designed and developed a full-stack web app for 2Expedition, a travel agency in Armenia. I created the UI using NextJS, Typescript, MUI, TailwindCSS, Google Maps, Sun-Editor, and React Slick. The app supports multiple languages and currencies.',
        tools: [
            'NextJS',
            'Tailwind CSS',
            'Google Maps',
            'NestJS',
            'TypeScript',
            'MySQL',
            'AWS S3',
            'Sun-Editor',
            'Gmail Passkey'
        ],
        role: 'Full Stack Developer',
        code: '',
        demo: '',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop'
    },
    {
        id: 3,
        name: 'AI Powered Real Estate',
        description:
            'My team built an AI-based real estate app using Replicate API and OpenAI. We used Express, Typescript, OpenAI, Replicate, Stripe, and Mongoose to develop the API. We utilized NextJS, Formik, TailwindCSS, and other npm libraries for the UI.',
        tools: [
            'React',
            'Bootstrap',
            'SCSS',
            'Stripe',
            'Express',
            'TypeScript',
            'MongoDB',
            'Azure Blob',
            'OpenAI API',
            'Replicate AI',
            'Cronjob',
            'JWT'
        ],
        code: '',
        role: 'Full Stack Developer',
        demo: '',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop'
    },
    {
        id: 4,
        name: 'Newsroom Management',
        description:
            'My team and I developed a newspaper management dashboard application called Newsroom Management. As a front-end developer, I worked on creating the dashboard using NextJS, Material UI, Redux, Calendar, and other necessary npm libraries.',
        tools: ['NextJS', 'Material UI', 'Redux', 'Sun Editor', 'Calendar'],
        code: '',
        demo: '',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
        role: 'Full Stack Developer'
    }
];

const ProjectsSection = () => {
    return (
        <section
            id="work"
            className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-800/20" />
                <div className="absolute bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-800/20" />
                <div className="absolute top-1/3 right-1/3 h-60 w-60 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-800/10" />
            </div>

            <div className="relative container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 text-sm font-medium shadow-sm dark:border-purple-800/30 dark:from-purple-900/20 dark:to-blue-900/20">
                        <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
                            Featured Work
                        </span>
                    </div>

                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                        My Recent{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
                            Projects
                        </span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        Here are some of my recent projects that showcase my skills in web
                        development, backend APIs, and modern technologies. Each project represents
                        a unique challenge and solution.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:gap-10">
                    {projectsData.map((project: Project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* View All Projects CTA */}
                <div className="mt-16 text-center">
                    <div className="rounded-2xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
                        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-blue-100 p-3 dark:from-purple-900/30 dark:to-blue-900/30">
                            <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>

                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                            Interested in working together?
                        </h3>

                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            I&apos;m always open to discussing new opportunities and exciting
                            projects. Let&apos;s create something amazing together!
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="mailto:kzamanbn@gmail.com"
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:from-purple-500 dark:to-blue-500">
                                Get in Touch
                                <Sparkles className="h-4 w-4" />
                            </a>

                            <a
                                href="/resume"
                                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                View Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
