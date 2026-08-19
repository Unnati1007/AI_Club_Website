import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageSquare, Calendar, ExternalLink, AlertCircle, ChevronDown, ChevronUp, Clock, Users, Sparkles, Link2, FileText, Clipboard } from "lucide-react";
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
        <section id="gds" className="py-8 sm:py-12 relative overflow-hidden" ref={ref}>
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
                    className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 font-display tracking-tight">
                        AI RoundTable <span className="text-primary">- Group  Discussion</span>
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                        Monthly brainstorming sessions where ideas collide and innovation sparks
                    </p>
                </motion.div>
            </div>

            {/* Grid Layout */}
            <div className="container mx-auto px-3 sm:px-6 relative z-10">
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8"
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
                                className="group flex flex-col h-full clay-card transition-all duration-500 overflow-hidden cursor-pointer relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                                whileHover={{ y: -5 }}
                                onHoverStart={() => setHoveredIndex(gd._id)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                onClick={() => setSelectedGD(gd)}
                            >


                                {/* Image */}
                                <div className="relative h-40 overflow-hidden">
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



                                    {/* Date badge */}
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 text-xs font-bold text-primary">
                                        <Calendar className="w-3 h-3" />
                                        {monthYear}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5">
                                    <h3 className="text-sm sm:text-base font-bold mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                                        {gd.title}
                                    </h3>

                                    <div className="relative">
                                        <motion.p
                                            layout
                                            className="text-xs sm:text-sm text-muted-foreground leading-relaxed transition-all duration-500 line-clamp-3"
                                        >
                                            {gd.description}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredIndex === gd._id ? 1 : 0 }}
                                            className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card/90 to-transparent pointer-events-none"
                                        />

                                        <motion.button
                                            onClick={(e) => { e.stopPropagation(); setSelectedGD(gd); }}
                                            className="text-xs text-primary mt-2 flex items-center gap-1 font-medium hover:gap-2 transition-all"
                                            whileHover={{ x: 5 }}
                                        >
                                            Read more
                                            <ExternalLink className="w-3 h-3" />
                                        </motion.button>
                                    </div>
                                </div>

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



            {/* GD Details Dialog */}
            <Dialog open={!!selectedGD} onOpenChange={(open) => !open && setSelectedGD(null)}>
                <DialogContent className="sm:max-w-4xl lg:max-w-5xl clay-panel border-primary/20">
                    <DialogHeader>
                        <div className="flex items-center gap-2 text-primary text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{selectedGD ? new Date(selectedGD.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : ''}</span>
                        </div>
                        <DialogTitle className="text-3xl font-display bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            {selectedGD?.title}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                        {selectedGD?.image && (
                            <div className="w-full h-48 sm:h-56 lg:h-full min-h-[200px] lg:min-h-[300px] rounded-xl overflow-hidden relative group bg-black/20 flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
                                <img
                                    src={selectedGD.image}
                                    alt={selectedGD.title}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-2"
                                />
                            </div>
                        )}

                        <div className="bg-gradient-to-br from-primary/5 to-transparent p-5 sm:p-6 rounded-xl border border-primary/10 h-full overflow-y-auto">
                            <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Discussion Highlights
                            </h4>
                            <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-sm sm:text-base mb-6">
                                {selectedGD?.description}
                            </p>

                            {/* GD Final Report, Resources, Reports */}
                            {(selectedGD?.finalReport || (selectedGD?.resources && selectedGD.resources.length > 0) || (selectedGD?.reports && selectedGD.reports.length > 0)) && (
                                <div className="mt-6 pt-6 border-t border-primary/15 space-y-5">
                                    {selectedGD.finalReport && (
                                        <div>
                                            <h5 className="text-xs font-mono text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                <FileText className="w-3.5 h-3.5" />
                                                GD Final Report
                                            </h5>
                                            <a
                                                href={selectedGD.finalReport}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs sm:text-sm font-medium text-foreground hover:bg-primary/20 transition-all w-full sm:w-auto"
                                            >
                                                <span>View Final GD Report</span>
                                                <ExternalLink className="w-3.5 h-3.5 text-primary" />
                                            </a>
                                        </div>
                                    )}

                                    {selectedGD.resources && selectedGD.resources.length > 0 && (
                                        <div>
                                            <h5 className="text-xs font-mono text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                <Link2 className="w-3.5 h-3.5" />
                                                Resources
                                            </h5>
                                            <div className="flex flex-col gap-2">
                                                {selectedGD.resources.map((url, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-secondary/5 border border-secondary/15 text-xs sm:text-sm font-medium text-foreground hover:bg-secondary/10 transition-all"
                                                    >
                                                        <span className="truncate">Resource #{idx + 1}</span>
                                                        <ExternalLink className="w-3.5 h-3.5 text-secondary/70 flex-shrink-0" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedGD.reports && selectedGD.reports.length > 0 && (
                                        <div>
                                            <h5 className="text-xs font-mono text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                <Clipboard className="w-3.5 h-3.5" />
                                                Reports
                                            </h5>
                                            <div className="flex flex-col gap-2">
                                                {selectedGD.reports.map((url, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-background/40 border border-primary/10 text-xs sm:text-sm font-medium text-foreground hover:bg-primary/5 hover:border-primary/20 transition-all"
                                                    >
                                                        <span className="truncate">Report #{idx + 1}</span>
                                                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default GDSection;