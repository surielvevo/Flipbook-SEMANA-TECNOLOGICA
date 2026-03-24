'use client';
import { motion } from 'framer-motion';

export default function TechBackground() {
  // Fixed positions to avoid Math.random() on every render and reduce GPU work
  const bubbles = [
    { w: 420, h: 380, l: '10%', t: '5%',  dur: 28 },
    { w: 300, h: 320, l: '65%', t: '15%', dur: 34 },
    { w: 360, h: 300, l: '30%', t: '60%', dur: 30 },
    { w: 250, h: 280, l: '75%', t: '65%', dur: 36 },
  ];
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#f8fafc]">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#0033A0]/5 blur-2xl"
          style={{
            width: b.w, height: b.h,
            left: b.l, top: b.t,
            willChange: 'transform, opacity',
          }}
          animate={{ y: [0, -50, 0], x: [0, 25, 0], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
