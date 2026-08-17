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
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        // Intersection Observer for active section detection
        const sections = ["hero", "about", "events", "gds", "resources", "team", "contributors"];
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach((section) => {
            const el = document.getElementById(section);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Events", href: "#events" },
        { label: "GDs", href: "#gds" },
        { label: "Resources", href: "#resources" },
        { label: "Team", href: "#team" },
        { label: "Contributors", href: "#contributors" },
    ];

    const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        setTimeout(() => {
            const targetId = href.replace("#", "");
            const element = document.getElementById(targetId);
            if (element) {
                const offset = 80; // Offset for fixed navbar
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 200); // Wait for menu close transition to start
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-background/95 py-2.5 shadow-md shadow-primary/5"
                : "py-4 bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Crisp border on scroll */}
            {isScrolled && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6 }}
                />
            )}

            <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 max-w-[1600px]">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 sm:gap-2.5 group">
                        <div className="relative flex items-center justify-center flex-shrink-0">
                            <img src="/logo/AI CLUB LOGO DU.png" alt="AI Club Logo" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain z-10 group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="font-display text-base sm:text-lg md:text-xl font-bold tracking-wider bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
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
                                    className={`relative px-4 lg:px-5 py-2 text-sm lg:text-base font-semibold tracking-wide transition-all duration-300 rounded-lg ${isActive
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5 hover:scale-105"
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
                        <div className="container mx-auto px-3 sm:px-6 py-3 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="block py-3 px-3 sm:px-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all duration-300 font-medium text-sm sm:text-base"
                                    onClick={(e) => handleMobileLinkClick(e, link.href)}
                                >
                                    <span className="text-primary font-mono text-xs mr-2 sm:mr-3">0{i + 1}</span>
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
