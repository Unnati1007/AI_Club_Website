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

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "0px 0px -100px 0px" });

    return (
        <section id="hero" className="min-h-screen flex items-start relative overflow-hidden pt-18 md:pt-24" ref={sectionRef}>
            {/* Particle Background */}
            <div className="absolute inset-0 z-0">
                <ParticleField particleCount={60} connectionDistance={130} />
            </div>

            {/* Gradient orbs (subtle) */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-float-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] animate-float-slow" style={{ animationDelay: '-4s' }} />

            <div className="container mx-auto px-3 relative z-10">
                <Card className="w-full bg-card/10 backdrop-blur-xl border-white/10 hover:border-white/20 transition-colors relative overflow-hidden min-h-[500px] lg:min-h-[600px] shadow-2xl">
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
                                className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/20 bg-primary/5 backdrop-blur-md mb-6 w-fit rounded-full"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="w-2 h-2 bg-primary group-hover:animate-pulse rounded-full"></span>
                                <span className="text-xs font-mono text-primary tracking-widest uppercase">System Active</span>
                            </motion.div>

                            {/* Main heading */}
                            <div className="mb-2">
                                <GlitchText
                                    as="h1"
                                    className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-foreground font-display tracking-tight"
                                >
                                    AI CLUB
                                </GlitchText>
                            </div>

                            {/* Clean subheading */}
                            <div className="text-xl md:text-2xl font-semibold mb-4 text-foreground/90">
                                Innovate. Build. Deploy.
                            </div>

                            <p className="text-base text-muted-foreground max-w-lg mb-8 leading-relaxed">
                                Join a community of passionate innovators, developers, and AI enthusiasts.
                                We explore cutting-edge technologies, build groundbreaking projects, and shape the future together.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 rounded-xl"
                                    asChild
                                >
                                    <a href="#events">
                                        Explores Events
                                        <Sparkles className="ml-2 w-4 h-4" />
                                    </a>
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
                            className="hidden md:block h-[350px] lg:h-full relative will-change-transform"
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
