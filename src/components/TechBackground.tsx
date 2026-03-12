'use client';
import { motion } from 'framer-motion';

export default function TechBackground() {
  const bubbles = Array.from({ length: 12 });
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#f8fafc]">
      {bubbles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#0033A0]/5 blur-3xl"
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 40, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
