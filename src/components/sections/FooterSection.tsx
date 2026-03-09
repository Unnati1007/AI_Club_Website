import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, MessageCircle, Mail, MapPin, ArrowUp, Cpu } from "lucide-react";
import { ParticleField } from "@/components/ui/ParticleField";

const FooterSection = () => {
    const socialLinks = [
        { icon: Github, label: "GitHub", href: "#", color: "hover:text-white hover:bg-white/10" },
        { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-blue-400 hover:bg-blue-400/10" },
        { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-400 hover:bg-pink-400/10" },
        { icon: MessageCircle, label: "Discord", href: "#", color: "hover:text-indigo-400 hover:bg-indigo-400/10" },
    ];

    const quickLinks = [
        { label: "About", href: "#about" },
        { label: "Events", href: "#events" },
        { label: "GDs", href: "#gds" },
        { label: "Team", href: "#team" },
        { label: "Contributors", href: "#contributors" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer id="contact" className="relative overflow-hidden">
            {/* Particle strip background */}
            <div className="absolute inset-0 opacity-30">
                <ParticleField particleCount={30} connectionDistance={100} interactive={false} />
            </div>

            {/* Top gradient border */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />

            <div className="container mx-auto px-6 relative z-10 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                                <Cpu className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-display text-lg font-bold tracking-wider text-gradient">AI CLUB</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            Building the future of AI, one project at a time. Join our community of innovators.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary" />
                            MITS Campus, Gwalior
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group py-1"
                                    >
                                        <span className="text-primary/40 font-mono text-[10px] group-hover:text-primary transition-colors">→</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">Get in Touch</h4>
                        <div className="space-y-3">
                            <a
                                href="mailto:hello@aiclub.dev"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300 group"
                            >
                                <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
                                hello@aiclub.dev
                            </a>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Have questions? We'd love to hear from you!
                            </p>
                        </div>
                    </motion.div>

                    {/* Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">Connect With Us</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className={`w-10 h-10 rounded-xl glass flex items-center justify-center transition-all duration-300 group border border-transparent hover:border-primary/20 hover:scale-110 ${social.color}`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-inherit transition-colors duration-300" />
                                </a>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 font-mono">
                            Follow us for updates on events and projects
                        </p>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} AI Club. Built with <span className="text-primary">♥</span> and code.
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-6 text-sm text-muted-foreground">
                            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                            <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        </div>

                        {/* Back to top */}
                        <button
                            onClick={scrollToTop}
                            className="w-10 h-10 rounded-xl glass border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                            aria-label="Back to top"
                        >
                            <ArrowUp className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 transition-all duration-300" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default FooterSection;
