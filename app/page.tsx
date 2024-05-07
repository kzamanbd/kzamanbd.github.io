import AboutSection from './components/Portfolio/AboutSection';
import HeroSection from './components/Portfolio/HeroSection';
import Navbar from './components/Portfolio/Navbar';
import Projects from './components/Portfolio/Projects';

export default function Portfolio() {
    return (
        <div className="portfolio">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <Projects />
        </div>
    );
}
