import {
    BarChart,
    Bug,
    Cog,
    Download,
    Gauge,
    Github,
    Monitor,
    Rocket,
    ShieldCheck,
    Sparkles,
    Star,
    Wrench
} from 'lucide-react';
import { siteURL } from '@/lib/metadata';
import { getWordPressPluginInfo } from '@/lib/wordpress-plugin';
import { personId } from '@/utils/jsonLd';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { SoftwareApplication, WithContext } from 'schema-dts';

const pageURL = `${siteURL}/plugins/debug-suite`;
const pageDescription =
    'Debug Suite is a free WordPress debugging toolkit: query and hook inspection, debug-log parsing, safe wp-config editing and performance monitoring, all from inside wp-admin without shell access.';

export const metadata: Metadata = {
    // Not the old `getTitle()` helper: it appended "- DraftScripts Showcase",
    // a second brand on the one page that should read as a kzaman.com product.
    title: 'Debug Suite — WordPress Debugging Plugin',
    description: pageDescription,
    alternates: { canonical: pageURL },
    openGraph: {
        title: 'Debug Suite — WordPress debugging toolkit',
        description: pageDescription,
        url: pageURL,
        type: 'website'
    }
};

/** Where the plugin actually lives, for the CTAs and the structured data. */
const pluginSlug = 'debug-suite';
const directoryURL = `https://wordpress.org/plugins/${pluginSlug}/`;
const repositoryURL = 'https://github.com/kzamanbd/debug-suite';

const pluginData = {
    name: 'Debug Suite',
    description:
        'A comprehensive WordPress debugging toolkit that helps developers efficiently debug, monitor, and manage WordPress sites with advanced log parsing, configuration management, and performance monitoring.',
    category: 'WordPress Plugin',
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
    ]
};

/** `2026-07-23 2:36pm GMT` from the API, rendered as `July 2026`. */
function releaseMonth(lastUpdated: string): string {
    const parsed = new Date(lastUpdated.slice(0, 10));
    if (Number.isNaN(parsed.getTime())) return '';
    return parsed.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

const PluginDebugSuite = async () => {
    // Read from the directory rather than restating it. `null` when the API is
    // unreachable, in which case the numbers simply do not render.
    const info = await getWordPressPluginInfo(pluginSlug);

    const jsonLd: WithContext<SoftwareApplication> = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${pageURL}#software`,
        name: pluginData.name,
        url: pageURL,
        description: pageDescription,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'WordPress',
        ...(info?.version && { softwareVersion: info.version }),
        ...(info?.lastUpdated && { dateModified: info.lastUpdated.slice(0, 10) }),
        downloadUrl: directoryURL,
        author: { '@id': personId },
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
        }
        // No `aggregateRating`: the plugin has no ratings yet, and inventing
        // one is exactly the markup that gets structured data distrusted.
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
                        {info && (
                            <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                                v{info.version}
                            </span>
                        )}
                    </h1>

                    {/* Plugin Description */}
                    <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        {pluginData.description}
                    </p>

                    {/* Stats Row. Every figure comes from the wordpress.org API,
                        and a figure the directory does not publish yet — active
                        installs below its floor, a rating with no reviews — is
                        left off rather than filled in. */}
                    {info && (
                        <div className="mb-8 flex flex-wrap justify-center gap-6">
                            <div className="flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-gray-800/70">
                                <Download className="h-4 w-4 text-blue-600" />
                                <span className="font-semibold text-gray-800 tabular-nums dark:text-gray-200">
                                    {info.downloads.toLocaleString('en-US')}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    downloads
                                </span>
                            </div>

                            {info.rating !== null && (
                                <div className="flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-gray-800/70">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <span className="font-semibold text-gray-800 tabular-nums dark:text-gray-200">
                                        {info.rating}
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        ({info.ratingCount}{' '}
                                        {info.ratingCount === 1 ? 'review' : 'reviews'})
                                    </span>
                                </div>
                            )}

                            {info.activeInstalls !== null && (
                                <div className="flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-gray-800/70">
                                    <Monitor className="h-4 w-4 text-green-600" />
                                    <span className="font-semibold text-gray-800 tabular-nums dark:text-gray-200">
                                        {info.activeInstalls.toLocaleString('en-US')}+
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        active installs
                                    </span>
                                </div>
                            )}

                            {info.requiresWordPress && (
                                <div className="flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-gray-800/70">
                                    <Cog className="h-4 w-4 text-purple-600" />
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                                        WP {info.requiresWordPress}+
                                    </span>
                                    {info.requiresPHP && (
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            PHP {info.requiresPHP}+
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Buttons. These were two <button>s with no handler
                        and a link to github.com itself; all three now go where
                        they say they go. There is no hosted demo, so there is
                        no demo button. */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={directoryURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:from-purple-500 dark:to-blue-500">
                            <Download className="transition-transform group-hover:scale-110" />
                            Download free
                        </Link>
                        <Link
                            href={repositoryURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                            <Github className="transition-transform group-hover:scale-110" />
                            View source
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
                            {/* Version and release date come from the directory:
                                this block claimed v1.0.0 in July 2024 while the
                                directory was serving a much later release. */}
                            <div className="space-y-2">
                                {info ? (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                v{info.version}
                                            </span>
                                            {info.lastUpdated && (
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {releaseMonth(info.lastUpdated)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {info.testedUpTo
                                                ? `Tested up to WordPress ${info.testedUpTo}.`
                                                : 'Available now from the WordPress plugin directory.'}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        See the WordPress plugin directory for the current release.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white shadow-2xl dark:from-purple-500 dark:to-blue-500">
                        <h2 className="mb-4 text-3xl font-bold">Ready to Debug Like a Pro?</h2>
                        {/* The claim here used to be "join thousands of WordPress
                            developers", which the directory numbers do not
                            support. Free and installable is the true pitch. */}
                        <p className="mb-8 text-lg text-purple-100">
                            Free on the WordPress plugin directory, and installable from your own
                            wp-admin in a couple of clicks.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href={directoryURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white px-8 py-3 font-semibold text-purple-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                                Download free
                            </Link>
                            <Link
                                href={`${repositoryURL}#readme`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-purple-600">
                                Read the docs
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PluginDebugSuite;
