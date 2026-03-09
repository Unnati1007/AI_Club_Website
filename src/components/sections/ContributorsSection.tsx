import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, GitCommit } from "lucide-react";

const ContributorsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const contributors = [
        {
            name: "Rahul Sharma",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
            contributions: 47,
            projects: ["AI Chatbot", "ML Pipeline"],
            github: "#",
            linkedin: "#",
        },
        {
            name: "Priya Patel",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
            contributions: 32,
            projects: ["Computer Vision", "NLP Tools"],
            github: "#",
            linkedin: "#",
        },
        {
            name: "Arjun Mehta",
            avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
            contributions: 28,
            projects: ["Data Analytics", "Model Training"],
            github: "#",
            linkedin: "#",
        },
        {
            name: "Aditya Kumar",
            avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
            contributions: 56,
            projects: ["Full-stack", "Open Source"],
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

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-primary font-mono text-sm">// CONTRIBUTORS</span>
                        <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Our <span className="text-gradient neon-text">Open Source Heroes</span>
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
                            className="group relative rounded-2xl glass border-border/30 hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -6 }}
                        >
                            {/* Top accent */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="p-6 flex flex-col items-center text-center relative z-10">
                                {/* Avatar */}
                                <div className="relative mb-4">
                                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                                    <img
                                        src={contributor.avatar}
                                        alt={contributor.name}
                                        className="relative w-20 h-20 rounded-full object-cover border-2 border-border/50 group-hover:border-primary/50 transition-all duration-500 group-hover:scale-105"
                                    />
                                    {/* Rank */}
                                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-primary/20">
                                        {i + 1}
                                    </div>
                                </div>

                                {/* Name & contributions */}
                                <h3 className="font-semibold text-base group-hover:text-primary transition-colors duration-300 mb-1">
                                    {contributor.name}
                                </h3>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono mb-4">
                                    <GitCommit className="w-3 h-3 text-primary/60" />
                                    {contributor.contributions} contributions
                                </div>

                                {/* Project tags */}
                                <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                                    {contributor.projects.map((project, j) => (
                                        <span
                                            key={j}
                                            className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                                        >
                                            {project}
                                        </span>
                                    ))}
                                </div>

                                {/* Social links */}
                                <div className="flex gap-2">
                                    <a
                                        href={contributor.github}
                                        className="w-8 h-8 rounded-lg bg-muted/30 border border-border/30 flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                                    >
                                        <Github className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
                                    </a>
                                    <a
                                        href={contributor.linkedin}
                                        className="w-8 h-8 rounded-lg bg-muted/30 border border-border/30 flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                                    >
                                        <Linkedin className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA text */}
                <motion.p
                    className="text-center text-sm text-muted-foreground mt-10 font-mono"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 }}
                >
                    Contribute to our projects and see your profile here!
                </motion.p>
            </div>
        </section>
    );
};

export default ContributorsSection;
