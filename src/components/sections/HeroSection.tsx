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

const HeroSection = () => {
    const [hasEntered, setHasEntered] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const timer = setTimeout(() => setHasEntered(true), 1100);
        return () => clearTimeout(timer);
    }, []);

    const translateX = useTransform(scrollY, [0, 450], [0, -200]);
    const translateY = useTransform(scrollY, [0, 450], [0, 680]);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "0px 0px -100px 0px" });

    return (
        <section id="hero" className="min-h-screen flex items-start relative overflow-hidden pt-18 md:pt-24" ref={sectionRef}>
            {/* Particle Background */}
            <div className="absolute inset-0 z-0">
                <ParticleField particleCount={60} connectionDistance={130} />
            </div>

            {/* Hex grid overlay */}
            <div className="absolute inset-0 hex-pattern opacity-30" />

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-float-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: '-4s' }} />

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.02]">
                <div className="w-full h-[2px] bg-primary/50 animate-scan-line" />
            </div>

            <div className="container mx-auto px-3 relative z-10">
                <Card className="w-full bg-card/30 backdrop-blur-md border-border/30 relative overflow-hidden min-h-[500px] lg:min-h-[600px] shadow-[0_0_80px_rgba(0,212,255,0.03)]">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="hsl(var(--primary))"
                    />

                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20 rounded-tl-lg" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-secondary/20 rounded-br-lg" />

                    <div className="grid lg:grid-cols-2 gap-8 h-full">
                        <motion.div
                            className="p-8 lg:p-12 flex flex-col justify-center relative z-10"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Status badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6 w-fit"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                <span className="text-xs font-mono text-primary/80 tracking-wider uppercase">System Active</span>
                            </motion.div>

                            {/* Main heading with glitch */}
                            <div className="mb-2">
                                <GlitchText
                                    as="h1"
                                    className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground font-display tracking-tight"
                                >
                                    AI CLUB
                                </GlitchText>
                            </div>

                            {/* Typewriter subheading */}
                            <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 min-h-[1.2em]">
                                <TypewriterText
                                    phrases={["Innovate.", "Build.", "Deploy.", "Learn.", "Create."]}
                                    className="text-gradient"
                                    typeSpeed={100}
                                    deleteSpeed={50}
                                    pauseDuration={1500}
                                />
                            </div>

                            <p className="text-base text-muted-foreground max-w-lg mb-8 leading-relaxed">
                                Join a community of passionate innovators, developers, and AI enthusiasts.
                                We explore cutting-edge technologies, build groundbreaking projects, and shape the future together.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-secondary text-primary-foreground font-semibold transition-all duration-500 animate-pulse-glow"
                                >
                                    <Sparkles className="mr-2 w-4 h-4" />
                                    Explore Events
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-border/50 hover:border-primary/50 hover:bg-primary/5 font-semibold transition-all duration-300"
                                >
                                    Learn More
                                </Button>
                            </div>

                            {/* Animated stats */}
                            <motion.div
                                className="flex gap-8 mt-12 pt-8 border-t border-border/30"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                {[
                                    { value: 200, suffix: "+", label: "Members" },
                                    { value: 50, suffix: "+", label: "Projects" },
                                    { value: 30, suffix: "+", label: "Events" },
                                ].map((stat, i) => (
                                    <div key={i} className="group">
                                        <div className="text-2xl md:text-3xl font-bold font-display text-gradient group-hover:neon-text transition-all duration-300">
                                            <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2000 + i * 300} />
                                        </div>
                                        <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Spline Robot */}
                        <motion.div
                            className="h-[350px] lg:h-full relative will-change-transform"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{
                                x: translateX,
                                y: translateY
                            }}
                        >
                            {isInView && (
                                <SplineScene
                                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                    className="w-full h-full"
                                />
                            )}
                        </motion.div>
                    </div>
                </Card>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.3em]">Scroll</span>
                <ChevronDown className="w-4 h-4 text-primary/40" />
            </motion.div>
        </section>
    );
};

export default HeroSection;
