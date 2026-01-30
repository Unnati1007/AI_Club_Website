import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Github } from "lucide-react";

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultImage = "https://via.placeholder.com/200x200/0D8ABC/FFFFFF?text=Team+Member";

  const teamHierarchy = {
    president: {
      name: "Alex Chen",
      role: "President",
      image: defaultImage,
      linkedin: "#",
      github: "#",
    },
    leads: [
      {
        name: "Sarah Johnson",
        role: "Tech Lead",
        image: defaultImage,
        linkedin: "#",
        github: "#",
      },
      {
        name: "Mike Rodriguez",
        role: "Events Lead",
        image: defaultImage,
        linkedin: "#",
        github: "#",
      },
      {
        name: "Emily Park",
        role: "Content Lead",
        image: defaultImage,
        linkedin: "#",
        github: "#",
      },
      {
        name: "David Kim",
        role: "Community Lead",
        image: defaultImage,
        linkedin: "#",
        github: "#",
      },
      {
        name: "Suyash Khare",
        role: "Research Lead",
        image: defaultImage,
        linkedin: "#",
        github: "#",
      },
    ],
    coleads: [
      {
        name: "James Wilson",
        role: "Tech Co-Lead",
        image: defaultImage,
        linkedin: "#",
        github: "#",
      },
      {
        name: "Lisa Zhang",
        role: "Events Co-Lead",
        image: defaultImage,
        linkedin: "#",
        github: "#",
      },
      {
        name: "Robert Brown",
        role: "Content Co-Lead",
        image: defaultImage,
        linkedin: "#",
        github: "#",
      },
      {
        name: "Amanda Martinez",
        role: "Community Co-Lead",
        image: defaultImage,
        linkedin: "#",
        github: "#",
      },
      {
        name: "Thomas Anderson",
        role: "Research Co-Lead",
        image: defaultImage,
        linkedin: "#",
        github: "#",
      },
    ],
    coordinator: {
      name: "Dr. Patricia Johnson",
      role: "Faculty Coordinator",
      image: defaultImage,
      linkedin: "#",
      github: "#",
    },
  };

  const TeamMember = ({ member, delay, size = "medium" }) => {
    const sizeClasses = {
      large: "w-40 h-40",
      medium: "w-32 h-32",
      small: "w-28 h-28",
    };

    const textSizeClasses = {
      large: "text-lg",
      medium: "text-base",
      small: "text-sm",
    };

    return (
      <motion.div
        className="group flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay }}
      >
        <div className={`relative mb-4 ${sizeClasses[size]}`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors duration-300">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="absolute inset-0 rounded-full bg-background/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a href={member.linkedin} className="p-2 hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={member.github} className="p-2 hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        <h3 className={`font-semibold text-center ${textSizeClasses[size]}`}>
          {member.name}
        </h3>
        <p className="text-primary text-xs font-mono text-center">{member.role}</p>
      </motion.div>
    );
  };

  return (
    <section id="team" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm mb-4 block">
            // THE TEAM
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Meet Our <span className="text-gradient">Leadership</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Dedicated leaders driving innovation and building our thriving community
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex justify-center mb-8">
            <TeamMember
              member={teamHierarchy.president}
              delay={0.1}
              size="large"
            />
          </div>

          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-transparent" />
          </div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-8">
            {teamHierarchy.leads.map((lead, i) => (
              <TeamMember
                key={i}
                member={lead}
                delay={0.2 + i * 0.1}
                size="medium"
              />
            ))}
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl flex justify-between px-8 relative h-8">
              <div className="absolute top-0 left-1/2 w-3/4 h-full border-l border-b border-r border-primary/30 rounded-b-3xl transform -translate-x-1/2" />
              {teamHierarchy.leads.map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-8 bg-gradient-to-b from-transparent to-primary/30"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-6">
            {teamHierarchy.coleads.map((colead, i) => (
              <TeamMember
                key={i}
                member={colead}
                delay={0.3 + i * 0.1}
                size="small"
              />
            ))}
          </div>

          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-primary/30 to-transparent" />
          </div>

          <div className="flex justify-center">
            <TeamMember
              member={teamHierarchy.coordinator}
              delay={0.8}
              size="medium"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
