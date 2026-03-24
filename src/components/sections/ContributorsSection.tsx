import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, GitCommit, Code2 } from "lucide-react";

const ContributorsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const contributors = [
        {
            name: "Naitik Jain",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
            contributions: 47,
            projects: ["Course Hero", "Write"],
            github: "#",
            linkedin: "#",
        },
        {
            name: "Naitik Jain",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
            contributions: 32,
            projects: ["Course Hero", "Write"],
            github: "#",
            linkedin: "#",
        },
        {
            name: "Arman",
            avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
            contributions: 28,
            projects: ["Karthik"],
            github: "#",
            linkedin: "#",
        },
        {
            name: "Harshita",
            avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
            contributions: 56,
            projects: ["Developers"],
            github: "#",
            linkedin: "#",
        },
    ];

    return (
        <section id="contributors" className="py-24 relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 hex-pattern opacity-15" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/20 rounded-full"
                        initial={{ y: "100vh", x: Math.random() * 100 + "%" }}
                        animate={{ y: "-100vh" }}
                        transition={{
                            duration: 10 + Math.random() * 15,
                            repeat: Infinity,
                            delay: i * 0.7,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mb-6 relative"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                        <Code2 className="w-12 h-12 text-primary relative z-10 mx-auto" />
                    </motion.div>

                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display tracking-tight">
                        Our <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Developers</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        The brilliant minds who contribute to our projects and make AI Club thrive
                    </p>
                </motion.div>

                {/* Contributor Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contributors.map((contributor, i) => (
                        <motion.div
                            key={i}
                            className="group relative clay-card transition-all duration-500 overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                            whileHover={{
                                y: -12,
                                scale: 1.03,
                                boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.5)"
                            }}
                        >
                            {/* Animated gradient border that pulses on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ padding: "2px" }}
                            >
                                <div className="absolute inset-0 bg-card rounded-2xl" />
                            </motion.div>

                            {/* Top accent line that expands from center */}
                            <motion.div
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[3px] bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full z-10"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Hover glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                animate={{
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Floating particles on hover */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                            >
                                {[...Array(3)].map((_, j) => (
                                    <motion.div
                                        key={j}
                                        className="absolute w-1 h-1 bg-primary rounded-full"
                                        initial={{
                                            x: Math.random() * 100 + "%",
                                            y: Math.random() * 100 + "%",
                                            scale: 0
                                        }}
                                        animate={{
                                            y: [null, "-20px"],
                                            scale: [0, 1, 0],
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: j * 0.3,
                                            ease: "easeOut"
                                        }}
                                    />
                                ))}
                            </motion.div>

                            <div className="p-6 flex flex-col items-center text-center relative z-20">
                                {/* Avatar with enhanced hover */}
                                <div className="relative mb-4">
                                    {/* Multiple glow rings */}
                                    <motion.div
                                        className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-xl"
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            rotate: [0, 180, 360],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                    <motion.div
                                        className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 opacity-0 group-hover:opacity-50 blur-md"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.5
                                        }}
                                    />
                                    <motion.img
                                        src={contributor.avatar}
                                        alt={contributor.name}
                                        className="relative w-20 h-20 rounded-full object-cover border-2 border-border/50 group-hover:border-primary/50 transition-all duration-500"
                                        whileHover={{
                                            scale: 1.15,
                                            rotate: 5,
                                            transition: { duration: 0.3 }
                                        }}
                                    />
                                    {/* Rank badge with bounce effect */}
                                    <motion.div
                                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        animate={{
                                            y: [0, -3, 0],
                                        }}
                                        transition={{
                                            y: {
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }
                                        }}
                                    >
                                        {i + 1}
                                    </motion.div>
                                </div>

                                {/* Name with hover effect */}
                                <motion.h3
                                    className="font-semibold text-base mb-1"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.span
                                        className="bg-gradient-to-r from-primary to-purple-500 bg-[length:0%_2px] bg-no-repeat bg-bottom group-hover:bg-[length:100%_2px] transition-all duration-500"
                                    >
                                        {contributor.name}
                                    </motion.span>
                                </motion.h3>

                                {/* Contributions with icon animation */}
                                <motion.div
                                    className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono mb-4"
                                    whileHover={{ scale: 1.05, color: "#3b82f6" }}
                                >
                                    <motion.div
                                        animate={{
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    >
                                        <GitCommit className="w-3 h-3 text-primary/60" />
                                    </motion.div>
                                    {contributor.contributions} contributions
                                </motion.div>

                                {/* Project tags with staggered animation */}
                                <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                                    {contributor.projects.map((project, j) => (
                                        <motion.span
                                            key={j}
                                            className="text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary border border-primary/20 font-medium"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ delay: 0.3 + j * 0.1 }}
                                            whileHover={{
                                                scale: 1.15,
                                                y: -3,
                                                backgroundColor: "rgba(59, 130, 246, 0.2)",
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            {project}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Social links with enhanced hover */}
                                <div className="flex gap-3">
                                    <motion.a
                                        href={contributor.github}
                                        className="w-9 h-9 clay-btn flex items-center justify-center relative overflow-hidden group/btn"
                                        whileHover={{
                                            scale: 1.15,
                                            y: -3,
                                            borderColor: "#3b82f6",
                                            backgroundColor: "rgba(59, 130, 246, 0.1)"
                                        }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover/btn:opacity-20"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        />
                                        <Github className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors relative z-10" />
                                    </motion.a>
                                    <motion.a
                                        href={contributor.linkedin}
                                        className="w-9 h-9 clay-btn flex items-center justify-center relative overflow-hidden group/btn"
                                        whileHover={{
                                            scale: 1.15,
                                            y: -3,
                                            borderColor: "#3b82f6",
                                            backgroundColor: "rgba(59, 130, 246, 0.1)"
                                        }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover/btn:opacity-20"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: 0.3
                                            }}
                                        />
                                        <Linkedin className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors relative z-10" />
                                    </motion.a>
                                </div>
                            </div>

                            {/* Bottom glow line that expands on hover */}
                            <motion.div
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full"
                                initial={{ width: 0 }}
                                whileHover={{ width: "80%" }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* CTA text */}
                <motion.p
                    className="text-center text-sm text-muted-foreground mt-12 font-mono"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 }}
                >
                    Contribute to our projects and see your profile here!
                </motion.p>

                {/* Decorative line */}
                <motion.div
                    className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto mt-6 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 96 } : {}}
                    transition={{ delay: 0.9, duration: 0.5 }}
                />
            </div>
        </section>
    );
};

export default ContributorsSection;