import AboutSection from '../components/Portfolio/AboutSection';
import ContactSection from '../components/Portfolio/Contacts';
import HeroSection from '../components/Portfolio/HeroSection';
import NavbarSection from '../components/Portfolio/Navbar';
import ProjectsSection from '../components/Portfolio/Projects';

export const metadata = {
    title: 'Portfolio | Kamruzzaman',
    description: 'DraftScripts features for business teams like yours.'
};

export default function Portfolio() {
    return (
        <div className="portfolio">
            <NavbarSection />
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
        </div>
    );
}
