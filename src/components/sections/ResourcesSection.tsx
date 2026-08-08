import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
    BookOpen,
    FileText,
    Download,
    ExternalLink,
    Calendar,
    Sparkles,
    CheckCircle2,
    Share2,
    Bookmark,
    Video,
    Layers,
    FileCode,
    FileCheck
} from "lucide-react";
import { useGDStore, GDItem } from "@/hooks/useGDStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ResourceLink {
    id: string;
    title: string;
    type: "pdf" | "slides" | "paper" | "notes";
    fileSize?: string;
    description: string;
    url: string;
}

const getDummyResourcesForGD = (gdTitle: string, index: number): ResourceLink[] => {
    return [
        {
            id: `notes-${index}`,
            title: `${gdTitle} - Key Takeaways & Summary`,
            type: "pdf",
            fileSize: "2.4 MB",
            description: "Complete summary document detailing core discussion points, participant arguments, and consensus recommendations.",
            url: "#"
        },
        {
            id: `slides-${index}`,
            title: `${gdTitle} - Presentation Deck`,
            type: "slides",
            fileSize: "5.1 MB",
            description: "Official slide deck presented during the group discussion intro session.",
            url: "#"
        },
        {
            id: `paper-${index}`,
            title: "Recommended Reading & ArXiv Research Papers",
            type: "paper",
            fileSize: "External Link",
            description: "Curated collection of peer-reviewed articles and research papers referenced during the session.",
            url: "https://arxiv.org"
        },
        {
            id: `transcript-${index}`,
            title: "Discussion Transcript & Audio Briefing",
            type: "notes",
            fileSize: "1.8 MB",
            description: "Formatted transcript and audio breakdown highlighting critical debates and key insights.",
            url: "#"
        }
    ];
};

const ResourcesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { gds, isLoading } = useGDStore();
    const [selectedResource, setSelectedResource] = useState<{
        gd: GDItem;
        gdNumber: number;
        resource: ResourceLink;
    } | null>(null);

    // Sort GDs chronologically or sequentially
    const sortedGDs = [...gds].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <section id="resources" className="py-12 sm:py-16 relative overflow-hidden" ref={ref}>
            {/* Ambient Background & Grid */}
            <div className="absolute inset-0 hex-pattern opacity-15" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/4 left-0 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />

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
                        <span className="text-xs font-mono tracking-widest text-primary uppercase font-semibold">
                            Study Materials & Archives
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 font-display tracking-tight">
                        GD <span className="text-primary">Resources</span> & Study Hub
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                        Access discussion notes, reference papers, slide decks, and curated reading materials in sequence
                    </p>
                </motion.div>

                {/* Loading state */}
                {isLoading && (
                    <div className="flex justify-center py-16">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs text-muted-foreground font-mono">Loading resources...</span>
                        </div>
                    </div>
                )}

                {/* GD Resources Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {sortedGDs.map((gd, idx) => {
                        const gdNumber = idx + 1;
                        const formattedGDNum = gdNumber < 10 ? `0${gdNumber}` : `${gdNumber}`;
                        const resourcesList = getDummyResourcesForGD(gd.title, idx);
                        const formattedDate = new Date(gd.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();

                        return (
                            <motion.div
                                key={gd._id || idx}
                                className="clay-card p-5 sm:p-6 flex flex-col justify-between relative group hover:border-primary/40 transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                whileHover={{ y: -5 }}
                            >
                                {/* Top Badge & Header */}
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold">
                                                GD {formattedGDNum}
                                            </span>
                                            <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-primary/70" />
                                                {formattedDate}
                                            </span>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" title="Resources Available" />
                                    </div>

                                    {/* GD Title */}
                                    <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        <a href="#gds" className="hover:underline flex items-center gap-1.5">
                                            {gd.title}
                                            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                        </a>
                                    </h3>

                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-5">
                                        {gd.description}
                                    </p>

                                    {/* Sequential Resource Items */}
                                    <div className="space-y-2.5 mb-6">
                                        <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-2 flex items-center gap-1.5">
                                            <Layers className="w-3.5 h-3.5 text-primary" />
                                            Available Downloads & Links
                                        </div>
                                        {resourcesList.map((res) => (
                                            <button
                                                key={res.id}
                                                onClick={() => setSelectedResource({ gd, gdNumber, resource: res })}
                                                className="w-full text-left p-2.5 rounded-lg bg-background/60 hover:bg-primary/10 border border-primary/10 hover:border-primary/30 transition-all flex items-center justify-between group/item"
                                            >
                                                <div className="flex items-center gap-2.5 overflow-hidden">
                                                    {res.type === "pdf" && <FileText className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                                                    {res.type === "slides" && <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                                                    {res.type === "paper" && <ExternalLink className="w-4 h-4 text-sky-400 flex-shrink-0" />}
                                                    {res.type === "notes" && <FileCode className="w-4 h-4 text-purple-400 flex-shrink-0" />}
                                                    <span className="text-xs text-foreground/90 font-medium truncate group-hover/item:text-primary transition-colors">
                                                        {res.title}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-mono text-muted-foreground/70 flex-shrink-0 ml-2 group-hover/item:text-primary">
                                                    {res.fileSize}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="pt-3 border-t border-primary/10 flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                        4 Material Links
                                    </span>
                                    <button
                                        onClick={() => setSelectedResource({ gd, gdNumber, resource: resourcesList[0] })}
                                        className="text-primary font-semibold hover:underline flex items-center gap-1 text-xs"
                                    >
                                        Explore All
                                        <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Resource Modal / Dialog */}
            <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
                <DialogContent className="sm:max-w-xl clay-panel border-primary/20">
                    <DialogHeader>
                        <div className="flex items-center gap-2 text-xs font-mono text-primary mb-1">
                            <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 font-bold">
                                GD {selectedResource?.gdNumber < 10 ? `0${selectedResource?.gdNumber}` : selectedResource?.gdNumber}
                            </span>
                            <span>•</span>
                            <span>{selectedResource?.gd.title}</span>
                        </div>
                        <DialogTitle className="text-xl font-display bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            {selectedResource?.resource.title}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground pt-1">
                            {selectedResource?.resource.description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 my-4">
                        {/* Resource Details Box */}
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Resource Type:</span>
                                <span className="font-mono uppercase font-semibold text-primary">
                                    {selectedResource?.resource.type}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Size / Format:</span>
                                <span className="font-mono text-foreground">{selectedResource?.resource.fileSize}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Status:</span>
                                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                    <FileCheck className="w-3.5 h-3.5" /> Verified & Accessible
                                </span>
                            </div>
                        </div>

                        {/* Dummy Preview Highlights */}
                        <div className="p-4 rounded-xl bg-background/80 border border-border/50 space-y-2">
                            <h4 className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                Resource Preview Notes (Dummy Data)
                            </h4>
                            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                                <li>Comprehensive overview of discussion topics and key arguments.</li>
                                <li>Detailed analysis of technological, ethical, and practical implications.</li>
                                <li>Curated reference list with external links and recommended further reading.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2 border-t border-border/40">
                        <button
                            onClick={() => setSelectedResource(null)}
                            className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Close
                        </button>
                        <a
                            href={selectedResource?.resource.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                e.preventDefault();
                                alert(`Downloading/Opening dummy resource: ${selectedResource?.resource.title}`);
                            }}
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-lg shadow-primary/20"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Download / Open Resource
                        </a>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default ResourcesSection;
