import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

/**
 * The site chrome. It lives in a route group rather than in the root layout so a
 * route can opt out of the navbar and footer simply by sitting outside `(site)`
 * — which is what `/resume` does, since it is printed rather than browsed.
 */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
