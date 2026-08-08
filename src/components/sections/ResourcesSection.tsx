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
    FileCode,
    FileCheck,
    FolderDown
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

interface GDResourceData {
    gd: GDItem;
    gdNumber: number;
    resources: ResourceLink[];
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
    const [selectedGDResource, setSelectedGDResource] = useState<GDResourceData | null>(null);

    // Sort GDs with recent (newest) at top
    const sortedGDs = [...gds].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
                    className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
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
                        <span className="text-primary">Resources</span> & Study Hub
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                        Access discussion notes, reference papers, slide decks, and curated reading materials in sequence
                    </p>
                </motion.div>

                {/* Loading state */}
                {isLoading && (
                    <div className="flex justify-center py-12">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs text-muted-foreground font-mono">Loading resources...</span>
                        </div>
                    </div>
                )}

                {/* Compact GD Resources Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {sortedGDs.map((gd, idx) => {
                        const gdNumber = sortedGDs.length - idx;
                        const formattedGDNum = gdNumber < 10 ? `0${gdNumber}` : `${gdNumber}`;
                        const resourcesList = getDummyResourcesForGD(gd.title, idx);
                        const formattedDate = new Date(gd.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();

                        const handleOpenPopup = () => {
                            setSelectedGDResource({
                                gd,
                                gdNumber,
                                resources: resourcesList
                            });
                        };

                        return (
                            <motion.div
                                key={gd._id || idx}
                                className="clay-card p-5 flex flex-col justify-between relative group hover:border-primary/40 transition-all duration-300 border border-primary/10"
                                initial={{ opacity: 0, y: 25 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: idx * 0.08, duration: 0.4 }}
                                whileHover={{ y: -4 }}
                            >
                                <div>
                                    {/* Top Row: GD Tag & Date */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold">
                                                GD {formattedGDNum}
                                            </span>
                                            <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-primary/70" />
                                                {formattedDate}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Non-clickable GD Title Heading */}
                                    <h3 className="text-base sm:text-lg font-bold my-2 text-foreground leading-snug">
                                        {gd.title}
                                    </h3>
                                </div>

                                {/* Compact Footer Action: Explore All */}
                                <div className="mt-4 pt-3 border-t border-primary/10 flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground text-[11px] font-mono flex items-center gap-1">
                                        <FolderDown className="w-3.5 h-3.5 text-primary/70" />
                                        4 Resources
                                    </span>
                                    <button
                                        onClick={handleOpenPopup}
                                        className="text-primary font-semibold hover:underline flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-primary/10 hover:bg-primary/20 transition-all"
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

            {/* Resource Pop-Up Dialog */}
            <Dialog open={!!selectedGDResource} onOpenChange={(open) => !open && setSelectedGDResource(null)}>
                <DialogContent className="sm:max-w-4xl w-[94vw] clay-panel border-primary/20 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-2 text-xs font-mono text-primary mb-1">
                            <span className="px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20 font-bold">
                                GD {selectedGDResource?.gdNumber < 10 ? `0${selectedGDResource?.gdNumber}` : selectedGDResource?.gdNumber}
                            </span>
                            <span>•</span>
                            <span>{selectedGDResource?.gd.date}</span>
                        </div>
                        <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-display bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            {selectedGDResource?.gd.title}
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Resources and download materials for {selectedGDResource?.gd.title}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 my-4">
                        <div className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-2 border-b border-primary/10 pb-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Available Downloads & Resources
                        </div>

                        {/* List of Resources inside Modal - Fits cleanly without internal scrollbar */}
                        <div className="space-y-3">
                            {selectedGDResource?.resources.map((res) => (
                                <div
                                    key={res.id}
                                    className="p-3.5 sm:p-4 rounded-xl bg-background/80 hover:bg-primary/5 border border-primary/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="p-2.5 rounded-lg bg-primary/10 flex-shrink-0">
                                            {res.type === "pdf" && <FileText className="w-4.5 h-4.5 text-rose-400" />}
                                            {res.type === "slides" && <BookOpen className="w-4.5 h-4.5 text-amber-400" />}
                                            {res.type === "paper" && <ExternalLink className="w-4.5 h-4.5 text-sky-400" />}
                                            {res.type === "notes" && <FileCode className="w-4.5 h-4.5 text-purple-400" />}
                                        </div>
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {res.title}
                                            </h4>
                                            <p className="text-[11px] sm:text-xs text-muted-foreground">
                                                {res.description}
                                            </p>
                                        </div>
                                    </div>

                                    <a
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            if (res.url === "#") {
                                                e.preventDefault();
                                                alert(`Opening resource: ${res.title}`);
                                            }
                                        }}
                                        className="flex-shrink-0 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 self-end sm:self-center"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Download</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/40 text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">
                            <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> All 4 materials verified
                        </span>
                        <button
                            onClick={() => setSelectedGDResource(null)}
                            className="px-5 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-foreground transition-colors font-medium text-xs"
                        >
                            Close
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default ResourcesSection;
