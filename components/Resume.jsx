import DocExport from '@/components/DocExport';
import Image from 'next/image';

export default function Resume() {
    return (
        <div id='resume' className='page'>
            <DocExport />

            <div className='resume-box'>
                <div className='left-box'>
                    <Image
                        src='/images/profile.png'
                        className='mx-auto rounded-full bg-primary-400 object-cover'
                        width={150}
                        height={150}
                        alt='profile'
                    />
                    <h1 className='mt-4 text-center text-xl font-bold'>KAMRUZZAMAN</h1>
                    <p className='subtitle mb-6 text-center capitalize'>Software Engineer</p>
                    {/* contact info */}
                    <div className='subtitle left'>
                        <p className='subtitle-border'>Personal Details</p>
                    </div>
                    <ul className='mb-3 space-y-2'>
                        {/* <li className='flex items-center'>
                            <Image
                                className='contact-icon'
                                src='/images/user.png'
                                width={20}
                                height={20}
                                alt='KAMRUZZAMAN'
                            />
                            <p className='text-sm'>KAMRUZZAMAN</p>
                        </li> */}
                        <li className='flex items-center'>
                            <Image
                                className='contact-icon'
                                src='/images/phone.png'
                                width={20}
                                height={20}
                                alt='phone'
                            />
                            <p className='text-sm'>+880 1716 724 245</p>
                        </li>

                        <li className='flex items-center'>
                            <Image
                                className='contact-icon'
                                src='/images/email.png'
                                width={20}
                                height={20}
                                alt='email'
                            />
                            <a
                                href='mailto:kzamanbn@gmail.com'
                                target='_blank'
                                className='resume-link'
                                rel='noreferrer'>
                                kzamanbn@gmail.com
                            </a>
                        </li>

                        <li className='flex items-center'>
                            <Image
                                className='contact-icon'
                                src='/images/location.png'
                                width={20}
                                height={20}
                                alt='location'
                            />
                            <p className='text-sm'>
                                Tejgaon Industrial Area,
                                <br /> 29/C & 29/D, Dhaka
                            </p>
                        </li>

                        <li className='flex items-center'>
                            <Image
                                className='contact-icon'
                                src='/images/github.png'
                                width={20}
                                height={20}
                                alt='github'
                            />
                            <a
                                href='https://github.com/kzamaan'
                                target='_blank'
                                className='resume-link'
                                rel='noreferrer'>
                                github.com/kzamaan
                            </a>
                        </li>
                        <li className='flex items-center'>
                            <Image
                                className='contact-icon'
                                src='/images/linkedin.png'
                                width={20}
                                height={20}
                                alt='github'
                            />
                            <a
                                href='https://linkedin.com/in/kzamanbd'
                                target='_blank'
                                className='resume-link'
                                rel='noreferrer'>
                                linkedin.com/in/kzamanbd
                            </a>
                        </li>
                    </ul>

                    {/* Education */}
                    <div className='subtitle left'>
                        <p className='subtitle-border'>Education</p>
                    </div>
                    <div className='mb-3 text-sm'>
                        <div className='mb-2'>
                            <p>
                                <span className='font-bold'>B.SC. In CSE </span>
                                <span>(Continuing)</span>
                            </p>
                            <p className='italic'>Southeast University.</p>
                            <p> – 251/A Tejgaon I/A, Dhaka</p>
                        </div>

                        <div>
                            <p>
                                <span className='font-bold'>Diploma In CSE </span>
                                <span>(3.31) - 2019</span>
                            </p>
                            <p className='italic'>Rumdo Institute of Modern Technology.</p>
                            <p> – Mymensingh City.</p>
                        </div>
                    </div>
                    {/* Key Skills */}
                    <div className='subtitle left'>
                        <p className='subtitle-border'>Key Skills</p>
                    </div>
                    <div className='mb-3 space-y-4'>
                        <button className='gradient-btn group from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500'>
                            <span className='gradient-content'>PHP/Laravel</span>
                        </button>
                        <button className='gradient-btn group from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500'>
                            <span className='gradient-content'>Node.js/Express</span>
                        </button>
                        <button className='gradient-btn group from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600'>
                            <span className='gradient-content'>VueJS/Vuex</span>
                        </button>
                        <button className='gradient-btn group from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500'>
                            <span className='gradient-content'>React/Redux</span>
                        </button>
                    </div>
                    {/* Training */}
                    <div className='subtitle left'>
                        <span className='subtitle-border'>Training</span>
                    </div>
                    <div className='space-y-2 text-sm'>
                        <div>
                            <p className='font-bold'>PHP/Laravel (2019)</p>
                            <p className='italic'>Creative It Institute, Dhaka.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Redux (2023)</p>
                            <p className='italic'>Learn with Sumit.</p>
                        </div>
                    </div>
                </div>
                <div className='right-box'>
                    <p className='subtitle'>Summary</p>

                    <p className='mb-6 text-sm'>
                        Over three years of experience building web applications, updating existing web applications,
                        and fixing bugs. I like to learn and use new technology in web development. I have worked
                        extensively on various stages of application development by creating & implementing application
                        architecture, which includes various stages in development, code signing, and releasing to
                        Market and collaborative environments for the web platform.
                    </p>

                    {/* Experience section */}
                    <p className='subtitle'>Professional Experience</p>
                    <div className='mb-6'>
                        {/* last job Experience */}
                        <div className='grid grid-cols-5 gap-16'>
                            <div className='section-box col-span-2'>
                                <p className='text-sm font-bold'>Jun 2021 - Present</p>
                            </div>
                            <div className='col-span-3 flex flex-col justify-center text-xs'>
                                <a
                                    href='https://mononsoft.org'
                                    target='_blank'
                                    className='resume-link'
                                    rel='noreferrer'>
                                    https://mononsoft.org
                                </a>
                                <p>TMC Building (6th Floor), 52 New Eskaton Road, Dhaka 1000.</p>
                            </div>
                        </div>
                        <p className='mt-4'>
                            <span className='font-bold'>Software Engineer</span>
                            <span className='ml-2 text-sm'>at MononSoft Ltd. (A Sister Concern of JMI Group)</span>
                        </p>
                        <ul className='bullet-list'>
                            <li className='flex items-center'>
                                <div className='mr-4'>
                                    <div className='bullet'></div>
                                </div>
                                <p>Developing an ERP system based on Laravel, Vue.js and React.js.</p>
                            </li>
                            <li className='flex items-center'>
                                <div className='mr-4'>
                                    <div className='bullet'></div>
                                </div>
                                <p>Developing software solutions to meet customer needs.</p>
                            </li>
                            <li className='flex items-center'>
                                <div className='mr-4'>
                                    <div className='bullet'></div>
                                </div>
                                <p>Creating and implementing the source code of new applications.</p>
                            </li>
                            <li className='flex items-center'>
                                <div className='mr-4'>
                                    <div className='bullet'></div>
                                </div>
                                <p>Testing source code and debugging code.</p>
                            </li>
                            <li className='flex items-center'>
                                <div className='mr-4'>
                                    <div className='bullet'></div>
                                </div>
                                <p>Evaluating existing applications and performing updates and modifications.</p>
                            </li>
                            <li className='flex items-center'>
                                <div className='mr-4'>
                                    <div className='bullet'></div>
                                </div>
                                <p>
                                    Developing technical handbooks to represent the design and code of new applications.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className='mb-6'>
                        {/* last job Experience */}
                        <div className='grid grid-cols-5 gap-16'>
                            <div className='section-box col-span-2'>
                                <p className='text-sm font-bold'>May 2020 – Jun 2021</p>
                            </div>
                            <div className='col-span-3 flex flex-col justify-center text-xs'>
                                <a href='https://maxsop.com' target='_blank' className='resume-link' rel='noreferrer'>
                                    https://maxsop.com
                                </a>
                                <p>27/2 Ram Babu Road, Mymensingh – 2200</p>
                            </div>
                        </div>
                        <p className='mt-4'>
                            <span className='font-bold'>Junior Software Engineer </span>
                            <span className='ml-2 text-sm'>at MaxSOP </span>
                        </p>
                        <ul className='bullet-list'>
                            <li className='flex items-center'>
                                <div className='mr-4'>
                                    <div className='bullet'></div>
                                </div>
                                <p>Developing web applications based on PHP frameworks - Laravel, Vue JS.</p>
                            </li>
                            <li className='flex items-center'>
                                <div className='mr-4'>
                                    <div className='bullet'></div>
                                </div>
                                <p>Build efficient, testable & reusable codes. Modify existing code as needed.</p>
                            </li>
                            <li className='flex items-center'>
                                <div className='mr-4'>
                                    <div className='bullet'></div>
                                </div>
                                <p>Executed and monitored standards for user interfaces page design and development.</p>
                            </li>
                            <li className='flex items-center'>
                                <div className='mr-4'>
                                    <div className='bullet'></div>
                                </div>
                                <p>Perform other operational tasks based on {`"as and when required"`}.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Additional Skills */}
                    <p className='subtitle'>Additional Skills</p>

                    <ul className='bullet-list'>
                        <li className='flex items-center'>
                            <div className='mr-4'>
                                <div className='bullet'></div>
                            </div>
                            <p>Good Knowledge on Web Services likes REST/JSON/XML APIs.</p>
                        </li>
                        <li className='flex items-center'>
                            <div className='mr-4'>
                                <div className='bullet'></div>
                            </div>
                            <p>HTML, CSS, Bootstrap, Tailwind CSS, Livewire, Alpine.js and MySQL</p>
                        </li>
                        <li className='flex items-center'>
                            <div className='mr-4'>
                                <div className='bullet'></div>
                            </div>
                            <p>Proficient Understanding of Code Versioning Tools (Git) CI/CD and Github Action.</p>
                        </li>
                        <li className='flex items-center'>
                            <div className='mr-4'>
                                <div className='bullet'></div>
                            </div>
                            <p>Familiarity with DevOps processes and tools (Docker).</p>
                        </li>
                        <li className='flex items-center'>
                            <div className='mr-4'>
                                <div className='bullet'></div>
                            </div>
                            <p>Knowledge of JIRA, Elasticsearch, Linux or Other Unix-based systems.</p>
                        </li>
                        <li className='flex items-center'>
                            <div className='mr-4'>
                                <div className='bullet'></div>
                            </div>
                            <p>Ability to work individually and independently with minimal supervision.</p>
                        </li>
                        <li className='flex items-center'>
                            <div className='mr-4'>
                                <div className='bullet'></div>
                            </div>
                            <p>Self-managed, independent, initiative and proactive.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
