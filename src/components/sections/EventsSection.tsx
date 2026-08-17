import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Sparkles, Award, Users, TrendingUp, Globe, Zap, Brain, Gamepad2, MessageSquare, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useCMSData } from "@/hooks/useCMSData";

export interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    type: string;
    image?: string;
    iconName?: string;
    accent?: string;
}


const iconMap: Record<string, any> = {
    Sparkles,
    Award,
    Users,
    TrendingUp,
    Globe
};

const accentMap: Record<number, string> = {
    0: "from-cyan-400 to-blue-500",
    1: "from-violet-400 to-indigo-500",
    2: "from-blue-400 to-indigo-500",
    3: "from-cyan-500 to-indigo-500",
    4: "from-indigo-400 to-purple-500",
};

const EVENT_IMAGES = [
    "/Photos/Event1.jpeg",
    "/Photos/Event2.jpeg",
    "https://lh3.googleusercontent.com/d/13WshdImeWRKSf3uxmbSTGDOVvIWoAF-y",
    "/Photos/Event3.png",
    "https://lh3.googleusercontent.com/d/1JTJnTMjnf3no26Phye0Gv4pPv5OYZt_7",
    "/Photos/Event4.png",
    "/Photos/Event5.png",
    "/Photos/Event6.png",
    "https://lh3.googleusercontent.com/d/1EBrBxxlpdGOdk0jW3aki_TeUSFgSRt-9",
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


export default function EventsSection() {
    const ref = useRef(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { data: events, isLoading } = useCMSData<Event>('events');
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [showAll, setShowAll] = useState(false);
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 340; // width of card + gap
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const container = scrollContainerRef.current;
        if (!container) return;

        let animationFrameId: number;
        const scrollSpeed = 0.5; // adjust for speed
        let currentScroll = container.scrollLeft;

        const scrollStep = () => {
            if (container) {
                currentScroll += scrollSpeed;
                container.scrollLeft = currentScroll;

                // Wrap around at half width (since image array is duplicated)
                const halfWidth = container.scrollWidth / 2;
                if (currentScroll >= halfWidth) {
                    currentScroll = 0;
                    container.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        animationFrameId = requestAnimationFrame(scrollStep);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isHovered]);

    const toggleCard = (id: string) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const displayedEvents = showAll ? events : events.slice(0, 3);

    // Create array of particles
    const particles = Array.from({ length: 20 }, (_, i) => i);


    return (
        <section
            id="events"
            className="w-full py-12 sm:py-16 md:py-20 px-3 sm:px-6 font-sans relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
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
                {/* Header Section */}
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
                        Our <span className="text-primary">Events</span>
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                        Explore our upcoming and past activities
                    </p>
                </motion.div>

                {/* Enhanced Image Carousel with 3D effect and side scrollers */}
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative w-full py-6 sm:py-12 mb-12 sm:mb-24 group/carousel"
                >
                    {/* Gradient shadows */}
                    <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    {/* Left Button */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 text-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-lg md:opacity-0 md:group-hover/carousel:opacity-100 opacity-100"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Right Button */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 text-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-lg md:opacity-0 md:group-hover/carousel:opacity-100 opacity-100"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-none px-4 sm:px-12"
                    >
                        {[...EVENT_IMAGES, ...EVENT_IMAGES].map((src, index) => (
                            <motion.div
                                key={index}
                                className="h-32 sm:h-44 md:h-56 w-48 sm:w-64 md:w-80 flex-shrink-0 overflow-hidden clay-card group relative transform-gpu"
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
                    </div>
                </div>

                {/* Events Grid with enhanced cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {isLoading && (
                        <div className="col-span-full flex justify-center py-12">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                    {displayedEvents.map((event, index) => {
                        const eventKey = event._id || event.title || index.toString();
                        const isExpanded = expandedCards[eventKey];
                        const Icon = iconMap[event.iconName] || Sparkles;
                        const accent = event.accent || accentMap[index % 5];

                        return (
                            <motion.div
                                key={eventKey}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.25,
                                    delay: (index % 3) * 0.05
                                }}
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                                onHoverStart={() => setHoveredIndex(eventKey)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                className="group relative cursor-pointer clay-card overflow-hidden transition-all duration-500 h-full"
                            >
                                {/* Card content */}
                                <div className="relative flex flex-col gap-4 p-6 h-full">
                                    {/* Top accent with icon */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${accent} bg-opacity-10`}>
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
                                            className={`px-4 py-1.5 text-xs font-medium bg-gradient-to-r ${accent} text-white rounded-full shadow-lg font-sans`}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {event.type}
                                        </motion.span>
                                    </div>

                                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                        {event.title}
                                    </h3>

                                    <div className="relative">
                                        <p className="text-muted-foreground leading-relaxed font-light text-sm sm:text-base">
                                            {isExpanded ? event.description : `${event.description.slice(0, 100)}...`}
                                        </p>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCard(eventKey);
                                            }}
                                            className="text-xs text-primary mt-3 flex items-center gap-1 font-medium hover:text-primary/80 transition-all font-sans"
                                        >
                                            {isExpanded ? "Show less" : "Read more"}
                                            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                            </motion.div>

                        );
                    })}
                </div>

                {/* Enhanced View More Button */}
                <motion.div
                    className="mt-20 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    <Button
                        variant="secondary"
                        size="lg"
                        className="group px-8 py-6 text-lg font-medium font-sans"
                        onClick={() => setShowAll(!showAll)}
                    >
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

// Add this to your global CSS for the grid pattern and to hide the scrollbar
const style = document.createElement('style');
style.textContent = `
    .bg-grid-pattern {
        background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 50px 50px;
    }
    .scrollbar-none::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`;
document.head.appendChild(style);