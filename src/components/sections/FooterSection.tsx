import { motion } from "framer-motion";
import { Linkedin, Instagram, MessageCircle, Mail, MapPin, Heart } from "lucide-react";
import { ParticleField } from "@/components/ui/ParticleField";

const FooterSection = () => {
    const socialLinks = [
        {
            icon: Linkedin,
            label: "LinkedIn",
            href: "https://www.linkedin.com/company/ai-club-mits-du/posts/?feedView=all",
            color: "hover:text-blue-400 hover:bg-blue-400/10"
        },
        {
            icon: Instagram,
            label: "Instagram",
            href: "https://www.instagram.com/aiclub.mits?igsh=MWV0d2lrNjR4N2dmeQ==",
            color: "hover:text-pink-400 hover:bg-pink-400/10"
        },
        {
            icon: MessageCircle,
            label: "Discord",
            href: "#",
            color: "hover:text-indigo-400 hover:bg-indigo-400/10"
        },
    ];

    const quickLinks = [
        { label: "About", href: "#about" },
        { label: "Events", href: "#events" },
        { label: "Group Discussions", href: "#gds" },
        { label: "Our Team", href: "#team" },
        { label: "Contributors", href: "#contributors" },
    ];

    const resources = [
        { label: "Resources", href: "#resources" },
    ];

    return (
        <footer id="contact" className="relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
            {/* Particle strip background */}
            <div className="absolute inset-0 opacity-20">
                <ParticleField particleCount={30} connectionDistance={100} interactive={false} />
            </div>

            {/* Top gradient border with glow */}
            <div className="relative">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="absolute left-1/2 -translate-x-1/2 -top-[2px] w-24 h-[2px] bg-primary/20 blur-sm" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] via-transparent to-transparent" />

            <div className="container mx-auto px-6 relative z-10 py-16">
                {/* Main Footer Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Brand - Larger column */}
                    <motion.div
                        className="lg:col-span-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {/* AI Club Logo - Same as navbar */}
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary rounded-lg opacity-20 blur-sm"></div>
                                <div className="relative w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-lg border border-primary/30 flex items-center justify-center backdrop-blur-sm">
                                    <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">

                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="font-display text-xl font-bold tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    AI CLUB
                                </span>
                                <p className="text-xs text-muted-foreground font-mono">MITS-DU · Est. 2024</p>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-xs">
                            A community of passionate learners exploring the frontiers of artificial intelligence through collaboration and hands-on projects.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 w-fit">
                            <MapPin className="w-4 h-4 text-primary" />
                            MITS-DU, Gwalior
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full" />
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group py-1"
                                    >
                                        <span className="text-primary/40 font-mono text-[10px] group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Resources */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                    >
                        <h4 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-4 bg-secondary rounded-full" />
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            {resources.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground hover:text-secondary transition-all duration-300 text-sm flex items-center gap-2 group py-1"
                                    >
                                        <span className="text-secondary/40 font-mono text-[10px] group-hover:text-secondary group-hover:translate-x-1 transition-all">→</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact & Social - Larger column */}
                    <motion.div
                        className="lg:col-span-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full" />
                            Connect With Us
                        </h4>

                        {/* Email with fancy styling */}
                        <div className="mb-6">
                            <a
                                href="mailto:aiclubmits@gmail.com"
                                className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all duration-300 group bg-primary/5 px-4 py-2.5 rounded-xl border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                            >
                                <Mail className="w-4 h-4 group-hover:text-primary transition-colors group-hover:scale-110" />
                                <span className="font-mono">aiclubmits@gmail.com</span>
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-2 mb-4">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-12 h-12 rounded-xl glass flex items-center justify-center transition-all duration-300 group border border-transparent hover:border-primary/20 hover:scale-110 hover:shadow-lg ${social.color}`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-inherit transition-colors duration-300" />
                                </a>
                            ))}
                        </div>

                        <p className="text-xs text-muted-foreground/80 font-mono italic">
                            "Learn, Build, Innovate — Together."
                        </p>
                    </motion.div>
                </div>

                {/* Bottom bar with updated text */}
                <motion.div
                    className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Decorative element */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-[1px] w-32 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        © {new Date().getFullYear()} Developed by
                        <span className="flex items-center gap-1 text-primary font-semibold">
                            TEAM AI Club
                            <Heart className="w-3.5 h-3.5 fill-primary text-primary animate-pulse" />
                        </span>
                    </p>


                </motion.div>
            </div>
        </footer>
    );
};

export default FooterSection;