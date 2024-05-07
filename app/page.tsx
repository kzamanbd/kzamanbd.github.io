import AboutSection from './components/Portfolio/AboutSection';
import HeroSection from './components/Portfolio/HeroSection';
import Projects from './components/Portfolio/Projects';

export default function Portfolio() {
    return (
        <div className="portfolio">
            <HeroSection />
            <AboutSection />
            <Projects />
        </div>
    );
}
