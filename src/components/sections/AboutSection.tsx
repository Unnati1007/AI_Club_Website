import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code2, Users, Lightbulb, Zap, Target } from "lucide-react";
import { SplineScene } from "@/components/ui/spline-scene";

const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const features = [
        {
            icon: Brain,
            title: "AI Research",
            description: "Explore cutting-edge AI technologies and machine learning concepts",
            color: "from-cyan-500 to-blue-500",
        },
        {
            icon: Code2,
            title: "Hands-on Projects",
            description: "Build real-world applications using the latest AI tools and frameworks",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: Users,
            title: "Community",
            description: "Connect with like-minded innovators and industry professionals",
            color: "from-blue-500 to-indigo-500",
        },
        {
            icon: Lightbulb,
            title: "Innovation",
            description: "Turn ideas into reality through hackathons and collaborative projects",
            color: "from-amber-500 to-orange-500",
        },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
            {/* Background elements */}
            <div className="absolute inset-0 hex-pattern opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {/* Decorative circuit lines */}
            <motion.div
                className="absolute top-1/2 left-0 w-full h-[1px] data-flow-line opacity-20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5 }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero area with Spline */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div className="h-[400px] lg:h-[500px] relative">
                        <motion.div
                            className="hidden lg:block relative h-full rounded-2xl overflow-hidden glass border-primary/10"
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl z-10" />
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-secondary/30 rounded-br-2xl z-10 pointer-events-none" />

                            {isInView && (
                                <SplineScene
                                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                    className="w-full h-full"
                                />
                            )}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Terminal-style label */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-primary font-mono text-sm uppercase tracking-widest">// About_Us</span>
                            <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                        </div>

                        <h2 className="text-lg md:text-2xl font-bold mb-6 leading-tight">
                            Empowering the Next Generation of{" "}
                            <span className="text-primary font-display">AI Innovators</span>
                        </h2>

                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                            AI Club is a vibrant community dedicated to exploring the frontiers of artificial intelligence.
                            We bring together students, developers, and enthusiasts who share a passion for building
                            intelligent systems that solve real-world problems.
                        </p>

                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                            Through workshops, hackathons, and collaborative projects, we provide hands-on experience
                            with machine learning, deep learning, natural language processing, and computer vision.
                            Our mission is to demystify AI and make it accessible to everyone.
                        </p>

                        {/* Mission points with animated reveal */}
                        <div className="space-y-4">
                            {[
                                { icon: Zap, text: "Foster innovation through collaborative learning" },
                                { icon: Target, text: "Bridge the gap between theory and practical application" },
                                { icon: Users, text: "Build a network of future AI leaders" },
                            ].map((point, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center gap-3 group"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                                        <point.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-foreground font-medium text-sm md:text-base">{point.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Feature cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            className="group relative p-6 rounded-2xl glass border-transparent hover:border-primary/20 transition-all duration-500 cursor-pointer overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Hover glow background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 rounded-2xl`} />

                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-500`}>
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Bottom accent line */}
                            <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
