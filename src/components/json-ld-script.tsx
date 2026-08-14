import { profilePageJsonLd, siteGraphJsonLd } from '@/utils/jsonLd';

/**
 * Serialises a JSON-LD node into a script tag. `<` is escaped so a value that
 * happens to contain markup can never close the script element early.
 */
const JsonLd = ({ id, data }: { id: string; data: object }) => (
    <script
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, '\\u003c')
        }}
    />
);

/**
 * Site-level identity: the `WebSite` node and the `Person` it belongs to.
 * Rendered from the root layout, so it is present on every route and every
 * other node on the site can reference the person by `@id`.
 */
export const JsonLdScript = () => <JsonLd id="jsonld-site" data={siteGraphJsonLd} />;

/**
 * The `ProfilePage` declaration. Homepage only: it is the one URL that really
 * is a profile of a person.
 */
export const ProfilePageJsonLdScript = () => (
    <JsonLd id="jsonld-profilepage" data={profilePageJsonLd} />
);
