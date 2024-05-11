import AboutSection from '../components/Portfolio/AboutSection';
import ContactSection from '../components/Portfolio/Contacts';
import HeroSection from '../components/Portfolio/HeroSection';
import NavbarSection from '../components/Portfolio/Navbar';
import ProjectsSection from '../components/Portfolio/Projects';

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
