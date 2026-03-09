import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "aiclub@2025",
};

const AdminLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        setTimeout(() => {
            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                sessionStorage.setItem("ai-club-admin", "true");
                navigate("/admin/dashboard");
            } else {
                setError("Invalid credentials. Access denied.");
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 hex-pattern opacity-20" />
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />

            <motion.div
                className="w-full max-w-md relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-display text-xl font-bold tracking-wider text-gradient">AI CLUB</span>
                </div>

                {/* Login Card */}
                <div className="glass rounded-2xl p-8 border-border/30">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-7 h-7 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
                        <p className="text-sm text-muted-foreground font-mono">Restricted area — authorized personnel only</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.div
                            className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm"
                                    placeholder="Enter password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-6 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-secondary text-primary-foreground font-semibold transition-all duration-500"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                                    Authenticating...
                                </div>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
                            ← Back to website
                        </a>
                    </div>
                </div>

                {/* Security note */}
                <p className="text-center text-[10px] text-muted-foreground/40 mt-6 font-mono">
                    Secure admin panel • Session-based authentication
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
