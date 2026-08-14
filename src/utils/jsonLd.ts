import { Graph, Person, ProfilePage, WebSite, WithContext } from 'schema-dts';

import {
    currentJobTitle,
    currentWorkplace,
    currentWorkplaceURL,
    description,
    education,
    educationURL,
    jsonLdAlternateName,
    jsonLdDescription,
    jsonLdKnowsAbout,
    siteName,
    siteThumbnail,
    siteURL,
    user
} from '@/lib/metadata';

/**
 * Stable node identifiers. Every other piece of structured data on the site —
 * article `author`, breadcrumb trails, the plugin's `author` — points at these
 * by `@id` rather than restating the person, so a crawler resolves one entity
 * instead of reconciling several near-identical copies of it.
 */
export const personId = `${siteURL}#person`;
export const websiteId = `${siteURL}#website`;

/**
 * Every profile that independently confirms this is the same person. `sameAs`
 * is only worth what the destination corroborates, so each URL here should
 * carry kzaman.com back in its own website field.
 */
const sameAs: string[] = [
    user.linkedin,
    user.github,
    user.wordpressOrg,
    user.leetcode,
    user.codeforces,
    user.youtube,
    user.twitter,
    user.facebook
];

const person: Person = {
    '@type': 'Person',
    '@id': personId,
    name: siteName,
    alternateName: jsonLdAlternateName,
    url: siteURL,
    image: siteThumbnail,
    jobTitle: currentJobTitle,
    description: jsonLdDescription,
    knowsAbout: jsonLdKnowsAbout,
    sameAs,
    worksFor: {
        '@type': 'Organization',
        '@id': `${currentWorkplaceURL}#org`,
        name: currentWorkplace,
        url: currentWorkplaceURL
    },
    alumniOf: {
        '@type': 'CollegeOrUniversity',
        '@id': `${educationURL}#alumni`,
        name: education,
        url: educationURL
    }
};

const website: WebSite = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteURL,
    name: siteName,
    description,
    inLanguage: 'en',
    publisher: { '@id': personId }
};

/**
 * The site-level graph, rendered from the root layout on every route.
 *
 * It deliberately contains no page-type node: a `ProfilePage` here would claim
 * that every URL on the site — including each article — is a profile of a
 * person, which competes with that page's own `BlogPosting` for the
 * main-entity interpretation. The page type is declared per route instead.
 */
export const siteGraphJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [website, person]
};

/**
 * The homepage, and only the homepage, is a profile page. `mainEntity` refers
 * to the person by `@id` rather than repeating the node, so the two pieces of
 * markup describe one entity rather than two similar ones.
 */
export const profilePageJsonLd: WithContext<ProfilePage> = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteURL}#profilepage`,
    url: siteURL,
    name: siteName,
    isPartOf: { '@id': websiteId },
    mainEntity: { '@id': personId }
};
