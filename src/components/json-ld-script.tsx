import { jsonLd } from '@/utils/jsonLd';

export const JsonLdScript = () => {
    return (
        <script
            id="jsonld-person"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
            }}
        />
    );
};
