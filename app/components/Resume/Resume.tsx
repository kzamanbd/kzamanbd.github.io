import ActionButton from '@/app/components/Resume/ActionButton';
import TimelineIcon from '@/app/components/Resume/TimelineIcon';
import Image from 'next/image';

export default function Resume() {
    return (
        <div className="page resume">
            <ActionButton />

            <div className="resume-box with-photo">
                <div className="left-box">
                    <Image src="/images/profile.png" className="profile-photo" width={150} height={150} alt="profile" />
                    <div className="name--title">
                        <h1 className="text-xl font-bold">KAMRUZZAMAN</h1>
                        <h5 className="subtitle capitalize">Software Engineer</h5>
                    </div>
                    {/* contact info */}
                    <div className="subtitle">
                        <h5 className="subtitle-text">Personal Details</h5>
                    </div>
                    <ul className="mb-3 space-y-2">
                        <li className="flex items-center">
                            <a
                                href="https://codeforces.com/profile/kzamanbd"
                                target="_blank"
                                className="resume-link flex items-center">
                                <Image
                                    className="contact-icon"
                                    src="/images/codeforces.png"
                                    width="0"
                                    height="0"
                                    alt="codeforces kzamanbd"
                                />
                                <span>@kzamanbd</span>
                            </a>
                        </li>

                        <li className="flex items-center">
                            <a
                                href="https://leetcode.com/kzamanbd"
                                target="_blank"
                                className="resume-link flex items-center">
                                <Image
                                    className="contact-icon"
                                    src="/images/leetcode.svg"
                                    width="0"
                                    height="0"
                                    alt="leetcode kzamanbd"
                                />
                                <span>@kzamanbd</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://github.com/kzamanbd"
                                target="_blank"
                                className="resume-link flex items-center">
                                <Image
                                    className="contact-icon"
                                    src="/images/github.png"
                                    width={20}
                                    height={20}
                                    alt="github"
                                />
                                <span>@kzamanbd</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://linkedin.com/in/kzamanbd"
                                target="_blank"
                                className="resume-link flex items-center">
                                <Image
                                    className="contact-icon"
                                    src="/images/linkedin.png"
                                    width={20}
                                    height={20}
                                    alt="github"
                                />
                                <span>@kzamanbd</span>
                            </a>
                        </li>

                        <li>
                            <a href="tel:8801716724245" className="flex items-center">
                                <Image
                                    className="contact-icon"
                                    src="/images/phone.png"
                                    width={20}
                                    height={20}
                                    alt="phone"
                                />
                                <span className="text-sm">+880 1716 724 245</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="mailto:kzamanbn@gmail.com"
                                target="_blank"
                                className="resume-link flex items-center">
                                <Image
                                    className="contact-icon"
                                    src="/images/email.png"
                                    width={20}
                                    height={20}
                                    alt="email"
                                />
                                <span>kzamanbn@gmail.com</span>
                            </a>
                        </li>

                        <li className="flex items-center">
                            <Image
                                className="contact-icon"
                                src="/images/location.png"
                                width={20}
                                height={20}
                                alt="location"
                            />
                            <p className="text-sm">
                                Tejgaon Industrial Area,
                                <br /> 29/C & 29/D, Dhaka
                            </p>
                        </li>
                    </ul>

                    {/* Education */}
                    <div className="subtitle">
                        <h5 className="subtitle-text">Education</h5>
                    </div>
                    <section className="mb-3 text-sm">
                        <div className="mb-2">
                            <p>
                                <span className="font-bold">B.SC. In CSE </span>
                                <span>(Ongoing)</span>
                            </p>
                            <p className="italic">Southeast University.</p>
                            <p> – 251/A Tejgaon I/A, Dhaka</p>
                        </div>

                        <div>
                            <p>
                                <span className="font-bold">Diploma In CSE </span>
                                <span>(3.31) - 2019</span>
                            </p>
                            <p className="italic">Rumdo Institute of Modern Technology.</p>
                            <p> – Mymensingh City.</p>
                        </div>
                    </section>
                    {/* Key Skills */}
                    <div className="subtitle">
                        <h5 className="subtitle-text">Key Skills</h5>
                    </div>
                    <section className="grid grid-cols-3 md:grid-cols-2 gap-2 print:grid-cols-2">
                        <button className="key-button group from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 focus:ring-pink-200">
                            <span className="key-skill bg-pink-50 text-pink-500 hover:text-white">PHP/Laravel</span>
                        </button>
                        <button className="key-button group from-yellow-500 to-orange-400 group-hover:from-yellow-500 group-hover:to-orange-400 focus:ring-yellow-200">
                            <span className="key-skill bg-yellow-50 text-yellow-500 hover:text-white">JavaScript</span>
                        </button>
                        <button className="key-button group from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-lime-200">
                            <span className="key-skill bg-teal-50 text-teal-500 hover:text-black">VueJS</span>
                        </button>
                        <button className="key-button group from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-cyan-200">
                            <span className="key-skill bg-cyan-50 text-cyan-500 hover:text-white">React</span>
                        </button>
                    </section>
                    {/* Training */}
                    <div className="subtitle left mt-3">
                        <h5 className="subtitle-text">Training</h5>
                    </div>
                    <section className="space-y-2 text-sm">
                        <div>
                            <p className="resume-link font-bold">PHP/Laravel (2019)</p>
                            <p className="italic">Creative It Institute, Dhaka.</p>
                        </div>
                        <div>
                            <a
                                href="https://learnwithsumit.com/certificates/verify/LWSCTXN-F584A5R7"
                                target="_blank"
                                className="resume-link font-bold">
                                Redux (2023)
                            </a>
                            <p className="italic">Learn with Sumit.</p>
                        </div>
                    </section>
                </div>
                <div className="right-box">
                    <h5 className="subtitle">Summary</h5>

                    <p className="mb-5 text-sm">
                        Over three years of experience building web applications, updating existing web applications,
                        and fixing bugs. I like to learn and use new technology in web development. I have worked
                        extensively on various stages of application development by creating & implementing application
                        architecture, which includes various stages in development, code signing, and releasing to
                        Market and collaborative environments for the web platform.
                    </p>

                    {/* Experience section */}
                    <h5 className="subtitle mb-5">Professional Experience</h5>

                    <ol className="relative border-l border-primary-500">
                        <li className="mb-6 ml-6">
                            <TimelineIcon className="-top-1" />
                            <h3 className="mb-1 md:flex print:flex items-center font-bold text-gray-900">
                                <div className="mr-2">Software Engineer</div>
                                <div className="text-sm font-medium text-primary-800 flex space-x-1">
                                    <span>at</span>
                                    <div className="md:flex print:flex items-center space-x-1">
                                        <a href="https://mononsoft.org" target="_blank" className="underline">
                                            MononSoft Ltd.
                                        </a>
                                        <a href="https://jmigroup-bd.com" target="_blank" className="underline">
                                            (A Sister Concern of JMI Group)
                                        </a>
                                    </div>
                                </div>
                            </h3>
                            <div className="mb-3 space-y-1 md:space-y-0 print:space-y-0 md:flex print:flex items-center justify-between">
                                <time className="block text-sm font-normal leading-none text-gray-700">
                                    Jun 2021 - Present
                                </time>
                                <address className="text-xs">52 New Eskaton Road, Dhaka-1000.</address>
                            </div>
                            <ul className="bullet-list">
                                <li className="flex items-center">
                                    <div className="mr-4">
                                        <div className="bullet"></div>
                                    </div>
                                    <p>Developing an ERP system based on Laravel, Vue.js and React.js.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-4">
                                        <div className="bullet"></div>
                                    </div>
                                    <p>Developing software solutions to meet customer needs.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-4">
                                        <div className="bullet"></div>
                                    </div>
                                    <p>Creating and implementing the source code of new applications.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-4">
                                        <div className="bullet"></div>
                                    </div>
                                    <p>Testing source code and debugging code.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-4">
                                        <div className="bullet"></div>
                                    </div>
                                    <p>Evaluating existing applications and performing updates and modifications.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-4">
                                        <div className="bullet"></div>
                                    </div>
                                    <p>
                                        Developing technical handbooks to represent the design and code of new
                                        applications.
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-6 ml-6">
                            <TimelineIcon />
                            <h3 className="mb-1 md:flex print:flex items-center font-bold text-gray-900">
                                <div>Junior Software Engineer</div>
                                <a
                                    href="https://maxsop.com/"
                                    className="ml-2 text-sm font-medium text-primary-800"
                                    target="_blank">
                                    at <span className="underline">MaxSOP</span>
                                </a>
                            </h3>
                            <div className="mb-3 space-y-1 md:space-y-0 print:space-y-0 md:flex print:flex items-center justify-between">
                                <time className="block text-sm font-normal leading-none text-gray-700">
                                    May 2020 – Jun 2021
                                </time>
                                <address className="text-xs">27/2 Ram Babu Road, Mymensingh-2200</address>
                            </div>
                            <ul className="bullet-list">
                                <li className="flex items-center">
                                    <div className="mr-4">
                                        <div className="bullet"></div>
                                    </div>
                                    <p>Developing web applications based on PHP frameworks - Laravel, Vue JS.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-4">
                                        <div className="bullet"></div>
                                    </div>
                                    <p>Build efficient, testable & reusable codes. Modify existing code as needed.</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-4">
                                        <div className="bullet"></div>
                                    </div>
                                    <p>
                                        Executed and monitored standards for user interfaces page design and
                                        development.
                                    </p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-4">
                                        <div className="bullet"></div>
                                    </div>
                                    <p>Perform other operational tasks based on {`"as and when required"`}.</p>
                                </li>
                            </ul>
                        </li>
                    </ol>

                    {/* Additional Skills */}
                    <h5 className="subtitle">Additional Skills</h5>

                    <ul className="bullet-list ml-4">
                        <li className="flex items-center">
                            <div className="mr-4">
                                <div className="bullet"></div>
                            </div>
                            <p>A solid foundation on OOP, Algorithm, Data Structure.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <div className="bullet"></div>
                            </div>
                            <p>Knowledge on Web Services likes REST/JSON/XML APIs.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <div className="bullet"></div>
                            </div>
                            <p>SQL, MySQL, TypeScript, Redux, Tailwind CSS, Bootstrap, Vuetify and Livewire.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <div className="bullet"></div>
                            </div>
                            <p>Experience with Software Development Life Cycle (SDLC) and Agile methodologies.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <div className="bullet"></div>
                            </div>
                            <p>
                                Experience in working with version control systems like Git, Bitbucket, GitLab, and
                                GitHub.
                            </p>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <div className="bullet"></div>
                            </div>
                            <p>Basic knowledge of Cloud Platforms like AWS, Microsoft Azure, Google Cloud Platform.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <div className="bullet"></div>
                            </div>
                            <p>Experience working in a Dockerized environment.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <div className="bullet"></div>
                            </div>
                            <p>
                                Familiarity with DevOps processes and tools (Docker), Linux or Other Unix-based systems.
                            </p>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <div className="bullet"></div>
                            </div>
                            <p>Ability to work individually and independently with minimal supervision.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <div className="bullet"></div>
                            </div>
                            <p>Problem-solving skills, Self-managed, independent, initiative and proactive.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
