import { Code, Eye, Github, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from './projects-section';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 p-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-full w-full rounded-2xl bg-white dark:bg-gray-800"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10">
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                    {/* Role Badge - Floating */}
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/95">
                            <Sparkles className="h-3 w-3 text-purple-600" />
                            {project.role}
                        </div>
                    </div>

                    {/* Action Buttons - Enhanced */}
                    <div className="absolute right-4 bottom-4 flex translate-y-2 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {project.demo && (
                            <Link
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-blue-500 hover:text-white"
                                title="View Demo">
                                <Eye size={16} />
                            </Link>
                        )}
                        {project.code && (
                            <Link
                                href={project.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-gray-900 hover:text-white"
                                title="View Code">
                                <Github size={16} />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                    {/* Project Title */}
                    <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                        {project.name}
                    </h3>

                    {/* Project Description */}
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                            <Code className="h-3 w-3 text-purple-600" />
                            Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.slice(0, 5).map((tool, index) => (
                                <span
                                    key={index}
                                    className="rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-200 hover:from-purple-100 hover:to-blue-50 hover:text-purple-700 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300 dark:hover:from-purple-900/50 dark:hover:to-blue-900/50 dark:hover:text-purple-300">
                                    {tool}
                                </span>
                            ))}
                            {project.tools.length > 5 && (
                                <span className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-1.5 text-xs font-medium text-purple-600 dark:from-purple-900/30 dark:to-blue-900/30 dark:text-purple-400">
                                    +{project.tools.length - 5} more
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 bg-clip-border opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
        </div>
    );
};

export default ProjectCard;
