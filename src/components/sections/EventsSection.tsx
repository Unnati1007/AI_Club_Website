import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events = [
    {
      title: "AI Hackathon 2025",
      date: "Feb 15-16, 2025",
      location: "Tech Hub Campus",
      description: "48-hour hackathon to build innovative AI solutions for real-world challenges.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop",
      tag: "Hackathon",
    },
    {
      title: "LLM Workshop Series",
      date: "Every Saturday",
      location: "Online",
      description: "Deep dive into Large Language Models, prompt engineering, and fine-tuning.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      tag: "Workshop",
    },
    {
      title: "ML Study Group",
      date: "Wednesdays, 6PM",
      location: "Room 301",
      description: "Weekly study sessions covering ML fundamentals and advanced topics.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop",
      tag: "Study Group",
    },
    {
      title: "AI Ethics Summit",
      date: "March 5, 2025",
      location: "Main Auditorium",
      description: "Panel discussion on responsible AI development and ethical considerations.",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop",
      tag: "Summit",
    },
  ];

  return (
    <section id="events" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm mb-4 block">// EVENTS</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Upcoming <span className="text-gradient">Events</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join our workshops, hackathons, and study groups to level up your AI skills
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i }}
            >
              <div className="glass rounded-2xl overflow-hidden h-full hover:glow-border transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                    {event.tag}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Button variant="outline" className="group border-border hover:border-primary/50">
            View All Events
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
