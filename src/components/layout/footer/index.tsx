import FooterBottom from '@/components/layout/footer/footer-bottom';

export default function Footer() {
    return (
        <footer className="flex flex-col pt-8 print:hidden">
            <div className="container mx-auto flex grow flex-col px-4">
                <FooterBottom />
            </div>
        </footer>
    );
}
