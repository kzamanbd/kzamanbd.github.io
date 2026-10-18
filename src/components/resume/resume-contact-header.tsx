import { user } from '@/services/metadata';

const socialLinks = Object.entries({
    GitHub: user.github,
    Linkedin: user.linkedin,
    LeetCode: user.leetcode,
    Codeforces: user.codeforces
});

/** Name, title, and every way to make contact, above the resume body. */
export default function ResumeContactHeader() {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                <h1 className="text-xl font-bold">MD KAMRUZZAMAN</h1>
                <h2 className="text-lg font-semibold">Full Stack Software Engineer</h2>
                <p className="mt-1 text-sm">PHP • Laravel • JavaScript • React • Vue • AWS</p>

                <ul className="flex gap-2 text-sm">
                    <li>
                        <a href={`tel:${user.phone}`} className="contact-link">
                            <span className="font-semibold">Phone:</span>
                            <span className="underline">+880 1716-724245</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href={`mailto:${user.email}`}
                            target="_blank"
                            rel="noreferrer"
                            className="contact-link">
                            <span className="font-semibold">Email:</span>
                            <span className="underline"> {user.email}</span>
                        </a>
                    </li>
                    <li className="contact-link">
                        <span className="font-semibold">Address:</span>
                        <p>Mirpur 12, Dhaka, Bangladesh</p>
                    </li>
                </ul>

                <div className="mb-4 flex flex-wrap gap-x-2 text-sm">
                    {socialLinks.map(([name, url], index) => (
                        <div key={name} className="contact-link">
                            <a href={url} target="_blank" rel="noreferrer" className="resume-link">
                                <span>{url.replace('https://', '').replace('www.', '')}</span>
                            </a>
                            <span>{index < socialLinks.length - 1 ? '•' : ''}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
