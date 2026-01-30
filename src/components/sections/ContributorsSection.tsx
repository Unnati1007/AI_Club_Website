import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, ExternalLink, Code2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContributorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contributors = [
    {
      name: "Rahul Sharma",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      contributions: 47,
      projects: ["AI Chatbot", "ML Pipeline"],
    },
    {
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
      contributions: 32,
      projects: ["Computer Vision", "NLP Tools"],
    },
    {
      name: "Arjun Mehta",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
      contributions: 28,
      projects: ["Data Analytics", "Model Training"],
    },
  ];

  const developer = {
    name: "Aditya Kumar",
    role: "Lead Developer",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
    bio: "Full-stack developer passionate about AI and building tools that empower communities. Core maintainer of AI Club's open-source projects.",
    github: "#",
    linkedin: "#",
    website: "#",
    stats: {
      commits: "500+",
      projects: "12",
      stars: "2.1k",
    },
  };

  return (
    <section id="contributors" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm mb-4 block">// CONTRIBUTORS</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Open Source Heroes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            The brilliant minds who contribute to our projects and make AI Club thrive
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            className="glass rounded-2xl p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Top Contributors
            </h3>
            
            <div className="space-y-4">
              {contributors.map((contributor, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-colors"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {contributor.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {contributor.contributions} contributions
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 flex-wrap justify-end">
                      {contributor.projects.map((project, j) => (
                        <span
                          key={j}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-6 italic">
              Contribute to our projects and see your profile here!
            </p>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              Developer Spotlight
            </h3>

            <div className="text-center">
              <div className="relative w-28 h-28 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse blur-md" />
                <img
                  src={developer.avatar}
                  alt={developer.name}
                  className="relative w-full h-full rounded-full object-cover border-4 border-background"
                />
              </div>

              <h4 className="text-2xl font-bold">{developer.name}</h4>
              <p className="text-primary font-mono text-sm mb-4">{developer.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {developer.bio}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(developer.stats).map(([key, value]) => (
                  <div key={key} className="p-3 rounded-xl bg-muted/30">
                    <div className="text-xl font-bold text-gradient">{value}</div>
                    <div className="text-xs text-muted-foreground capitalize">{key}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-3">
                <Button size="sm" variant="outline" className="gap-2 border-border hover:border-primary/50">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
                <Button size="sm" variant="outline" className="gap-2 border-border hover:border-primary/50">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Button>
                <Button size="sm" variant="outline" className="gap-2 border-border hover:border-primary/50">
                  <ExternalLink className="w-4 h-4" />
                  Portfolio
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContributorsSection;
