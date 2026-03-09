import { useState, useEffect, useCallback } from 'react';

interface TypewriterTextProps {
    phrases: string[];
    className?: string;
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseDuration?: number;
}

export function TypewriterText({
    phrases,
    className = '',
    typeSpeed = 80,
    deleteSpeed = 40,
    pauseDuration = 2000,
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const tick = useCallback(() => {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            // Typing
            if (displayText.length < currentPhrase.length) {
                return typeSpeed + Math.random() * 40;
            } else {
                // Pause before deleting
                setIsDeleting(true);
                return pauseDuration;
            }
        } else {
            // Deleting
            if (displayText.length > 0) {
                return deleteSpeed;
            } else {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
                return typeSpeed;
            }
        }
    }, [displayText, phraseIndex, isDeleting, phrases, typeSpeed, deleteSpeed, pauseDuration]);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentPhrase.length) {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                } else {
                    setIsDeleting(true);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, tick());

        return () => clearTimeout(timeout);
    }, [displayText, phraseIndex, isDeleting, phrases, tick]);

    return (
        <span className={className}>
            {displayText}
            <span
                className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
                style={{
                    animation: 'pulse 1s step-end infinite',
                }}
            />
        </span>
    );
}
