import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageSquare, Calendar, ExternalLink, AlertCircle, ChevronDown, ChevronUp, Clock, Users, Sparkles } from "lucide-react";
import { useGDStore, GDItem } from "@/hooks/useGDStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const GDSection = () => {
    const ref = useRef(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { gds, isLoading, error } = useGDStore();
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
    const [selectedGD, setSelectedGD] = useState<GDItem | null>(null);


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

            <div className="container mx-auto px-3 sm:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
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

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display tracking-tight">
                        AI <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">ROUND TABLE</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
                        Monthly brainstorming sessions where ideas collide and innovation sparks
                    </p>
                </motion.div>
            </div>

            {/* Horizontal scrolling cards — full width */}
            <div className="relative">
                {/* Fade masks */}
                <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 sm:gap-6 overflow-x-auto px-3 sm:px-6 md:px-12 pb-8 scrollbar-hide cursor-grab active:cursor-grabbing"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {gds.map((gd, i) => {
                        const isExpanded = expandedCards[gd._id];
                        // Extract month and year from string date if possible
                        const dateObj = new Date(gd.date);
                        const monthYear = !isNaN(dateObj.getTime())
                            ? dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
                            : gd.date;

                        return (
                            <motion.div
                                key={gd._id}
                                className="group flex-shrink-0 w-[85vw] sm:w-[320px] md:w-[360px] clay-card transition-all duration-500 overflow-hidden cursor-pointer relative"
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

                                    {/* Date badge */}
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 text-xs font-bold text-primary">
                                        <Calendar className="w-3 h-3" />
                                        {monthYear}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5">
                                    <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                                        {gd.title}
                                    </h3>

                                    <div className="relative">
                                        <motion.p
                                            layout
                                            className={`text-xs sm:text-sm text-muted-foreground leading-relaxed transition-all duration-500 ${isExpanded ? '' : 'line-clamp-3'
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
                                    className="absolute bottom-5 right-5 w-8 h-8 clay-btn rounded-full flex items-center justify-center transition-colors duration-300"
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
                            <div className="text-center max-w-md p-6 clay-card border-destructive/20">
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
                <DialogContent className="sm:max-w-2xl clay-panel border-primary/20">
                    <DialogHeader>
                        <div className="flex items-center gap-2 text-primary text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{selectedGD ? new Date(selectedGD.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : ''}</span>
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