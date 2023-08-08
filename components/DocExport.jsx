'use client';

import { useState } from 'react';

export default function DocExport() {
    const [editable, setEditable] = useState(true);

    const contentEditable = () => {
        document.body.contentEditable = editable;
        setEditable(() => !editable);
    };
    return (
        <div className='export-btn'>
            <div className='inline-flex rounded-md shadow-sm'>
                <button onClick={contentEditable} className='edit-btn'>
                    {editable ? (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            aria-label='Edit'>
                            <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
                            <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            aria-label='Done'>
                            <polyline points='9 11 12 14 22 4' />
                            <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
                        </svg>
                    )}
                </button>
                <button onClick={() => window.print()} className='print-btn'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <polyline points='6 9 6 2 18 2 18 9'></polyline>
                        <path d='M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'></path>
                        <rect x='6' y='14' width='12' height='8'></rect>
                    </svg>
                </button>
                <a href='/KAMRUZZAMAN.pdf' download className='download-btn'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                        <polyline points='7 10 12 15 17 10'></polyline>
                        <line x1='12' y1='15' x2='12' y2='3'></line>
                    </svg>
                </a>
            </div>
        </div>
    );
}
