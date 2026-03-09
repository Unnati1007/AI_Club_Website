import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Github } from "lucide-react";

const TeamSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const defaultImage = "https://via.placeholder.com/200x200/0D8ABC/FFFFFF?text=AI";

    const teamHierarchy = {
        president: {
            name: "Vanshika Varun",
            role: "President",
            image: "./Photos/Vanshika.jpg",
            linkedin: "#",
            github: "#",
        },
        vicepresidents: [
            { name: "Unnati Jadon", role: "Vice President", image: "./Photos/unnati.jpeg", linkedin: "#", github: "#" },
            { name: "Manya Suranglikar", role: "Vice President", image: "./Photos/Manya.JPG", linkedin: "#", github: "#" },
        ],
        operationsCoordinator: {
            name: "Anirudh Parmar",
            role: "Co-ordinator",
            image: "./Photos/Anirudh Parmar.jpg",
            linkedin: "#",
            github: "#",
        },
        leads: [
            { name: "Shashwat Verma", role: "Tech Head", image: "./Photos/Shashwat verma.JPG", linkedin: "#", github: "#" },
            { name: "Devansh Mishra", role: "PR & Marketing Head", image: "./Photos/devansh mishra.jpeg", linkedin: "#", github: "#" },
            { name: "Akash Rathore", role: "Treasurer", image: "./Photos/Akash Rathore.jpg", linkedin: "#", github: "#" },
            { name: "Kushagra Malviya", role: "Logistics Head", image: "./Photos/Kushagra Malviya.jpg", linkedin: "#", github: "#" },
            { name: "Chanpreet Singh Chitrath", role: "Digital Creators Head", image: "./Photos/Chanpreet.jpeg", linkedin: "#", github: "#" },
            { name: "Suyash Khare", role: "R&D Head", image: "./Photos/Suyash.jpg", linkedin: "#", github: "#" },
        ],
        coleads: [
            { name: "Aastha Pyasi", role: "Jr. Co-ordinator", image: "./Photos/aastha.jpg", linkedin: "#", github: "#" },
            { name: "Lisa Zhang", role: "Tech Co-Lead", image: defaultImage, linkedin: "#", github: "#" },
            { name: "Akriti Kushwaha", role: "Logistics Co-Lead", image: "./Photos/Akriti.jpeg", linkedin: "#", github: "#" },
            { name: "Amanda Martinez", role: "Community Co-Lead", image: defaultImage, linkedin: "#", github: "#" },
            { name: "Samarth Agrawal", role: "Jr. Co-ordinator", image: "./Photos/Samarth.png", linkedin: "#", github: "#" },
        ],
        coordinator: {
            name: "Dr. R S Jadon",
            role: "Faculty Coordinator",
            image: defaultImage,
            linkedin: "#",
            github: "#",
        },
    };

    interface TeamMemberType {
        name: string;
        role: string;
        image: string;
        linkedin: string;
        github: string;
    }

    const TeamMember = ({ member, delay, size = "medium" }: { member: TeamMemberType; delay: number; size?: "large" | "medium" | "small" }) => {
        const sizeClasses = {
            large: "w-36 h-36",
            medium: "w-28 h-28",
            small: "w-24 h-24",
        };
        const textSizeClasses = {
            large: "text-base",
            medium: "text-sm",
            small: "text-xs",
        };

        return (
            <motion.div
                className="group flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay }}
            >
                <div className={`relative mb-3 ${sizeClasses[size]}`}>
                    {/* Glow effect behind shape */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md" />

                    <div
                        className="relative w-full h-full overflow-hidden bg-card/20 border border-white/10 group-hover:border-white/30 transition-all duration-500 [clip-path:polygon(15%_0%,_100%_0%,_100%_85%,_85%_100%,_0%_100%,_0%_15%)]"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex items-end justify-center pb-4 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a href={member.linkedin} className="p-1.5 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors">
                                <Linkedin className="w-3.5 h-3.5 text-primary" />
                            </a>
                            <a href={member.github} className="p-1.5 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors">
                                <Github className="w-3.5 h-3.5 text-primary" />
                            </a>
                        </div>
                    </div>
                </div>

                <h3 className={`font-semibold text-center ${textSizeClasses[size]} group-hover:text-primary transition-colors duration-300`}>
                    {member.name}
                </h3>
                <p className="text-primary/70 text-[10px] font-mono text-center uppercase tracking-wider mt-0.5">{member.role}</p>
            </motion.div>
        );
    };

    return (
        <section id="team" className="py-24 relative overflow-hidden" ref={ref}>
            {/* Bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.03] to-transparent" />
            <div className="absolute inset-0 hex-pattern opacity-15" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-primary font-mono text-sm uppercase tracking-widest">// The Team</span>
                        <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold mb-4 font-display tracking-tight">
                        Meet Our <span className="text-primary">Leadership</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Dedicated leaders driving innovation and building our thriving community
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto space-y-10">
                    {/* President */}
                    <div className="flex justify-center">
                        <TeamMember member={teamHierarchy.president} delay={0.1} size="large" />
                    </div>

                    {/* Connector */}
                    <div className="flex justify-center">
                        <div className="w-[2px] h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
                    </div>

                    {/* Vice Presidents */}
                    <div className="flex flex-wrap justify-center gap-12">
                        {teamHierarchy.vicepresidents.map((vp, i) => (
                            <TeamMember key={i} member={vp} delay={0.2 + i * 0.1} size="large" />
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <div className="w-[2px] h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
                    </div>

                    {/* Coordinator */}
                    <div className="flex justify-center">
                        <TeamMember member={teamHierarchy.operationsCoordinator} delay={0.4} size="medium" />
                    </div>

                    <div className="flex justify-center">
                        <div className="w-[2px] h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
                    </div>

                    {/* Leads */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                        {teamHierarchy.leads.map((lead, i) => (
                            <TeamMember key={i} member={lead} delay={0.5 + i * 0.08} size="medium" />
                        ))}
                    </div>

                    {/* Decorative divider */}
                    <div className="flex items-center gap-4 max-w-md mx-auto">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/20" />
                        <div className="w-2 h-2 rounded-full bg-primary/30" />
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/20" />
                    </div>

                    {/* Co-Leads */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {teamHierarchy.coleads.map((colead, i) => (
                            <TeamMember key={i} member={colead} delay={0.3 + i * 0.08} size="small" />
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <div className="w-[2px] h-8 bg-gradient-to-b from-primary/20 to-transparent" />
                    </div>

                    {/* Faculty */}
                    <div className="flex justify-center">
                        <TeamMember member={teamHierarchy.coordinator} delay={0.8} size="medium" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
