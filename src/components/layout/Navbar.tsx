import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Cpu } from "lucide-react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Detect active section
            const sections = ["hero", "about", "events", "gds", "team", "contributors"];
            const scrollPosition = window.scrollY + 150; // Detection line offset

            let current = "";
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el && el.offsetTop <= scrollPosition) {
                    current = section;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Events", href: "#events" },
        { label: "GDs", href: "#gds" },
        { label: "Team", href: "#team" },
        { label: "Contributors", href: "#contributors" },
    ];

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "glass-strong py-2 shadow-[0_4px_30px_rgba(0,212,255,0.05)]"
                : "py-3 bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Animated bottom border on scroll */}
            {isScrolled && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background: "linear-gradient(90deg, transparent, hsl(190 100% 50% / 0.3), hsl(263 70% 58% / 0.3), transparent)",
                    }}
                />
            )}

            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300">
                                <Cpu className="w-5 h-5 text-primary" />
                            </div>
                            <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="font-display text-lg font-bold tracking-wider bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                            AI CLUB
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace("#", "");
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary"
                                            layoutId="activeNav"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="md:hidden absolute top-full left-0 right-0 glass-strong border-t border-primary/10"
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="container mx-auto px-6 py-4 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="block py-3 px-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all duration-300 font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="text-primary font-mono text-xs mr-3">0{i + 1}</span>
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                        {/* Decorative bottom glow */}
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
