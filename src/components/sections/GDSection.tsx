import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageSquare, Calendar, ExternalLink, AlertCircle, ChevronDown, ChevronUp, Clock, Users, Sparkles } from "lucide-react";
import { useGDStore } from "@/hooks/useGDStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const GDSection = () => {
    const ref = useRef(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { gds, isLoading, error } = useGDStore();
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
    const [selectedGD, setSelectedGD] = useState<typeof manualGDs[0] | null>(null);

    // Manual GD data with proper images and descriptions
    const manualGDs = [
        {
            _id: "gd3",
            title: "AI in Legal Decision-Making",
            description: "From arguments in favor of efficiency and consistency to concerns around bias, ethics, and accountability, the discussion sparked diverse perspectives. Members explored how AI could revolutionize legal research and case prediction, while raising critical questions about transparency and judicial discretion. The debate highlighted the tension between technological progress and fundamental legal principles. Some advocated for AI as a tool to reduce backlog and assist judges, while others warned of algorithmic bias perpetuating systemic inequalities. The consensus emerged that AI should augment rather than replace human judgment, with proper safeguards and oversight mechanisms. The group agreed that balance is key - leveraging AI's capabilities while maintaining human-centric justice.",
            image: "/Photos/GD3-JAN26.jpeg",
            date: "2026-01-15",
            monthYear: "JAN 2026",
            topic: "AI in Legal Decision-Making",
        },
        {
            _id: "gd2",
            title: "AI's Loop: Is It Running the Internet?",
            description: "From the rise of low-quality AI-generated content to its profound impact on creativity and information trust, members shared thorough perspectives and debated real challenges shaping today's online world. The discussion examined how AI algorithms now curate our news feeds, recommend content, and even generate articles and art. Concerns about filter bubbles, misinformation, and the devaluation of human creativity were balanced against AI's ability to personalize experiences and democratize content creation. Members explored the paradox of AI both enabling and potentially undermining authentic human expression. The conversation concluded that while AI is indeed running significant portions of the internet, human oversight and ethical guidelines remain essential to maintain digital integrity and foster genuine innovation.",
            image: "/Photos/GD2-NOV.png",
            date: "2025-11-20",
            monthYear: "NOV 2025",
            topic: "AI's Loop: Is It Running the Internet?",
        },
        {
            _id: "gd1",
            title: "The Future of Jobs: Will AI Create More Jobs Than It Replaces?",
            description: "From exploring automation and new-age careers to debating the balance between human creativity and machine efficiency, the discussion was full of fresh insights and diverse viewpoints. Members analyzed historical technological shifts and their impact on employment, drawing parallels to the AI revolution. Optimists highlighted emerging roles in AI ethics, prompt engineering, and human-AI collaboration. Skeptics pointed to potential job displacement in creative fields and white-collar professions. The group explored how education systems must adapt to prepare future generations for an AI-augmented workforce. The consensus acknowledged that while AI will transform many roles, uniquely human skills like emotional intelligence, creative problem-solving, and ethical reasoning will become even more valuable.",
            image: "/Photos/GD1-SEP25.jpeg",
            date: "2025-09-10",
            monthYear: "SEP 2025",
            topic: "The Future of Jobs",
        }
    ];

    const toggleCard = (id: string) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <section id="gds" className="py-24 relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 hex-pattern opacity-15" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/20 rounded-full"
                        initial={{ y: "100vh", x: Math.random() * 100 + "%" }}
                        animate={{ y: "-100vh" }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-12"
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
                        <MessageSquare className="w-12 h-12 text-primary relative z-10 mx-auto" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display tracking-tight">
                        AI <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Round Table</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Weekly brainstorming sessions where ideas collide and innovation sparks
                    </p>
                </motion.div>
            </div>

            {/* Horizontal scrolling cards — full width */}
            <div className="relative">
                {/* Fade masks */}
                <div className="absolute top-0 bottom-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-hide cursor-grab active:cursor-grabbing"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {manualGDs.map((gd, i) => {
                        const isExpanded = expandedCards[gd._id];

                        return (
                            <motion.div
                                key={gd._id}
                                className="group flex-shrink-0 w-[340px] md:w-[380px] rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-border/30 hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer relative"
                                initial={{ opacity: 0, x: 40, y: 20 }}
                                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                onHoverStart={() => setHoveredIndex(gd._id)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                onClick={() => toggleCard(gd._id)}
                            >
                                {/* Animated gradient border */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-2xl"
                                    animate={{
                                        x: hoveredIndex === gd._id ? ["-100%", "100%"] : "-100%"
                                    }}
                                    transition={{ duration: 1.5, ease: "linear" }}
                                />

                                {/* Top accent line */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={gd.image}
                                        alt={gd.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            console.error(`Failed to load image: ${gd.image}`);
                                            e.currentTarget.src = "https://via.placeholder.com/400x200/1a1a2e/3b82f6?text=GD+Session";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

                                    {/* Shine effect on hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.8 }}
                                    />

                                    {/* Date badge - only element left */}
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 text-xs font-bold text-primary">
                                        <Calendar className="w-3 h-3" />
                                        {gd.monthYear}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                                        {gd.title}
                                    </h3>

                                    <div className="relative">
                                        <motion.p
                                            layout
                                            className={`text-sm text-muted-foreground leading-relaxed transition-all duration-500 ${isExpanded ? '' : 'line-clamp-3'
                                                }`}
                                        >
                                            {gd.description}
                                        </motion.p>

                                        {!isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: hoveredIndex === gd._id ? 1 : 0 }}
                                                className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card/90 to-transparent pointer-events-none"
                                            />
                                        )}

                                        <motion.button
                                            onClick={(e) => { e.stopPropagation(); toggleCard(gd._id); }}
                                            className="text-xs text-primary mt-2 flex items-center gap-1 font-medium hover:gap-2 transition-all"
                                            whileHover={{ x: 5 }}
                                        >
                                            {isExpanded ? "Read less" : "Read more"}
                                            {isExpanded ? (
                                                <ChevronUp className="w-3 h-3" />
                                            ) : (
                                                <ChevronDown className="w-3 h-3" />
                                            )}
                                        </motion.button>
                                    </div>
                                </div>

                                {/* View details button */}
                                <motion.button
                                    onClick={(e) => { e.stopPropagation(); setSelectedGD(gd); }}
                                    className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-colors duration-300"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                >
                                    <ExternalLink className="w-4 h-4 text-primary" />
                                </motion.button>

                                {/* Glow effect on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at ${hoveredIndex === gd._id ? '50%' : '0%'} 50%, rgba(59,130,246,0.1), transparent 70%)`
                                    }}
                                />
                            </motion.div>
                        );
                    })}

                    {/* Loading state */}
                    {isLoading && (
                        <div className="flex-shrink-0 w-full flex items-center justify-center py-16">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                <p className="font-mono text-xs text-muted-foreground animate-pulse flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" />
                                    Loading discussions...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Error state */}
                    {error && !isLoading && (
                        <div className="flex-shrink-0 w-full flex items-center justify-center py-16 px-6">
                            <div className="text-center max-w-md p-6 glass border-destructive/20 rounded-2xl">
                                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                                <h3 className="font-bold text-foreground mb-2">Connection Error</h3>
                                <p className="text-sm text-muted-foreground mb-4 font-mono">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-primary text-sm font-bold hover:underline flex items-center gap-2 mx-auto"
                                >
                                    <span>Retry</span>
                                    <ExternalLink className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll hint with animation */}
            <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
            >
                <motion.div
                    className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.3em]"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span>←</span>
                    <span>Scroll to explore</span>
                    <span>→</span>
                </motion.div>
            </motion.div>

            {/* GD Details Dialog */}
            <Dialog open={!!selectedGD} onOpenChange={(open) => !open && setSelectedGD(null)}>
                <DialogContent className="sm:max-w-2xl glass border-primary/20 backdrop-blur-2xl">
                    <DialogHeader>
                        <div className="flex items-center gap-2 text-primary text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{selectedGD?.monthYear}</span>
                        </div>
                        <DialogTitle className="text-3xl font-display bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            {selectedGD?.title}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedGD?.image && (
                        <div className="w-full h-56 rounded-xl overflow-hidden mt-2 relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-10" />
                            <img
                                src={selectedGD.image}
                                alt={selectedGD.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    )}

                    <div className="mt-4 space-y-4">
                        <div className="bg-gradient-to-br from-primary/5 to-transparent p-5 rounded-xl border border-primary/10">
                            <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Discussion Highlights
                            </h4>
                            <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                                {selectedGD?.description}
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default GDSection;