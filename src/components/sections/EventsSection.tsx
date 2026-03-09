import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, ArrowRight, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const EVENT_IMAGES = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
];

const EVENTS = [
    {
        date: "OCT 24",
        time: "5:00 PM",
        location: "MITS Campus",
        title: "Hackathon 2.0",
        description: "The biggest hackathon of the semester. 24 hours of coding, coffee, and innovation.",
        tag: "Hackathon",
        accent: "from-cyan-400 to-blue-500",
    },
    {
        date: "NOV 05",
        time: "2:00 PM",
        location: "Lab 102",
        title: "AI Workshop",
        description: "An introduction to Neural Networks using Python. Beginner friendly.",
        tag: "Workshop",
        accent: "from-purple-400 to-pink-500",
    },
    {
        date: "NOV 12",
        time: "6:00 PM",
        location: "Main Auditorium",
        title: "Tech Talk",
        description: "Guest speaker session on the future of decentralized web and smart contracts.",
        tag: "Seminar",
        accent: "from-blue-400 to-indigo-500",
    }
];

export default function EventsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const isPersistentInView = useInView(ref, { margin: "-100px" });

    return (
        <section id="events" className="w-full py-24 px-6 font-sans relative overflow-hidden" ref={ref}>
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
            <div className="absolute inset-0 hex-pattern opacity-15" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <motion.div
                    className="flex flex-col items-center text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-[1px] w-10 bg-white/20" />
                        <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">// Events_Log</span>
                        <span className="h-[1px] w-10 bg-white/20" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                        Events
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                        Join our workshops, hackathons, and study groups to level up your AI skills.
                    </p>
                </motion.div>

                {/* Infinite Image Marquee */}
                <div className="relative w-full overflow-hidden py-8 mb-20 mask-fade-x">
                    <motion.div
                        className="flex gap-6 whitespace-nowrap"
                        animate={isPersistentInView ? { x: [0, -((384 + 24) * EVENT_IMAGES.length)] } : { x: 0 }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    >
                        {[...EVENT_IMAGES, ...EVENT_IMAGES].map((src, index) => (
                            <div
                                key={index}
                                className="h-64 w-96 flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-card/50 group relative"
                            >
                                <img
                                    src={src}
                                    alt="Event Gallery"
                                    className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Upcoming Events Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {EVENTS.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group relative flex flex-col gap-5 rounded-2xl bg-card/40 backdrop-blur-sm p-8 border border-border/30 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(0,212,255,0.08)] overflow-hidden"
                        >
                            {/* Top accent line */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${event.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                            {/* Hover glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-primary/[0.03] to-transparent" />

                            <div className="flex justify-between items-start relative z-10">
                                <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-primary uppercase font-mono">
                                    <Calendar className="w-4 h-4" />
                                    <span>{event.date}</span>
                                </div>
                                <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${event.accent} text-white rounded-full`}>
                                    {event.tag}
                                </span>
                            </div>

                            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 relative z-10">
                                {event.title}
                            </h3>

                            <p className="text-muted-foreground leading-relaxed line-clamp-3 relative z-10">
                                {event.description}
                            </p>

                            <div className="flex items-center gap-4 text-muted-foreground text-sm mt-auto relative z-10">
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-primary" />
                                    <span>{event.time}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full mt-4 rounded-xl border border-border/50 bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group/btn relative z-10"
                                variant="outline"
                            >
                                <Zap className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                                Register Now
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Link */}
                <motion.div
                    className="mt-16 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <Button variant="ghost" className="text-muted-foreground hover:text-primary group text-lg font-medium">
                        View All Events
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
