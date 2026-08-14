import { getTitle } from '@/utils';
import {
    BarChart,
    Bug,
    Cog,
    Download,
    Gauge,
    Github,
    Monitor,
    Play,
    Rocket,
    ShieldCheck,
    Sparkles,
    Star,
    Wrench
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: getTitle('Debug Suite - WordPress Plugin')
};

// Plugin data structure
const pluginData = {
    name: 'Debug Suite',
    version: '1.0.0',
    description:
        'A comprehensive WordPress debugging toolkit that helps developers efficiently debug, monitor, and manage WordPress sites with advanced log parsing, configuration management, and performance monitoring.',
    category: 'WordPress Plugin',
    compatibility: ['WordPress 6.0+', 'PHP 8.1+', 'Multisite Compatible'],
    features: [
        {
            icon: Bug,
            title: 'WordPress Debug Management',
            description:
                'Easily manage WordPress debug constants (WP_DEBUG, WP_DEBUG_LOG, WP_DEBUG_DISPLAY) through an intuitive dashboard interface.',
            color: 'text-red-500',
            bgColor: 'bg-red-100 dark:bg-red-900/30'
        },
        {
            icon: BarChart,
            title: 'Debug Log Parsing',
            description:
                'Parse and display WordPress debug logs with syntax highlighting, filtering by severity, and comprehensive search functionality.',
            color: 'text-blue-500',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30'
        },
        {
            icon: ShieldCheck,
            title: 'Safe File Operations',
            description:
                'Secure file operations with proper path validation, permission checks, and automatic backup creation before modifications.',
            color: 'text-green-500',
            bgColor: 'bg-green-100 dark:bg-green-900/30'
        },
        {
            icon: Gauge,
            title: 'Performance Monitoring',
            description:
                'Monitor WordPress performance with log statistics, file size tracking, and system health indicators.',
            color: 'text-purple-500',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30'
        },
        {
            icon: Cog,
            title: 'REST API Integration',
            description:
                'Modern REST API architecture with comprehensive endpoints for all debugging operations and secure authentication.',
            color: 'text-orange-500',
            bgColor: 'bg-orange-100 dark:bg-orange-900/30'
        },
        {
            icon: Monitor,
            title: 'Modern Interface',
            description:
                'Clean React-based dashboard with responsive design, dark mode support, and intuitive user experience.',
            color: 'text-indigo-500',
            bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
        }
    ],
    stats: {
        downloads: '25,000+',
        rating: 4.8,
        reviews: 487,
        activeInstalls: '10,000+'
    }
};

const PluginDebugSuite = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-800/20" />
                <div className="absolute bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-800/20" />
                <div className="absolute top-1/3 right-1/3 h-60 w-60 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-800/10" />
            </div>

            <div className="relative container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    {/* Plugin Category Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 text-sm font-medium shadow-sm dark:border-purple-800/30 dark:from-purple-900/20 dark:to-blue-900/20">
                        <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
                            {pluginData.category}
                        </span>
                    </div>

                    {/* Plugin Title */}
                    <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        {pluginData.name}
                        <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                            v{pluginData.version}
                        </span>
                    </h1>

                    {/* Plugin Description */}
                    <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        {pluginData.description}
                    </p>

                    {/* Stats Row */}
                    <div className="mb-8 flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-gray-800/70">
                            <Download className="h-4 w-4 text-blue-600" />
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                {pluginData.stats.downloads}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                downloads
                            </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-gray-800/70">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                {pluginData.stats.rating}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                ({pluginData.stats.reviews} reviews)
                            </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-gray-800/70">
                            <Monitor className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                {pluginData.stats.activeInstalls}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                active installs
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:from-purple-500 dark:to-blue-500">
                            <Download className="transition-transform group-hover:scale-110" />
                            Download Free
                        </button>
                        <button className="group inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                            <Play className="transition-transform group-hover:scale-110" />
                            Live Demo
                        </button>
                        <Link
                            href="https://github.com"
                            target="_blank"
                            className="group inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                            <Github className="transition-transform group-hover:scale-110" />
                            View Source
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <section className="mb-16">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                            Powerful Features
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            Everything you need to streamline your development workflow and build
                            better applications faster.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {pluginData.features.map((feature, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800/60">
                                <div
                                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor}`}>
                                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technology Compatibility */}
                <section className="mb-16">
                    <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 p-8 dark:from-purple-900/20 dark:to-blue-900/20">
                        <div className="text-center">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                WordPress Compatibility
                            </h2>
                            <p className="mb-8 text-gray-600 dark:text-gray-300">
                                Compatible with all modern WordPress installations and hosting
                                environments
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
                                    <Wrench className="h-6 w-6 text-blue-600" />
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        WordPress 6.0+
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
                                    <span className="text-lg">🔒</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        Multisite Ready
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
                                    <span className="text-lg">⚡</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        PHP 8.1+
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
                                    <span className="text-lg">🛡️</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        Security Focused
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Overview */}
                <section className="mb-16">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Installation */}
                        <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/60">
                            <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white">
                                <Rocket className="h-5 w-5 text-green-500" />
                                Quick Install
                            </h3>
                            <div className="space-y-3">
                                <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-700">
                                    <code className="text-sm text-gray-800 dark:text-gray-200">
                                        Upload to /wp-content/plugins/
                                    </code>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Or install directly from WordPress admin plugins page
                                </p>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/60">
                            <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white">
                                <Cog className="h-5 w-5 text-blue-500" />
                                Requirements
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">PHP</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        8.1+
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">
                                        WordPress
                                    </span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        6.0+
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Memory</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        128MB+
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Latest Release */}
                        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg dark:from-green-900/20 dark:to-emerald-900/20">
                            <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white">
                                <Star className="h-5 w-5 text-yellow-500" />
                                Latest Release
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                        v{pluginData.version}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        July 2024
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Initial stable release with comprehensive WordPress debugging
                                    features
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white shadow-2xl dark:from-purple-500 dark:to-blue-500">
                        <h2 className="mb-4 text-3xl font-bold">Ready to Debug Like a Pro?</h2>
                        <p className="mb-8 text-lg text-purple-100">
                            Join thousands of WordPress developers who trust Debug Suite for their
                            daily debugging workflow.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="rounded-full bg-white px-8 py-3 font-semibold text-purple-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                                Download Free
                            </button>
                            <button className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-purple-600">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PluginDebugSuite;
