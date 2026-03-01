import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
];

const EVENTS = [
  {
    date: "OCT 24",
    time: "5:00 PM",
    location: "MITS Campus",
    title: "Hackathon 2.0",
    description: "The biggest hackathon of the semester. 24 hours of coding, coffee, and innovation.",
    tag: "Hackathon"
  },
  {
    date: "NOV 05",
    time: "2:00 PM",
    location: "Lab 102",
    title: "AI Workshop",
    description: "An introduction to Neural Networks using Python. Beginner friendly.",
    tag: "Workshop"
  },
  {
    date: "NOV 12",
    time: "6:00 PM",
    location: "Main Auditorium",
    title: "Tech Talk",
    description: "Guest speaker session on the future of decentralized web and smart contracts.",
    tag: "Seminar"
  }
];

export default function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="events" className="w-full bg-black py-24 px-6 font-sans relative overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-4">
            <span className="h-[1px] w-10 bg-cyan-400"></span>
            // EVENTS
          </div>
          <h2 className="font-display text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Events
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl font-light leading-relaxed">
            Join our workshops, hackathons, and study groups to level up your AI skills.
          </p>
        </motion.div>

        {/* Infinite Image Marquee */}
        <div className="relative w-full overflow-hidden py-12 mb-24 mask-fade-x">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -((384 + 32) * EVENT_IMAGES.length)] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...EVENT_IMAGES, ...EVENT_IMAGES].map((src, index) => (
              <div key={index} className="h-72 w-96 flex-shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#111]">
                <img src={src} alt="Event Gallery" className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Upcoming Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {EVENTS.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col gap-6 rounded-[2.5rem] bg-[#0A0A0A] p-10 border border-white/5 transition-all duration-500 hover:border-cyan-500/30 hover:bg-[#0F0F0F] hover:shadow-[0_0_40px_rgba(34,211,238,0.05)]"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-cyan-400 uppercase">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                  {event.tag}
                </span>
              </div>
              
              <h3 className="font-display text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                {event.title}
              </h3>
              
              <p className="text-gray-400 text-lg leading-relaxed font-light line-clamp-3">
                {event.description}
              </p>

              <div className="flex items-center gap-2 text-muted-foreground text-sm mt-auto">
                <MapPin className="w-4 h-4 text-cyan-500" />
                {event.location} • {event.time}
              </div>
              
              <div className="mt-6">
                <Button className="w-full rounded-full border border-white/20 bg-transparent py-6 text-white hover:bg-white hover:text-black transition-all">
                  Register Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Link */}
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Button variant="ghost" className="text-gray-400 hover:text-white group text-xl">
            View All Events
            <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

