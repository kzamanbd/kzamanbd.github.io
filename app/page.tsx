import ContextMenu from './components/ContextMenu';
import CoverLetter from './components/CoverLetter';
import Resume from './components/Resume';

export default function Home() {
    return (
        <ContextMenu>
            <Resume />
            <CoverLetter />
        </ContextMenu>
    );
}
