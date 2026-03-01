import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Calendar } from "lucide-react";
import { useGDStore } from "@/hooks/useGDStore";

const GDSection = () => {
    const ref = useRef(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { gds } = useGDStore();

    return (
        <section id="gds" className="py-24 relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 hex-pattern opacity-15" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-primary font-mono text-sm">// GROUP DISCUSSIONS</span>
                        <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Our <span className="text-gradient neon-text">GDs</span>
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
                    className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-6 scrollbar-hide cursor-grab active:cursor-grabbing"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {gds.map((gd, i) => (
                        <motion.div
                            key={gd.id}
                            className="group flex-shrink-0 w-[300px] md:w-[340px] rounded-2xl glass border-border/30 hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, x: 40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                            whileHover={{ y: -6 }}
                        >
                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={gd.image}
                                    alt={gd.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />

                                {/* Date badge */}
                                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border/30 text-[10px] font-mono text-muted-foreground">
                                    <Calendar className="w-3 h-3 text-primary" />
                                    {new Date(gd.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>

                                {/* GD icon */}
                                <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <MessageSquare className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                                    {gd.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                    {gd.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty state */}
                    {gds.length === 0 && (
                        <div className="flex-shrink-0 w-full flex items-center justify-center py-16">
                            <div className="text-center text-muted-foreground">
                                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                <p className="font-mono text-sm">No GDs yet. Check back soon!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll hint */}
            <motion.div
                className="flex justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
            >
                <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.3em]">
                    ← Scroll to explore →
                </span>
            </motion.div>
        </section>
    );
};

export default GDSection;
