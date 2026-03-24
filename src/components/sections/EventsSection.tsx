import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, ChevronDown, ChevronUp, Sparkles, Award, Users, TrendingUp, Globe, Zap, Brain, Gamepad2, MessageSquare, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const EVENT_IMAGES = [
    "/Photos/Event1.jpeg",
    "/Photos/Event2.jpeg",
    "/Photos/Event3.png",
    "/Photos/Event4.png",
    "/Photos/Event5.png",
    "/Photos/Event6.png",
];

const EVENTS = [
    {
        date: "FEB 2026",
        title: "Aarunya Stall 2026: Bot and Roll",
        description: "An AI-themed stall featuring 6 interactive games designed to make learning fun and engaging. Students participated in quick challenges, explored simple AI concepts, and won exciting prizes instantly, making it one of the most lively attractions of the fest.",
        tag: "Stall",
        accent: "from-cyan-400 to-blue-500",
        icon: Sparkles,
    },
    { 
        date: "FEB 2026",
        title: "AIQ Battle 2.0",
        description: "A 3-round competitive event inspired by a Shark Tank-style format, where participants presented ideas, solved AI-based challenges, and competed for top positions. The event combined creativity, innovation, and problem-solving with exciting rewards.",
        tag: "Competition",
        accent: "from-violet-400 to-indigo-500",
        icon: Award,
    },
    {
        date: "FEB 2026",
        title: "Orientation Session",
        description: "A welcoming session for new members where they got introduced to the club, interacted with the team, and participated in fun activities. It also included basic AI discussions to understand their interests and encourage participation.",
        tag: "Session",
        accent: "from-blue-400 to-indigo-500",
        icon: Users,
    },
    {
        date: "FEB 2026",
        title: "AIQ Battle",
        description: "A multi-round event focused on AI-related tasks and idea sharing. Participants collaborated, solved challenges, and explored different approaches to real-world problems in an interactive setting.",
        tag: "Competition",
        accent: "from-emerald-400 to-teal-500",
        icon: TrendingUp,
    },
    {
        date: "FEB 2026",
        title: "AI Exhibition – Aarunya 2025",
        description: "A competitive exhibition where students showcased their AI models and projects. It provided a platform to demonstrate practical skills, with the best project being awarded exciting prizes.",
        tag: "Exhibition",
        accent: "from-fuchsia-400 to-pink-500",
        icon: Globe,
    }
];

// Floating particles for background effect
const FloatingParticle = ({ delay }: { delay: number }) => (
    <motion.div
        className="absolute w-1 h-1 bg-primary/20 rounded-full"
        initial={{ y: "100vh", opacity: 0 }}
        animate={{
            y: "-100vh",
            opacity: [0, 1, 1, 0],
            x: [0, 20, -20, 0]
        }}
        transition={{
            duration: 15,
            delay,
            repeat: Infinity,
            ease: "linear"
        }}
    />
);

// Floating label component
const FloatingLabel = ({ text, icon: Icon, position, color, delay }: {
    text: string;
    icon: any;
    position: string;
    color: string;
    delay: number;
}) => {
    const getPositionStyles = () => {
        switch (position) {
            case 'top-left':
                return { top: '-40px', left: '-100px' };
            case 'top-right':
                return { top: '-50px', right: '-120px' };
            case 'middle-left':
                return { top: '20px', left: '-140px' };
            case 'middle-right':
                return { top: '10px', right: '-160px' };
            case 'bottom-left':
                return { top: '70px', left: '-110px' };
            case 'bottom-right':
                return { top: '60px', right: '-130px' };
            default:
                return {};
        }
    };

    return (
        <motion.div
            className={`absolute hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${color} text-white font-medium text-sm shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-sm border border-white/10`}
            style={getPositionStyles()}
            initial={{ opacity: 0, scale: 0, x: position.includes('left') ? -50 : 50 }}
            animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, -8, 0],
            }}
            transition={{
                opacity: { duration: 0.5, delay },
                scale: { duration: 0.5, delay },
                y: { duration: 3, delay, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, rotate: 3 }}
        >
            <Icon className="w-4 h-4" />
            <span className="font-display tracking-wide">{text}</span>
        </motion.div>
    );
};

export default function EventsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [showAll, setShowAll] = useState(false);
    const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const toggleCard = (index: number) => {
        setExpandedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const displayedEvents = showAll ? EVENTS : EVENTS.slice(0, 3);

    // Create array of particles
    const particles = Array.from({ length: 20 }, (_, i) => i);

    // Floating labels data - proper case formatting & purple/blue colors only
    const floatingLabels = [
        { text: "Activities", icon: Gamepad2, position: "top-left", color: "from-blue-600 to-indigo-600", delay: 0.2 },
        { text: "Sessions", icon: MessageSquare, position: "top-right", color: "from-indigo-500 to-purple-500", delay: 0.4 },
        { text: "Games", icon: Gamepad2, position: "middle-left", color: "from-violet-500 to-purple-600", delay: 0.6 },
        { text: "AI", icon: Brain, position: "middle-right", color: "from-purple-600 to-blue-500", delay: 0.8 },
        { text: "Tech", icon: Cpu, position: "bottom-left", color: "from-blue-500 to-cyan-500", delay: 1.0 },
    ];

    return (
        <section
            id="events"
            className="w-full py-32 px-6 font-sans relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
            ref={ref}
        >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((i) => (
                    <FloatingParticle key={i} delay={i * 0.5} />
                ))}
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section with floating labels */}
                <motion.div
                    className="flex flex-col items-center text-center mb-20 relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    {/* Floating labels container */}
                    <div className="relative inline-block">
                        {/* Main heading with zap icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mb-6 relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                            <Zap className="w-16 h-16 text-primary relative z-10 mx-auto" />
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-bold mb-6 font-display tracking-tight relative">
                            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent relative z-10 font-serif">
                                Events
                            </span>

                            {/* Floating labels - only visible on large screens */}
                            <div className="absolute inset-0 w-full h-full">
                                {floatingLabels.map((label, index) => (
                                    <FloatingLabel key={index} {...label} />
                                ))}
                            </div>
                        </h2>

                        {/* <motion.p
                            className="text-muted-foreground text-lg max-w-2xl relative z-10 font-light"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.4 }}
                        >
                            Join our group discussions, events and sessions to level up your AI skills.
                            <span className="block mt-2 text-sm text-primary/70 font-medium">✨ Exciting prizes distributed ✨</span>
                        </motion.p> */}
                    </div>
                </motion.div>

                {/* Enhanced Image Marquee with 3D effect */}
                <div className="relative w-full overflow-hidden py-12 mb-24">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

                    <motion.div
                        className="flex gap-8 whitespace-nowrap"
                        animate={{ x: [0, -((384 + 32) * EVENT_IMAGES.length)] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[...EVENT_IMAGES, ...EVENT_IMAGES, ...EVENT_IMAGES].map((src, index) => (
                            <motion.div
                                key={index}
                                className="h-72 w-96 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-card/30 group relative transform-gpu"
                                whileHover={{
                                    scale: 1.05,
                                    rotateY: 5,
                                    transition: { duration: 0.3 }
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <img
                                    src={src}
                                    alt="Event gallery"
                                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                                {/* Hover effect overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={false}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Events Grid with enhanced cards */}
                <motion.div layout className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {displayedEvents.map((event, index) => {
                            const actualIndex = EVENTS.findIndex(e => e.title === event.title);
                            const isExpanded = expandedCards[actualIndex];
                            const Icon = event.icon;

                            return (
                                <motion.div
                                    key={event.title}
                                    layout
                                    initial={{ opacity: 0, y: 50, rotateX: -15 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    exit={{ opacity: 0, y: -50, rotateX: 15 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    onHoverStart={() => setHoveredIndex(actualIndex)}
                                    onHoverEnd={() => setHoveredIndex(null)}
                                    className="group relative cursor-pointer rounded-3xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl p-[1px] overflow-hidden border border-border/50 hover:border-transparent transition-all duration-500"
                                >
                                    {/* Animated gradient border */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                                        animate={{
                                            x: hoveredIndex === actualIndex ? ["-100%", "100%"] : "-100%"
                                        }}
                                        transition={{ duration: 1.5, ease: "linear" }}
                                    />

                                    {/* Card content */}
                                    <div className="relative flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-background to-card p-8 h-full">
                                        {/* Top accent with icon */}
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-3 rounded-xl bg-gradient-to-br ${event.accent} bg-opacity-10`}>
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                                {event.date && (
                                                    <div className="flex items-center gap-2 text-sm font-medium tracking-wide text-primary font-sans">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{event.date}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <motion.span
                                                className={`px-4 py-1.5 text-xs font-medium bg-gradient-to-r ${event.accent} text-white rounded-full shadow-lg font-sans`}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {event.tag}
                                            </motion.span>
                                        </div>

                                        <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                                            {event.title}
                                        </h3>

                                        <div className="relative">
                                            <motion.p
                                                layout
                                                className={`text-muted-foreground leading-relaxed transition-all duration-500 font-light ${isExpanded ? '' : 'line-clamp-2'
                                                    }`}
                                            >
                                                {event.description}
                                            </motion.p>

                                            {!isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: hoveredIndex === actualIndex ? 1 : 0 }}
                                                    className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none"
                                                />
                                            )}

                                            <motion.button
                                                onClick={() => toggleCard(actualIndex)}
                                                className="text-xs text-primary mt-3 flex items-center gap-1 font-medium hover:gap-2 transition-all font-sans"
                                                whileHover={{ x: 5 }}
                                            >
                                                {isExpanded ? "Show less" : "Read more"}
                                                <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                            </motion.button>
                                        </div>

                                        {/* Interactive glow effect */}
                                        <motion.div
                                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{
                                                background: `radial-gradient(circle at ${hoveredIndex === actualIndex ? '50%' : '0%'} 50%, rgba(0,212,255,0.1), transparent 70%)`
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Enhanced View More Button */}
                <motion.div
                    className="mt-20 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    <Button
                        variant="outline"
                        size="lg"
                        className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 bg-background/50 backdrop-blur-sm px-8 py-6 text-lg font-medium rounded-full font-sans"
                        onClick={() => setShowAll(!showAll)}
                    >
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10"
                            animate={{
                                x: ["-100%", "100%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                        <span className="relative z-10 flex items-center">
                            {showAll ? "Show less events" : "Explore all events"}
                            {showAll ? (
                                <ChevronUp className="ml-2 w-5 h-5 transition-transform group-hover:-translate-y-1" />
                            ) : (
                                <ChevronDown className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" />
                            )}
                        </span>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

// Add this to your global CSS for the grid pattern
const style = document.createElement('style');
style.textContent = `
    .bg-grid-pattern {
        background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 50px 50px;
    }
`;
document.head.appendChild(style);