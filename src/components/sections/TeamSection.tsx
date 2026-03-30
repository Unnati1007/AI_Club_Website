import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

import { useCMSData } from "@/hooks/useCMSData";

export interface TeamMember {
    _id: string;
    name: string;
    role: string;
    hierarchyLevel: string;
    image: string;
    subRole?: string;
}

const TeamSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { data: teamMembers, isLoading } = useCMSData<TeamMember>('team-members');

    // Organize hierarchy from dynamic data
    const facultyCoordinator = teamMembers.find(m => m.hierarchyLevel === 'faculty');
    const president = teamMembers.find(m => m.hierarchyLevel === 'president');
    const vicepresidents = teamMembers.filter(m => m.hierarchyLevel === 'vicepresident');
    const operationsCoordinator = teamMembers.find(m => m.hierarchyLevel === 'operations');
    const jrCoordinators = teamMembers.filter(m => m.hierarchyLevel === 'junior');
    const leads = teamMembers.filter(m => m.hierarchyLevel === 'lead');
    const coleads = teamMembers.filter(m => m.hierarchyLevel === 'coleads' || m.hierarchyLevel === 'colead');
    const TeamMemberCard = ({ member, delay, size = "medium" }: { member: TeamMember; delay: number; size?: "large" | "medium" | "small" }) => {
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
                {isLoading && (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {facultyCoordinator && (
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
                                    subRole={facultyCoordinator.subRole || ""}
                                    image={facultyCoordinator.image}
                                    delay={0.2}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Rest of the team hierarchy */}
                {!isLoading && (
                    <div className="max-w-6xl mx-auto space-y-10">
                        {/* President */}
                        {president && (
                            <div className="flex justify-center">
                                <TeamMemberCard member={president} delay={0.1} size="large" />
                            </div>
                        )}

                        {/* Connector */}
                        {president && (vicepresidents.length > 0) && (
                            <div className="flex justify-center">
                                <div className="w-[2px] h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
                            </div>
                        )}

                        {/* Vice Presidents */}
                        {vicepresidents.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-12">
                                {vicepresidents.map((vp, i) => (
                                    <TeamMemberCard key={vp._id} member={vp} delay={0.2 + i * 0.1} size="large" />
                                ))}
                            </div>
                        )}

                        {(vicepresidents.length > 0 && operationsCoordinator) && (
                            <div className="flex justify-center">
                                <div className="w-[2px] h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
                            </div>
                        )}

                        {/* Operations Coordinator */}
                        {operationsCoordinator && (
                            <div className="flex justify-center">
                                <TeamMemberCard member={operationsCoordinator} delay={0.4} size="medium" />
                            </div>
                        )}

                        {(operationsCoordinator && jrCoordinators.length > 0) && (
                            <div className="flex justify-center">
                                <div className="w-[2px] h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
                            </div>
                        )}

                        {/* Junior Coordinators */}
                        {jrCoordinators.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-8">
                                {jrCoordinators.map((jr, i) => (
                                    <TeamMemberCard key={jr._id} member={jr} delay={0.45 + i * 0.08} size="medium" />
                                ))}
                            </div>
                        )}

                        {(jrCoordinators.length > 0 && leads.length > 0) && (
                            <div className="flex justify-center">
                                <div className="w-[2px] h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
                            </div>
                        )}

                        {/* Leads */}
                        {leads.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                                {leads.map((lead, i) => (
                                    <TeamMemberCard key={lead._id} member={lead} delay={0.5 + i * 0.08} size="medium" />
                                ))}
                            </div>
                        )}

                        {/* Decorative divider */}
                        {(leads.length > 0 || coleads.length > 0) && (
                            <div className="flex items-center gap-4 max-w-md mx-auto">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/20" />
                                <div className="w-2 h-2 rounded-full bg-primary/30" />
                                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/20" />
                            </div>
                        )}

                        {/* Co-Leads */}
                        {coleads.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-8">
                                {coleads.map((colead, i) => (
                                    <TeamMemberCard key={colead._id} member={colead} delay={0.3 + i * 0.08} size="small" />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TeamSection;