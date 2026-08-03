import ContactForm from '@/components/contact-form';
import AboutArea from '@/components/home/about';
import HeroArea from '@/components/home/hero';
import SkillsArea from '@/components/home/skills';
import SectionUrlSync from '@/components/layout/section-url-sync';
import ProjectsSection from '@/components/projects-section';

const Home = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50 font-sans selection:bg-indigo-500/30 dark:bg-gray-950">
            {/* Ambient glow orbs, shared by every section below. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="animate-pulse-slow absolute -top-[20%] -left-[10%] h-[70vh] w-[70vw] rounded-full bg-indigo-500/10 mix-blend-multiply blur-[120px] dark:bg-indigo-500/20 dark:mix-blend-screen" />
                <div className="animate-pulse-slow absolute top-[20%] -right-[10%] h-[60vh] w-[60vw] rounded-full bg-cyan-500/10 mix-blend-multiply blur-[120px] [animation-delay:2s] dark:bg-cyan-500/10 dark:mix-blend-screen" />
                <div className="animate-pulse-slow absolute -bottom-[20%] left-[20%] h-[50vh] w-[50vw] rounded-full bg-purple-500/10 mix-blend-multiply blur-[100px] [animation-delay:4s] dark:bg-purple-500/10 dark:mix-blend-screen" />
            </div>

            <main>
                <HeroArea />
                <AboutArea />
                <SkillsArea />
                <ProjectsSection />
                <ContactForm />
            </main>

            <SectionUrlSync />
        </div>
    );
};

export default Home;
