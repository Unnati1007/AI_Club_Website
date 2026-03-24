import { useRef, useState, useEffect } from 'react';

interface GlitchTextProps {
    children: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'span';
    glitchOnHover?: boolean;
}

export function GlitchText({
    children,
    className = '',
    as: Component = 'h1',
    glitchOnHover = true,
}: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        // Random periodic glitch
        intervalRef.current = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);
        }, 5001 + Math.random() * 3000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <Component
            className={`relative inline-block ${className}`}
            onMouseEnter={glitchOnHover ? () => setIsGlitching(true) : undefined}
            onMouseLeave={glitchOnHover ? () => setIsGlitching(false) : undefined}
            style={{ position: 'relative' }}
        >
            {children}
            {/* Glitch layers */}
            <span
                aria-hidden
                className="absolute inset-0 text-primary"
                style={{
                    clipPath: isGlitching
                        ? 'inset(20% 0 30% 0)'
                        : 'inset(0 0 100% 0)',
                    transform: isGlitching ? 'translate(-2px, -1px)' : 'none',
                    opacity: isGlitching ? 0.8 : 0,
                    transition: 'none',
                }}
            >
                {children}
            </span>
            <span
                aria-hidden
                className="absolute inset-0 text-secondary"
                style={{
                    clipPath: isGlitching
                        ? 'inset(50% 0 10% 0)'
                        : 'inset(0 0 100% 0)',
                    transform: isGlitching ? 'translate(2px, 1px)' : 'none',
                    opacity: isGlitching ? 0.8 : 0,
                    transition: 'none',
                }}
            >
                {children}
            </span>
        </Component>
    );
}
