import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Brain, Code2, Users, Lightbulb } from "lucide-react";
import { SplineScene } from "@/components/ui/spline-scene";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate diagonal movement: move down and right as user scrolls
  // Start from around 600px scroll (where about section appears) and max out at 1200px
  const aboutSectionStart = 450;
  const maxScroll = 1200;
  const scrollProgress = Math.max(0, Math.min((scrollY - aboutSectionStart) / (maxScroll - aboutSectionStart), 1));
  const translateX = -scrollProgress * 0; // Move left (negative)
  const translateY = scrollProgress * 0; // Move down (positive)

  const features = [
    {
      icon: Brain,
      title: "AI Research",
      description: "Explore cutting-edge AI technologies and machine learning concepts",
    },
    {
      icon: Code2,
      title: "Hands-on Projects",
      description: "Build real-world applications using the latest AI tools and frameworks",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with like-minded innovators and industry professionals",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Turn ideas into reality through hackathons and collaborative projects",
    },
  ];

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="h-[400px] lg:h-[500px] relative">
            <motion.div
              className="relative h-full rounded-2xl overflow-hidden glass"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {isInView && (
                <motion.div
                  className="w-full h-full"
                  animate={{
                    x: translateX,
                    y: translateY
                  }}
                  transition={{ type: "tween", duration: 0 }}
                >
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                    
                  />
                </motion.div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-mono text-sm mb-4 block">// ABOUT US</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Empowering the Next Generation of{" "}
              <span className="text-gradient">AI Innovators</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              AI Club is a vibrant community dedicated to exploring the frontiers of artificial intelligence. 
              We bring together students, developers, and enthusiasts who share a passion for building 
              intelligent systems that solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Through workshops, hackathons, and collaborative projects, we provide hands-on experience 
              with machine learning, deep learning, natural language processing, and computer vision. 
              Our mission is to demystify AI and make it accessible to everyone.
            </p>

            <div className="space-y-4">
              {[
                "Foster innovation through collaborative learning",
                "Bridge the gap between theory and practical application",
                "Build a network of future AI leaders",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
