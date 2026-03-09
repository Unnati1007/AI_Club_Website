import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Plus, Pencil, Trash2, LogOut, X, Save, Image, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGDStore, GDItem } from "@/hooks/useGDStore";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { gds, addGD, updateGD, deleteGD, error: backendError, isLoading } = useGDStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGD, setEditingGD] = useState<GDItem | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);

    // Form state
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formImage, setFormImage] = useState("");
    const [formDate, setFormDate] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auth check
    useEffect(() => {
        if (sessionStorage.getItem("ai-club-admin") !== "true") {
            navigate("/admin");
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem("ai-club-admin");
        navigate("/admin");
    };

    const compressImage = (base64Str: string): Promise<string> => {
        return new Promise((resolve) => {
            const img = new window.Image();
            img.src = base64Str;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 600;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to JPEG with 0.7 quality
            };
        });
    };

    const openAddModal = () => {
        setEditingGD(null);
        setFormTitle("");
        setFormDescription("");
        setFormImage("");
        setFormDate(new Date().toISOString().split("T")[0]);
        setPreviewImage("");
        setLocalError(null);
        setIsModalOpen(true);
    };

    const openEditModal = (gd: GDItem) => {
        setEditingGD(gd);
        setFormTitle(gd.title);
        setFormDescription(gd.description);
        setFormImage(gd.image);
        setFormDate(gd.date);
        setPreviewImage(gd.image);
        setLocalError(null);
        setIsModalOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result as string;
                const compressed = await compressImage(base64);
                setFormImage(compressed);
                setPreviewImage(compressed);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        if (!formTitle.trim() || !formDescription.trim()) return;

        const imageUrl = formImage || "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=400&fit=crop";

        try {
            let result;
            if (editingGD) {
                result = await updateGD(editingGD._id, {
                    title: formTitle,
                    description: formDescription,
                    image: imageUrl,
                    date: formDate,
                });
            } else {
                result = await addGD({
                    title: formTitle,
                    description: formDescription,
                    image: imageUrl,
                    date: formDate,
                });
            }

            if (result.success) {
                setIsModalOpen(false);
            } else {
                setLocalError(result.error || "Failed to save");
            }
        } catch (err: any) {
            setLocalError(err.message || "An unexpected error occurred");
        }
    };

    const handleDelete = async (id: string) => {
        const result = await deleteGD(id);
        if (result.success) {
            setDeleteConfirm(null);
        } else {
            setLocalError(result.error || "Failed to delete");
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Top bar */}
            <div className="glass-strong border-b border-border/30 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                            <Cpu className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <span className="font-display text-sm font-bold tracking-wider text-gradient">AI CLUB</span>
                            <span className="text-muted-foreground text-xs font-mono ml-2">/ Admin Panel</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
                            View Site
                        </a>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="gap-2 border-border/50 hover:border-destructive/50 hover:text-destructive"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Storage Error Alert */}
                {(backendError || localError) && (
                    <motion.div
                        className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <div>
                            <p className="font-bold">Error</p>
                            <p className="opacity-90">{localError || backendError}</p>
                        </div>
                    </motion.div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Manage Group Discussions</h1>
                        <p className="text-sm text-muted-foreground font-mono">{gds.length} GDs total</p>
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-secondary text-primary-foreground"
                    >
                        <Plus className="w-4 h-4" />
                        Add GD
                    </Button>
                </div>

                {/* GD Grid */}
                {gds.length === 0 ? (
                    <div className="text-center py-20 glass rounded-2xl">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
                        <p className="text-muted-foreground font-mono text-sm mb-4">No group discussions yet</p>
                        <Button onClick={openAddModal} variant="outline" className="gap-2">
                            <Plus className="w-4 h-4" />
                            Create your first GD
                        </Button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gds.map((gd, i) => (
                            <motion.div
                                key={gd._id}
                                className="group rounded-2xl glass border-border/30 overflow-hidden hover:border-primary/20 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                layout
                            >
                                {/* Image */}
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={gd.image}
                                        alt={gd.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

                                    {/* Date */}
                                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border/30 text-[10px] font-mono text-muted-foreground">
                                        {new Date(gd.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-bold text-base mb-2 line-clamp-1">{gd.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{gd.description}</p>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openEditModal(gd)}
                                            className="flex-1 gap-1.5 border-border/50 hover:border-primary/50 hover:bg-primary/5 text-xs"
                                        >
                                            <Pencil className="w-3 h-3" />
                                            Edit
                                        </Button>
                                        {deleteConfirm === gd._id ? (
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(gd._id)}
                                                    className="text-xs px-3"
                                                >
                                                    Confirm
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setDeleteConfirm(null)}
                                                    className="text-xs px-3"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setDeleteConfirm(gd._id)}
                                                className="gap-1.5 border-border/50 hover:border-destructive/50 hover:text-destructive text-xs"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            className="relative glass rounded-2xl border-border/30 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            {/* Modal header */}
                            <div className="p-6 border-b border-border/30 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold">
                                        {editingGD ? "Edit GD" : "Add New GD"}
                                    </h2>
                                    {localError && (
                                        <p className="text-destructive text-[10px] font-mono mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {localError}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-8 h-8 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {/* Image */}
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Image</label>

                                    {previewImage ? (
                                        <div className="relative rounded-xl overflow-hidden mb-3 h-44">
                                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => { setPreviewImage(""); setFormImage(""); }}
                                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-destructive/20 transition-colors"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className="h-44 rounded-xl border-2 border-dashed border-border/50 hover:border-primary/30 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors mb-3"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Image className="w-8 h-8 text-muted-foreground/40" />
                                            <span className="text-xs text-muted-foreground font-mono">Click to upload image</span>
                                        </div>
                                    )}

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />

                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-muted-foreground/50 font-mono">or paste URL:</span>
                                        <input
                                            type="url"
                                            value={formImage.startsWith("data:") ? "" : formImage}
                                            onChange={(e) => { setFormImage(e.target.value); setPreviewImage(e.target.value); }}
                                            className="flex-1 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-all duration-300 text-xs"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Title *</label>
                                    <input
                                        type="text"
                                        value={formTitle}
                                        onChange={(e) => setFormTitle(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm"
                                        placeholder="GD Topic Title"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Description *</label>
                                    <textarea
                                        value={formDescription}
                                        onChange={(e) => setFormDescription(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm resize-none"
                                        placeholder="Describe the group discussion topic..."
                                        required
                                    />
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Date</label>
                                    <input
                                        type="date"
                                        value={formDate}
                                        onChange={(e) => setFormDate(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 border-border/50"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-secondary text-primary-foreground"
                                    >
                                        <Save className="w-4 h-4" />
                                        {editingGD ? "Save Changes" : "Add GD"}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
