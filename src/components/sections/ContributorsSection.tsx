import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, GitCommit, Code2 } from "lucide-react";

import { useCMSData } from "@/hooks/useCMSData";

export interface Contributor {
    _id: string;
    name: string;
    avatar: string;
    contributions: number;
    projects: string[];
    github: string;
    linkedin: string;
}

const ContributorsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { data: contributors, isLoading } = useCMSData<Contributor>('contributors');

    // Sort to place Naitik Jain (Naitikk-J) at the very beginning (leftmost)
    const sortedContributors = [...contributors].sort((a, b) => {
        if (a.github?.toLowerCase() === "https://github.com/naitikk-j") return -1;
        if (b.github?.toLowerCase() === "https://github.com/naitikk-j") return 1;
        return 0;
    });

    return (
        <section id="contributors" className="py-16 relative overflow-hidden" ref={ref}>
            <div className="absolute inset-0 hex-pattern opacity-15" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-3 sm:px-6 relative z-10">
                
                {/* Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 font-display tracking-tight">
                        Our <span className="text-primary">Contributors</span>
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                        The brilliant minds who contribute to our projects
                    </p>
                </motion.div>

                {/* Project Lead */}
                <div className="flex justify-center mb-12 sm:mb-16">
                    <motion.div
                        className="group relative clay-card p-6 sm:p-8 text-center flex flex-col items-center max-w-sm w-full border border-primary/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-gradient-to-b from-card/85 via-card/75 to-card/65"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(6,182,212,0.25)" }}
                    >
                        {/* Glowing ring under avatar */}
                        <div className="absolute top-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/20 blur-xl opacity-75 group-hover:scale-110 transition-transform duration-500" />
                        
                        {/* Avatar */}
                        <img
                            src="./Photos/unnati.jpeg"
                            alt="Unnati Jadon"
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-3 object-cover shadow-2xl border-[3px] border-primary relative z-10"
                        />

                        {/* Name */}
                        <h3 className="font-semibold text-base mb-1 relative z-10">
                            Unnati Jadon
                        </h3>

                        {/* Projects */}
                        <div className="flex flex-wrap justify-center gap-2 mb-4 relative z-10">
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                                Project Lead
                            </span>
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                                Lead Developer
                            </span>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-4 relative z-10">
                            <a href="https://github.com/Unnati1007" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/unnati-jadon-610414232" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
                    {sortedContributors.map((contributor, i) => (
                        <motion.div
                            key={i}
                            className="group clay-card p-4 sm:p-5 text-center flex flex-col items-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {/* Avatar */}
                            <img
                                src={contributor.avatar}
                                alt={contributor.name}
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-3 object-cover shadow-lg border-2 border-primary/20"
                            />

                            {/* Name */}
                            <h3 className="font-semibold text-base mb-1">
                                {contributor.name}
                            </h3>

                            {/* Projects */}
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                {contributor.projects.map((project, j) => (
                                    <span
                                        key={j}
                                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                                    >
                                        {project}
                                    </span>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="flex justify-center gap-4">
                                <a href={contributor.github}>
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href={contributor.linkedin}>
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContributorsSection;