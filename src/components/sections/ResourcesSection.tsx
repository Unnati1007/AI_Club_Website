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

const GD_LINKS_MAP: Record<string, { finalReport?: string; resources?: string[]; reports?: string[] }> = {
    "The Future of Jobs: Will AI Create More Jobs Than It Replaces?": {
        resources: [
            "https://drive.google.com/file/d/1WKwXQHT5mh1wzAFncVLsmZDVW8ZOIwGd/view?usp=drivesdk",
            "https://drive.google.com/file/d/1UJ0XtOLCyeP-D977NlI06x-BXYb9FBGO/view?usp=drivesdk"
        ]
    },
    "AI Slope: Is It Running the Internet?": {
        resources: [
            "https://drive.google.com/file/d/19HnFVZBahdbxEa8KLBH3v5kzSN893Udr/view?usp=drivesdk",
            "https://drive.google.com/file/d/1c51hLPYx6LgAvV_fBTJZM9VcnnaDVFyJ/view?usp=drivesdk"
        ]
    },
    "AI in Legal Decision-Making": {
        resources: [
            "https://drive.google.com/file/d/13gwBiFvChYE-bHfLx5a3G2TF0yU_Y_MW/view?usp=drivesdk",
            "https://drive.google.com/file/d/1CpfnI2OszhOhQkRgQ-OshvZz--ImlaiQ/view?usp=drivesdk",
            "https://drive.google.com/file/d/1wIW1WDtGaDSpba1vkvbNRZUGlFogV6WS/view?usp=drivesdk"
        ],
        reports: [
            "https://drive.google.com/file/d/1CnwqHZ7t5Cmg3wJXibe8u3Jf5mIL31uv/view?usp=drivesdk",
            "https://drive.google.com/file/d/1dz4csjDGJkNodxug6Fri6ZJx50x7OCUD/view?usp=drivesdk",
            "https://drive.google.com/file/d/1GIcRpANbhSe7m-nWwp0J_PXUJPe3sp63/view?usp=drivesdk",
            "https://drive.google.com/file/d/1a8c6zDl74s5_P9xvbfnj5Coa5gHt5kYg/view?usp=drivesdk"
        ]
    },
    "AI in Education: Replacement or Support Tool?": {
        finalReport: "https://docs.google.com/document/d/1GMEZrSV1AT0f0ez1pgK5SLOEF-EVGKgI/edit?usp=drivesdk&ouid=111122047843704789076&rtpof=true&sd=true",
        reports: [
            "https://drive.google.com/file/d/1jw8KMoX5gUWZzZrE8STvuiGuChqOogQc/view?usp=drivesdk",
            "https://drive.google.com/file/d/1foIvHdqsbn8RhymuaZTpbxaZkCQIjNnY/view?usp=drivesdk",
            "https://docs.google.com/document/d/1oi5DFN4HjQwKi2xu5HEoYTCm1fVbH7u3/edit?usp=drivesdk&ouid=111122047843704789076&rtpof=true&sd=true"
        ]
    }
};

export const getStaticLinksForGD = (title: string) => {
    const normalized = title.toLowerCase();
    if (normalized.includes("legal") || normalized.includes("gd 03") || normalized.includes("gd3")) {
        return GD_LINKS_MAP["AI in Legal Decision-Making"];
    }
    if (normalized.includes("slope") || normalized.includes("internet") || normalized.includes("gd 02") || normalized.includes("gd2")) {
        return GD_LINKS_MAP["AI Slope: Is It Running the Internet?"];
    }
    if (normalized.includes("jobs") || normalized.includes("replaces") || normalized.includes("gd 01") || normalized.includes("gd1")) {
        return GD_LINKS_MAP["The Future of Jobs: Will AI Create More Jobs Than It Replaces?"];
    }
    if (normalized.includes("education") || normalized.includes("gd 04") || normalized.includes("gd4")) {
        return GD_LINKS_MAP["AI in Education: Replacement or Support Tool?"];
    }
    return {};
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
                        
                        // Construct real resources list in exact order: final report, reports, resources
                        const resourcesList: ResourceLink[] = [];
                        const staticLinks = getStaticLinksForGD(gd.title);
                        if (staticLinks.finalReport) {
                            resourcesList.push({
                                id: `final-report-${gd._id || idx}`,
                                title: `GD Final Report`,
                                type: "pdf",
                                description: "Official final summary and conclusion document of the group discussion.",
                                url: staticLinks.finalReport
                            });
                        }
                        if (staticLinks.reports && staticLinks.reports.length > 0) {
                            staticLinks.reports.forEach((url, rIdx) => {
                                resourcesList.push({
                                    id: `report-${gd._id || idx}-${rIdx}`,
                                    title: `Report ${rIdx + 1}`,
                                    type: "paper",
                                    description: "Detailed analysis and perspective reports submitted by participants.",
                                    url: url
                                });
                            });
                        }
                        if (staticLinks.resources && staticLinks.resources.length > 0) {
                            staticLinks.resources.forEach((url, rIdx) => {
                                resourcesList.push({
                                    id: `resource-${gd._id || idx}-${rIdx}`,
                                    title: `Resource ${rIdx + 1}`,
                                    type: "slides",
                                    description: "Supporting study material and references used during the discussion.",
                                    url: url
                                });
                            });
                        }

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
                                        {resourcesList.length} {resourcesList.length === 1 ? 'Resource' : 'Resources'}
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
                            {selectedGDResource && selectedGDResource.resources.length === 0 ? (
                                <p className="text-sm text-muted-foreground py-4 text-center font-mono">No resources available for this GD.</p>
                            ) : (
                                selectedGDResource?.resources.map((res) => (
                                    <a
                                        key={res.id}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            if (res.url === "#") {
                                                e.preventDefault();
                                                alert(`Opening resource: ${res.title}`);
                                            }
                                        }}
                                        className="p-3.5 sm:p-4 rounded-xl bg-background/80 hover:bg-primary/5 border border-primary/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer block"
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

                                        <div
                                            className="flex-shrink-0 px-4 py-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground border border-primary/20 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 self-end sm:self-center text-primary"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Download</span>
                                        </div>
                                    </a>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/40 text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">
                            <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> All {selectedGDResource?.resources.length} materials verified
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
