import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Trophy, BookOpen } from "lucide-react";

const ActivitiesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const activities = [
        {
            title: "Group Discussions",
            description: "Weekly brainstorming sessions where ideas collide and innovation sparks. Share knowledge, debate concepts, and explore new frontiers in AI together.",
            image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=400&fit=crop",
            icon: Users,
            stats: { freq: "Weekly", count: "50+" },
            accent: "from-cyan-500/20 to-blue-500/20",
            borderAccent: "from-cyan-500 to-blue-500",
        },
        {
            title: "Hackathons",
            description: "Intense coding marathons that push boundaries. Build, break, and create amazing AI projects under pressure with your team.",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
            icon: Trophy,
            stats: { freq: "Monthly", count: "100+" },
            accent: "from-purple-500/20 to-pink-500/20",
            borderAccent: "from-purple-500 to-pink-500",
        },
        {
            title: "Workshops",
            description: "Hands-on learning experiences led by industry experts. From basics to advanced techniques, master the tools of the trade.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
            icon: BookOpen,
            stats: { freq: "Bi-weekly", count: "30+" },
            accent: "from-blue-500/20 to-indigo-500/20",
            borderAccent: "from-blue-500 to-indigo-500",
        },
    ];

    return (
        <section id="activities" className="py-24 relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 hex-pattern opacity-15" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-primary font-mono text-sm">// ACTIVITIES</span>
                        <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        What We <span className="text-gradient neon-text">Do</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Explore our diverse range of activities designed to foster learning and collaboration
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {activities.map((activity, i) => (
                        <motion.div
                            key={i}
                            className={`group grid md:grid-cols-2 gap-0 items-stretch rounded-2xl overflow-hidden border border-border/30 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,212,255,0.05)] bg-card/30 backdrop-blur-sm`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 * i, duration: 0.6 }}
                        >
                            {/* Image side */}
                            <div className={`relative overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Gradient overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent md:bg-none" />
                                <div className={`absolute inset-0 bg-gradient-to-${i % 2 === 1 ? 'l' : 'r'} from-transparent to-card/80 hidden md:block`} />

                                {/* Floating icon badge */}
                                <div className={`absolute top-4 ${i % 2 === 1 ? 'right-4' : 'left-4'} w-12 h-12 rounded-xl bg-gradient-to-br ${activity.borderAccent} flex items-center justify-center shadow-lg`}>
                                    <activity.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            {/* Content side */}
                            <div className={`p-8 md:p-10 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                                <div className={`w-12 h-1 bg-gradient-to-r ${activity.borderAccent} rounded-full mb-6`} />

                                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                                    {activity.title}
                                </h3>

                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {activity.description}
                                </p>

                                <div className="flex gap-6 pt-4 border-t border-border/30">
                                    <div className="group/stat">
                                        <div className="text-xl font-bold text-primary font-display">{activity.stats.freq}</div>
                                        <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Sessions</div>
                                    </div>
                                    <div className="group/stat">
                                        <div className="text-xl font-bold text-primary font-display">{activity.stats.count}</div>
                                        <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Participants</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ActivitiesSection;
