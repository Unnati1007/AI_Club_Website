import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

const TeamSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const teamHierarchy = {
        president: {
            name: "Vanshika Varun",
            role: "President",
            image: "./Photos/Vanshika.jpg",
        },
        vicepresidents: [
            { name: "Unnati Jadon", role: "Vice President", image: "./Photos/unnati.jpeg" },
            { name: "Manya Suranglikar", role: "Vice President", image: "./Photos/Manya.JPG" },
        ],
        operationsCoordinator: {
            name: "Anirudh Parmar",
            role: "Co-ordinator",
            image: "./Photos/Anirudh Parmar.jpg",
        },
        jrCoordinators: [
            { name: "Aastha Pyasi", role: "Jr. Co-ordinator", image: "./Photos/aastha.jpg" },
            { name: "Samarth Agrawal", role: "Jr. Co-ordinator", image: "./Photos/Samarth.png" },
        ],
        leads: [
            { name: "Shashwat Verma", role: "Technical Head", image: "./Photos/Shashwat verma.JPG" },
            { name: "Devansh Mishra", role: "PR & Marketing Head", image: "./Photos/devansh mishra.jpeg" },
            { name: "Akash Rathore", role: "Treasurer", image: "./Photos/Akash Rathore.jpg" },
            { name: "Kushagra Malviya", role: "Logistics Head", image: "./Photos/Kushagra Malviya.jpg" },
            { name: "Chanpreet Singh Chitrath", role: "Digital Creators Head", image: "./Photos/Chanpreet.jpeg" },
            { name: "Suyash Khare", role: "Research and Development Head", image: "./Photos/Suyash.jpg" },
        ],
        coleads: [
            { name: "Akriti Kushwaha", role: "Logistics Co-Lead", image: "./Photos/Akriti.jpeg" },
        ],
    };

    // Faculty Coordinator data
    const facultyCoordinator = {
        name: "Dr. Rakesh Singh Jadon",
        role: "Faculty Coordinator",
        subRole: "Dean, Students Administration",
        image: "./Photos/Faculty.png",
    };

    interface TeamMemberType {
        name: string;
        role: string;
        image: string;
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
                className="group flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay }}
                whileHover={{ y: -5 }}
            >
                <div className={`relative mb-3 ${sizeClasses[size]}`}>
                    {/* Subtle glow on hover */}
                    <div className="absolute -inset-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                    <div
                        className="relative w-full h-full overflow-hidden clay-card transition-all duration-500 rounded-2xl"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>

                <h3 className={`font-semibold text-center ${textSizeClasses[size]} group-hover:text-primary transition-colors duration-300`}>
                    {member.name}
                </h3>
                <p className="text-primary/70 text-[10px] font-mono text-center uppercase tracking-wider mt-0.5">
                    {member.role}
                </p>
            </motion.div>
        );
    };

    // Professional Faculty Card Component
    const FacultyCard = ({ name, role, subRole, image, delay }: { name: string; role: string; subRole: string; image: string; delay: number }) => (
        <motion.div
            className="group flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay }}
        >
            {/* Image Container - Separate from text */}
            <motion.div
                className="relative mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {/* Professional frame */}
                <div className="relative w-64 h-72">
                    {/* Elegant border frame */}
                    <div className="absolute inset-0 border-2 border-primary/30 rounded-lg" />

                    {/* Inner accent border */}
                    <div className="absolute inset-2 border border-primary/20 rounded-md" />

                    {/* Image area */}
                    <div className="absolute inset-4 overflow-hidden clay-card">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover object-center"
                            style={{ objectPosition: 'center 30%' }}
                        />

                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    </div>

                    {/* Corner accents - subtle */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40 group-hover:border-primary/60 transition-colors duration-300" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/40 group-hover:border-primary/60 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/40 group-hover:border-primary/60 transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40 group-hover:border-primary/60 transition-colors duration-300" />

                    {/* Hover effect - subtle glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />

                    {/* Icon on hover - professional placement */}
                    <motion.div
                        className="absolute -bottom-3 -right-3 p-2 bg-primary text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Award className="w-4 h-4" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Text Content - Separate section below image */}
            <motion.div
                className="text-center space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: delay + 0.1 }}
            >
                <motion.h3
                    className="text-2xl font-bold text-foreground"
                    whileHover={{ color: '#3b82f6' }}
                    transition={{ duration: 0.2 }}
                >
                    {name}
                </motion.h3>

                <div className="space-y-1">
                    <motion.p
                        className="text-primary font-semibold text-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        {role}
                    </motion.p>

                    <motion.p
                        className="text-muted-foreground text-base"
                        whileHover={{ color: '#fff' }}
                        transition={{ duration: 0.2 }}
                    >
                        {subRole}
                    </motion.p>
                </div>

                {/* Decorative line */}
                <motion.div
                    className="w-16 h-0.5 bg-gradient-to-r from-primary to-purple-500 mx-auto mt-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 64 } : {}}
                    transition={{ delay: delay + 0.3, duration: 0.5 }}
                />
            </motion.div>
        </motion.div>
    );

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
                        <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold mb-4 font-display tracking-tight">
                        Meet Our <span className="text-primary">Team</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Dedicated leaders driving innovation and building our thriving community
                    </p>
                </motion.div>

                {/* Faculty Coordinator Section - Centered */}
                <motion.div
                    className="max-w-4xl mx-auto mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="relative">
                        {/* Subtle background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl blur-3xl" />

                        <div className="relative flex justify-center py-8">
                            {/* Faculty Card with separate image and text */}
                            <FacultyCard
                                name={facultyCoordinator.name}
                                role={facultyCoordinator.role}
                                subRole={facultyCoordinator.subRole}
                                image={facultyCoordinator.image}
                                delay={0.2}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Rest of the team hierarchy */}
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

                    {/* Operations Coordinator */}
                    <div className="flex justify-center">
                        <TeamMember member={teamHierarchy.operationsCoordinator} delay={0.4} size="medium" />
                    </div>

                    <div className="flex justify-center">
                        <div className="w-[2px] h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
                    </div>

                    {/* Junior Coordinators */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {teamHierarchy.jrCoordinators.map((jr, i) => (
                            <TeamMember key={i} member={jr} delay={0.45 + i * 0.08} size="medium" />
                        ))}
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

                    {/* Co-Leads - Only Akriti remaining */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {teamHierarchy.coleads.map((colead, i) => (
                            <TeamMember key={i} member={colead} delay={0.3 + i * 0.08} size="small" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;