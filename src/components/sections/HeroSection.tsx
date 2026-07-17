import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/spline-scene";
import { Spotlight } from "@/components/ui/spotlight";
import { Card } from "@/components/ui/card";
import { Sparkles, ChevronDown } from "lucide-react";
import { ParticleField } from "@/components/ui/ParticleField";
import { GlitchText } from "@/components/ui/GlitchText";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection = () => {
    const { content, isLoading } = useSiteContent();
    const [hasEntered, setHasEntered] = useState(false);

    const { scrollY } = useScroll();

    useEffect(() => {
        const timer = setTimeout(() => setHasEntered(true), 1100);
        return () => clearTimeout(timer);
    }, []);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "0px 0px -100px 0px" });

    return (
        <section id="hero" className="min-h-[80vh] flex items-start relative overflow-hidden pt-12 md:pt-16" ref={sectionRef}>
            {/* Particle Background */}
            <div className="absolute inset-0 z-0">
                <ParticleField particleCount={30} connectionDistance={90} interactive={false} />
            </div>

            {/* Gradient orbs (optimized without blur) */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full animate-float-slow opacity-30" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)' }} />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full animate-float-slow opacity-30" style={{ animationDelay: '-4s', background: 'radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, transparent 70%)' }} />

            <div className="container mx-auto px-3 relative z-10">
                <div className="w-full hero-shell border-none shadow-none transition-colors relative overflow-hidden min-h-[400px] lg:min-h-[500px]">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="hsl(var(--primary))"
                    />

                    <div className="absolute inset-0 pointer-events-none holographic-mask" />

                    {/* Removed corner accents */}

                    <div className="grid lg:grid-cols-[55%_45%] gap-8 h-full">
                        <motion.div
                            className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center relative z-10"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Status badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/20 bg-primary/10 mb-6 w-fit rounded-full"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-xs font-mono font-medium tracking-wider text-primary uppercase">
                                    INNOVATING THE FUTURE
                                </span>
                            </motion.div>

                            {/* Main heading */}
                            <div className="mb-1">
                                <GlitchText
                                    as="h1"
                                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black leading-tight text-foreground font-display tracking-tight"
                                >
                                    {content.hero_title || "AI CLUB"}
                                </GlitchText>
                            </div>

                            {/* Clean subheading */}
                            <div className="text-base sm:text-lg md:text-xl font-semibold mb-3 text-foreground/90">
                                {content.hero_subtitle || "Innovate. Build. Deploy."}
                            </div>

                            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
                                {content.hero_description || "Join a community of passionate innovators, developers, and AI enthusiasts. We explore cutting-edge technologies, brainstrom about current AI trends and shape the future together."}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden font-semibold transition-all duration-300"
                                    asChild
                                >
                                    <a href="#events">
                                        Explore Events
                                        <Sparkles className="ml-2 w-4 h-4" />
                                    </a>
                                </Button>

                            </div>

                            {/* Animated stats & Info cards */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-border/30"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                {/* Community Pulse Card */}
                                <div className="relative group overflow-hidden clay-card p-4 sm:p-5 flex-1 min-w-[150px] sm:min-w-[200px]">
                                    {/* Neon border glow effect */}
                                    <div className="absolute -inset-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div>
                                            <div className="text-[9px] font-bold tracking-[0.2em] text-[#00e5ff] uppercase mb-1.5">
                                                COMMUNITY PULSE
                                            </div>
                                            <div className="text-sm sm:text-base md:text-lg font-bold text-white mb-3 sm:mb-4">
                                                We are a Community of {content.hero_innovators_count || "50+"} Innovators
                                            </div>
                                        </div>

                                        {/* Simple SVG Trend Line */}
                                        <div className="w-full h-10 relative mt-auto">
                                            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                                                {/* Gradient Fill under line */}
                                                <defs>
                                                    <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.3" />
                                                        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>

                                                <path
                                                    d="M0 30 L15 25 L30 32 L45 20 L60 25 L75 10 L100 5 V40 L0 40 Z"
                                                    fill="url(#trendGradient)"
                                                    className="opacity-50"
                                                />
                                                <path
                                                    d="M0 30 L15 25 L30 32 L45 20 L60 25 L75 10 L100 5"
                                                    fill="none"
                                                    stroke="#00e5ff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Events Info Card */}
                                <div className="relative group overflow-hidden clay-card p-4 sm:p-5 flex-1 min-w-[150px] flex flex-col items-center justify-center text-center">
                                    {/* Neon border glow effect */}
                                    <div className="absolute -inset-px bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 mb-3 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-[#b026ff]" />
                                        </div>
                                        <div className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">
                                            Conducted Many Events<br />& Group Discussions
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Spline Robot */}
                    <motion.div
                        className="hidden md:block h-[350px] lg:h-full relative will-change-transform"
                        style={{ transform: 'translateZ(0)' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {isInView && (
                            <SplineScene
                                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                className="w-full h-full"
                            />
                        )}
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.3em]">Scroll</span>
                <ChevronDown className="w-4 h-4 text-primary/40" />
            </motion.div >
        </section >
    );
};

export default HeroSection;
