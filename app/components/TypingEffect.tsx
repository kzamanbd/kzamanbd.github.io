'use client';

import { useState, useEffect } from 'react';

const TYPING_SPEED = 100;
const DELETING_SPEED = 30;

type TypingEffectProps = {
    dataText: string[];
};

const TypingEffect = ({ dataText }: TypingEffectProps) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(TYPING_SPEED);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % dataText.length;
            const fullText = dataText[i];

            setText((prevText) => {
                return isDeleting
                    ? fullText.substring(0, prevText.length - 1)
                    : fullText.substring(0, prevText.length + 1);
            });

            setTypingSpeed(isDeleting ? DELETING_SPEED : TYPING_SPEED);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 500);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum((prevLoopNum) => prevLoopNum + 1);
            }
        };

        const typingInterval = setTimeout(handleType, typingSpeed);

        return () => clearTimeout(typingInterval);
    }, [text, isDeleting, loopNum, typingSpeed, dataText]);

    return (
        <>
            <span>{text}</span>
            <span className="cursor-pointer-effect"></span>
        </>
    );
};

export default TypingEffect;
