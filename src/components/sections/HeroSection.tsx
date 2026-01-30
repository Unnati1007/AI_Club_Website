import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/spline-scene";
import { Spotlight } from "@/components/ui/spotlight";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Calculate diagonal movement: move left and up as user scrolls
    // Maximum movement at 600px scroll
    const maxScroll = 450;
    const progress = Math.min(scrollY / maxScroll, 1);
    const translateX = -progress * 200; // Move left (negative)
    const translateY = progress * 680; // Move down (positive for diagonal effect)

    return (
        <section className="min-h-screen flex items-start relative overflow-hidden pt-18 md:pt-24">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-3 relative z-10">
                <Card className="w-full bg-card/40 backdrop-blur-sm border-border/50 relative overflow-hidden min-h-[500px] lg:min-h-[600px]">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="hsl(var(--primary))"
                    />

                    <div className="grid lg:grid-cols-2 gap-8 h-full">
                        <motion.div
                            className="p-8 lg:p-12 flex flex-col justify-center relative z-10"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 w-fit"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-sm text-muted-foreground">Where Innovation Meets Intelligence</span>
                            </motion.div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                                <span className="text-foreground">AI Club</span>
                                <br />
                                <span className="text-gradient">Innovate. Build.</span>
                                <br />
                                <span className="text-foreground">Learn.</span>
                            </h1>

                            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                                Join a community of passionate innovators, developers, and AI enthusiasts.
                                We explore cutting-edge technologies, build groundbreaking projects, and shape the future together.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {/* <Button size="lg" className="group">
                                    Join the Club
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button> */}
                                <Button size="lg" variant="outline" className="border-border hover:border-primary/50 hover:bg-primary/5">
                                    Explore Events
                                </Button>
                            </div>

                            <motion.div
                                className="flex gap-8 mt-12 pt-8 border-t border-border/50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                {[
                                    { value: "200+", label: "Members" },
                                    { value: "50+", label: "Projects" },
                                    { value: "30+", label: "Events" },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="h-[350px] lg:h-full relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: translateX,
                                y: translateY
                            }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <SplineScene
                                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                className="w-full h-full"
                            />
                        </motion.div>
                    </div>
                </Card>
            </div>

            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
                    <motion.div
                        className="w-1.5 h-3 rounded-full bg-primary"
                        animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
