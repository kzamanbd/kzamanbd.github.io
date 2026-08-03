import ShinyText from '@/components/animations/shiny-text';
import GridBackground from '@/components/backgrounds/grid-background';
import { coreCompetencies, Github, heroStats, socialLinks } from '@/components/home/hero/contents';
import { heroId } from '@/components/layout/navbar/contents';
import { user } from '@/lib/metadata';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroArea() {
    return (
        <section
            id={heroId}
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-16">
            <GridBackground />

            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col items-center text-center">
                    {/* Availability badge */}
                    <div className="animate-fade-in-up mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-50/50 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-emerald-500/40 hover:bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                        </span>
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                            Open to exciting opportunities
                        </span>
                    </div>

                    <div className="relative mb-8 max-w-4xl space-y-4">
                        <h1
                            className="animate-fade-in-up text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl dark:text-white"
                            style={{ animationDelay: '100ms' }}>
                            <span className="mb-3 block text-xl font-semibold text-slate-500 sm:text-2xl md:text-3xl lg:text-4xl dark:text-slate-400">
                                Hello, I&apos;m
                            </span>
                            <ShinyText className="pr-2 pb-2">{user.name}</ShinyText>
                        </h1>

                        <h2
                            className="animate-fade-in-up mx-auto max-w-2xl text-lg font-medium text-slate-600 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-300"
                            style={{ animationDelay: '200ms' }}>
                            Crafting scalable and high-performance solutions as a{' '}
                            <span className="border-b-2 border-indigo-500 font-bold text-slate-900 dark:text-white">
                                Full Stack Engineer
                            </span>
                            .
                        </h2>
                    </div>

                    <p
                        className="animate-fade-in-up mb-12 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400"
                        style={{ animationDelay: '300ms' }}>
                        Bridging product vision with rigorous engineering. I specialize in building
                        robust backend architectures and highly polished user interfaces that scale
                        seamlessly.
                    </p>

                    {/* Core competencies */}
                    <ul
                        className="animate-fade-in-up mb-14 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        style={{ animationDelay: '400ms' }}>
                        {coreCompetencies.map(({ name, Icon, gradient }) => (
                            <li
                                key={name}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/40 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:border-slate-800/60 dark:bg-slate-900/40 dark:shadow-[0_8px_30px_rgb(255,255,255,0.01)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.05)]">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/5" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div
                                        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} p-2.5 text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                        <Icon className="h-full w-full" strokeWidth={2} />
                                    </div>
                                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                                        {name}
                                    </h3>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Calls to action */}
                    <div
                        className="animate-fade-in-up mb-16 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6"
                        style={{ animationDelay: '500ms' }}>
                        <Link
                            href="/resume"
                            className="focus-ring group relative flex w-full justify-center overflow-hidden rounded-full bg-slate-900 px-8 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/25 sm:w-auto dark:bg-white dark:text-slate-900 dark:hover:shadow-indigo-400/25">
                            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <span className="relative z-10 flex items-center gap-2">
                                View Resume
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </Link>

                        <a
                            href={user.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus-ring group flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3.5 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
                            <Github className="h-5 w-5" />
                            <span>GitHub Profile</span>
                        </a>
                    </div>

                    {/* Socials and quick stats */}
                    <div
                        className="animate-fade-in-up w-full max-w-4xl border-t border-slate-200/50 pt-8 dark:border-slate-800/50"
                        style={{ animationDelay: '600ms' }}>
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <ul className="flex flex-wrap justify-center gap-4">
                                {socialLinks.map(({ href, Icon, label }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="focus-ring block rounded-sm text-slate-400 transition-colors duration-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                                            aria-label={label}>
                                            <Icon className="h-6 w-6" />
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <dl className="grid grid-cols-2 gap-6 text-sm font-medium text-slate-500 sm:flex sm:gap-8 dark:text-slate-400">
                                {heroStats.map(({ value, label }) => (
                                    <div
                                        key={label}
                                        className="flex flex-col items-center last:col-span-2 last:sm:col-span-1">
                                        <dt className="sr-only">{label}</dt>
                                        <dd className="flex flex-col items-center">
                                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                                {value}
                                            </span>
                                            <span className="text-center">{label}</span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
