import { ProfilePage, WithContext } from 'schema-dts';

import {
    currentJobTitle,
    currentWorkplace,
    currentWorkplaceURL,
    education,
    educationURL,
    jsonLdAlternateName,
    jsonLdDescription,
    jsonLdKnowsAbout,
    siteAuthorEmail,
    siteName,
    siteThumbnail,
    siteURL,
    user
} from '@/lib/metadata';

export const jsonLd: WithContext<ProfilePage> = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: siteURL,
    dateCreated: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntity: {
        '@type': 'Person',
        '@id': `${siteURL}#person`,
        name: siteName,
        alternateName: jsonLdAlternateName,
        url: siteURL,
        image: siteThumbnail,
        jobTitle: currentJobTitle,
        identifier: [
            {
                '@type': 'PropertyValue',
                propertyID: 'GitHub',
                value: user.github
            },
            {
                '@type': 'PropertyValue',
                propertyID: 'LinkedIn',
                value: user.linkedin
            },
            {
                '@type': 'PropertyValue',
                propertyID: 'Facebook',
                value: user.facebook
            },
            {
                '@type': 'PropertyValue',
                propertyID: 'Twitter',
                value: user.twitter
            }
        ],
        worksFor: {
            '@type': 'Organization',
            '@id': `${currentWorkplaceURL}#org`,
            name: currentWorkplace,
            url: currentWorkplaceURL
        },
        sameAs: [
            user.linkedin,
            user.github,
            user.facebook,
            user.twitter,
            `mailto:${siteAuthorEmail}`
        ],
        alumniOf: {
            '@type': 'CollegeOrUniversity',
            '@id': `${educationURL}#alumni`,
            name: education,
            url: educationURL
        },
        description: jsonLdDescription,
        interactionStatistic: [
            {
                '@type': 'InteractionCounter',
                interactionType: {
                    '@type': 'FollowAction'
                },
                userInteractionCount: 15
            },
            {
                '@type': 'InteractionCounter',
                interactionType: {
                    '@type': 'LikeAction'
                },
                userInteractionCount: 205
            }
        ],
        agentInteractionStatistic: [
            {
                '@type': 'InteractionCounter',
                interactionType: {
                    '@type': 'WriteAction'
                },
                userInteractionCount: 66
            }
        ],
        knowsAbout: jsonLdKnowsAbout
    }
};
