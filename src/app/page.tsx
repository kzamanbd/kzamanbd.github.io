import AboutArea from '@/components/home/about';
import ArticlesArea from '@/components/home/articles';
import HeroArea from '@/components/home/hero';
import SkillsArea from '@/components/home/skills';
import SectionUrlSync from '@/components/layout/section-url-sync';

const Home = () => {
    return (
        // No background of its own: the body's --background token governs, so the
        // page, the footer and every glass surface sit on one colour instead of
        // the page overriding it and leaving the footer on a different shade.
        <div className="relative overflow-hidden font-sans selection:bg-indigo-500/30">
            {/* Ambient glow orbs, shared by every section below. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="animate-pulse-slow absolute top-[-20%] left-[-10%] h-[70vh] w-[70vw] rounded-full bg-indigo-500/10 mix-blend-multiply blur-[120px] dark:bg-indigo-500/20 dark:mix-blend-screen" />
                <div className="animate-pulse-slow absolute top-[20%] right-[-10%] h-[60vh] w-[60vw] rounded-full bg-cyan-500/10 mix-blend-multiply blur-[120px] [animation-delay:2s] dark:bg-cyan-500/10 dark:mix-blend-screen" />
                <div className="animate-pulse-slow absolute bottom-[-20%] left-[20%] h-[50vh] w-[50vw] rounded-full bg-purple-500/10 mix-blend-multiply blur-[100px] [animation-delay:4s] dark:bg-purple-500/10 dark:mix-blend-screen" />
            </div>

            {/* `home-sections` drives the per-section accent swell in globals.css,
                so consecutive sections blend into each other with no seam. */}
            <main className="home-sections relative">
                <HeroArea />
                <AboutArea />
                <SkillsArea />
                <ArticlesArea />
            </main>

            <SectionUrlSync />
        </div>
    );
};

export default Home;
