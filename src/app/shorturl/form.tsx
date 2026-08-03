'use client';

import { Check, Copy, Eye, Link as LinkIcon, Loader } from 'lucide-react';
import { useUrlShortener } from './use-shortener';

const URLShortenerForm = () => {
    const {
        longUrl,
        setLongUrl,
        shortUrl,
        shortCode,
        error,
        isCopied,
        isLoading,
        handleShortenUrl,
        handleCopyToClipboard,
        handleVisitUrl
    } = useUrlShortener();

    return (
        <div className="mx-auto w-full max-w-2xl p-4 md:p-8">
            <div className="mb-8 text-center">
                <div className="mb-4 inline-block rounded-full bg-indigo-100 p-4">
                    <LinkIcon className="h-12 w-12 text-indigo-500" />
                </div>
                <h1 className="mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
                    URL Shortener
                </h1>
                <p className="text-lg text-gray-600">
                    Create concise, shareable links from long URLs in seconds.
                </p>
            </div>

            <form onSubmit={handleShortenUrl} className="mb-8">
                <div className="focus-within:ring-primary-500 flex rounded-md ring-1 ring-gray-200 focus-within:ring-2 dark:ring-gray-600">
                    <span className="flex items-center justify-center rounded-tl-md rounded-bl-md bg-gray-200 px-4 font-semibold dark:bg-gray-800">
                        <LinkIcon className="h-5 w-5" />
                    </span>
                    <input
                        type="url"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="https://example.com/very-long-url-to-shorten"
                        className="w-full bg-white p-4 text-gray-900 placeholder-gray-400 transition-colors focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !longUrl}
                        className="flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-indigo-700 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800">
                        {isLoading ? <Loader className="h-6 w-6 animate-spin" /> : 'Shorten'}
                    </button>
                </div>
            </form>

            {error && (
                <p className="mt-4 rounded-lg bg-red-100 p-3 text-center text-red-600">{error}</p>
            )}

            {shortCode && (
                <div className="animate-fade-in-up rounded-2xl border border-gray-200 bg-white/50 p-6 backdrop-blur-sm">
                    <h2 className="mb-4 text-center text-xl font-bold text-indigo-600">
                        Your Short Link is Ready!
                    </h2>
                    <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 md:flex-row">
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center text-lg font-semibold break-all text-green-600 transition-colors hover:text-green-500 md:text-left">
                            {shortUrl}
                        </a>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopyToClipboard}
                                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md transition-colors hover:bg-indigo-700"
                                title="Copy to Clipboard">
                                {isCopied ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    <Copy className="h-5 w-5" />
                                )}
                                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                            </button>
                            <button
                                onClick={handleVisitUrl}
                                className="rounded-lg bg-gray-200 p-3 text-gray-700 shadow-md transition-colors hover:bg-gray-300"
                                title="Test Short URL">
                                <Eye className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default URLShortenerForm;
