'use client';

import { useState } from 'react';

function ContextMenu({ children, className }: any) {
    const [dropdown, setDropdownContext] = useState(false);
    const [editable, setEditable] = useState('true');
    const [xYPosition, setXyPosition] = useState({ x: 0, y: 0 });

    const contentEditable = () => {
        document.body.contentEditable = editable;
        setEditable((prevState) => (prevState === 'true' ? 'false' : 'true'));
    };

    const handleContextMenu = (event: any) => {
        event.preventDefault();
        setDropdownContext(false);
        const currentPosition = {
            x: event.pageX,
            y: event.pageY
        };
        setXyPosition(currentPosition);
        setDropdownContext(true);
    };
    const hideContext = (event: any) => {
        if (!event.target.closest('.context-menu')) {
            setDropdownContext(false);
        }
    };

    return (
        <div onContextMenu={handleContextMenu} onClick={hideContext} className={className}>
            {children}
            {dropdown && (
                <div
                    style={{ top: xYPosition.y, left: xYPosition.x }}
                    className="context-menu fixed z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 print:hidden">
                    <ul className="py-2 text-sm text-gray-700">
                        <li>
                            <button
                                onClick={() => window.print()}
                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                    <rect x="6" y="14" width="12" height="8"></rect>
                                </svg>
                                <span>Print</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={contentEditable}
                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 ">
                                {editable === 'true' ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-label="Edit">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-label="Done">
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                    </svg>
                                )}
                                <span>Edit</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => document.querySelector('.resume-box')?.classList.toggle('with-photo')}
                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="18px"
                                    viewBox="0 0 24 24"
                                    width="18px"
                                    fill="#000000">
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                                </svg>
                                <span>Photo</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => document.querySelector('.cover-letter')?.classList.toggle('hidden')}
                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                    />
                                </svg>
                                <span>Cover Letter</span>
                            </button>
                        </li>
                        <li>
                            <a
                                href="/kamruzzaman.pdf"
                                download
                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                <span>Download</span>
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ContextMenu;
