import { motion } from "framer-motion";

const RobotAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.svg
        viewBox="0 0 200 250"
        className="w-64 h-80 md:w-80 md:h-96 relative z-10"
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Antenna */}
        <motion.circle
          cx="100"
          cy="15"
          r="8"
          className="fill-primary"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <line x1="100" y1="23" x2="100" y2="45" className="stroke-primary stroke-2" />
        
        {/* Head */}
        <rect x="55" y="45" width="90" height="70" rx="15" className="fill-muted stroke-primary/50 stroke-2" />
        
        {/* Eyes */}
        <motion.circle
          cx="80"
          cy="80"
          r="12"
          className="fill-primary"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="120"
          cy="80"
          r="12"
          className="fill-primary"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
        
        {/* Eye inner */}
        <circle cx="80" cy="80" r="5" className="fill-background" />
        <circle cx="120" cy="80" r="5" className="fill-background" />
        
        {/* Mouth */}
        <rect x="75" y="100" width="50" height="5" rx="2" className="fill-primary/70" />
        
        {/* Neck */}
        <rect x="90" y="115" width="20" height="15" className="fill-muted" />
        
        {/* Body */}
        <rect x="45" y="130" width="110" height="80" rx="10" className="fill-muted stroke-primary/50 stroke-2" />
        
        {/* Chest light */}
        <motion.circle
          cx="100"
          cy="165"
          r="15"
          className="fill-secondary"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="100" cy="165" r="8" className="fill-background" />
        
        {/* Arms */}
        <motion.rect
          x="20"
          y="140"
          width="20"
          height="50"
          rx="8"
          className="fill-muted stroke-primary/30 stroke-2"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "30px 140px" }}
        />
        <motion.rect
          x="160"
          y="140"
          width="20"
          height="50"
          rx="8"
          className="fill-muted stroke-primary/30 stroke-2"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "170px 140px" }}
        />
        
        {/* Legs */}
        <rect x="60" y="210" width="25" height="35" rx="5" className="fill-muted stroke-primary/30 stroke-2" />
        <rect x="115" y="210" width="25" height="35" rx="5" className="fill-muted stroke-primary/30 stroke-2" />
      </motion.svg>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/60"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default RobotAnimation;
