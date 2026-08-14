import { notFound, redirect, RedirectType } from 'next/navigation';
import { getLinkBySlug, updateLinkVisitCount } from '../actions';

const Page = async ({ params }: { params: Promise<{ code: string }> }) => {
    const { code } = await params;
    const link = await getLinkBySlug(code);

    if (link?.longUrl) {
        // update the visit count
        await updateLinkVisitCount(link.id);
        // redirect the long url
        redirect(link.longUrl, RedirectType.replace);
    }
    return notFound();
};

export default Page;
