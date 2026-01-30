import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ActivitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activities = [
    {
      title: "Group Discussions",
      description: "Weekly brainstorming sessions where ideas collide and innovation sparks. Share knowledge, debate concepts, and explore new frontiers in AI together.",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&h=350&fit=crop",
    },
    {
      title: "Hackathons",
      description: "Intense coding marathons that push boundaries. Build, break, and create amazing AI projects under pressure with your team.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=350&fit=crop",
    },
    {
      title: "Workshops",
      description: "Hands-on learning experiences led by industry experts. From basics to advanced techniques, master the tools of the trade.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop",
    },
  ];

  return (
    <section id="activities" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm mb-4 block">// ACTIVITIES</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What We <span className="text-gradient">Do</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our diverse range of activities designed to foster learning and collaboration
          </p>
        </motion.div>

        <div className="space-y-12">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * i }}
            >
              <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="glass rounded-2xl p-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{activity.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{activity.description}</p>

                  <div className="flex gap-6 mt-6 pt-6 border-t border-border/50">
                    <div>
                      <div className="text-xl font-bold text-primary">Weekly</div>
                      <div className="text-sm text-muted-foreground">Sessions</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">50+</div>
                      <div className="text-sm text-muted-foreground">Participants</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
