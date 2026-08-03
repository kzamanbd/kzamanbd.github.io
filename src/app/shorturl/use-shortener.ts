'use client';

import { useState } from 'react';
import { createLink } from './actions';

export const useUrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [shortCode, setShortCode] = useState('');
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShortenUrl = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('');
        setShortUrl('');
        setShortCode('');
        if (!longUrl) {
            setError('Please enter a URL to shorten.');
            return;
        }

        try {
            setIsLoading(true);
            const newLink = await createLink(longUrl);
            const url = new URL(newLink.shortUrl);
            setShortUrl(newLink.shortUrl);
            setShortCode(url.pathname.substring(1));
        } catch (error) {
            setError('Failed to shorten URL. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyToClipboard = () => {
        if (!shortUrl) return;
        navigator.clipboard.writeText(shortUrl);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const handleVisitUrl = () => {
        if (shortUrl) {
            window.open(shortUrl, '_blank');
        }
    };

    return {
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
    };
};
