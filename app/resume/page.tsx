import CoverLetter from '../components/Resume/CoverLetter';
import Resume from '../components/Resume/Resume';

export const metadata = {
    title: 'Resume | Kamruzzaman',
    description: 'DraftScripts features for business teams like yours.'
};

export default function Home() {
    return (
        <>
            <Resume />
            <CoverLetter />
        </>
    );
}
