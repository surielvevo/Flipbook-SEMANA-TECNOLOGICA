'use client';
import React, { useState, useEffect, useRef, forwardRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import { Clock, MapPin, User, Calendar } from 'lucide-react';
import { scheduleData } from '../data/schedule';

const Page = forwardRef<HTMLDivElement, any>(({ children, number, isCover = false }, ref) => (
  <div ref={ref} className="relative bg-white overflow-hidden flex flex-col h-full shadow-inner border-l border-gray-100">
    <div className={`flex-grow flex flex-col relative z-10 ${isCover ? '' : 'pt-4 px-3 pb-9 overflow-hidden'}`}>{children}</div>
    {!isCover && (
      <div className="absolute bottom-0 w-full text-center z-20 text-[10px] font-bold text-[#0033A0] bg-gradient-to-t from-white via-white to-transparent pt-4 pb-2 pointer-events-none">
        Pág. {number}
      </div>
    )}
  </div>
));
Page.displayName = 'Page';

// Pre-compute chunks outside component to keep JSX clean
const pageChunks = scheduleData.flatMap((day) => {
  const chunks: { date: string; events: typeof day.events; isFirst: boolean }[] = [];
  for (let i = 0; i < day.events.length; i += 4) {
    chunks.push({ date: day.date, events: day.events.slice(i, i + 4), isFirst: i === 0 });
  }
  return chunks;
});
const TOTAL_PAGES = 1 + pageChunks.length; // cover + program pages

export default function SaaSFlipbook() {
  const [mounted, setMounted] = useState(false);
  const [dims, setDims] = useState({ w: 720, h: Math.round(720 * 750 / 550) });
  const [currentPage, setCurrentPage] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const flipRef = useRef<any>(null);

  const handleFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
    setShowHint(false);
  }, []);

  useEffect(() => {
    setMounted(true);

    const calc = () => {
      const pad = 32;
      const vw = window.innerWidth;
      const maxW = vw >= 1024 ? 720 : vw >= 768 ? 600 : 550;
      const w = Math.min(vw - pad, maxW);
      setDims({ w, h: Math.round(w * (750 / 550)) });
    };
    calc();
    window.addEventListener('resize', calc);

    // Auto-hide swipe hint after 4 seconds
    const hintTimer = setTimeout(() => setShowHint(false), 4000);

    return () => {
      window.removeEventListener('resize', calc);
      clearTimeout(hintTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="flex flex-col justify-center items-center py-4 md:py-6 px-4 min-h-[85vh] relative z-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >

      {/* Flipbook with JS-computed exact dimensions */}
      <div style={{ width: dims.w, height: dims.h, willChange: 'transform', transform: 'translateZ(0)' }} className="mx-auto relative shadow-2xl rounded-sm">

        {/* Swipe hint — fades after first interaction or 4 s */}
        {showHint && (
          <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none z-30">
            <div className="bg-black/60 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse">
              ◀ Desliza para navegar ▶
            </div>
          </div>
        )}

        {/* @ts-ignore */}
        <HTMLFlipBook
          ref={flipRef}
          width={dims.w} height={dims.h} size="fixed"
          minWidth={dims.w} maxWidth={dims.w} minHeight={dims.h} maxHeight={dims.h}
          maxShadowOpacity={0.2} showCover={true} mobileScrollSupport={true} usePortrait={true}
          flippingTime={400} drawShadow={false}
          onFlip={handleFlip}
          className="mx-auto"
        >

          {/* PORTADA */}
          <Page isCover={true} number="Portada">
            <div className="absolute inset-0 bg-[url('/portada-flipbook.png')] bg-cover bg-center bg-no-repeat z-0"></div>
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#001a5e]/90 via-[#001a5e]/30 to-transparent z-[1]"></div>
            <div className="relative z-10 h-full flex flex-col justify-between items-center text-center py-6 px-4">
              {/* Logo top */}
              <div className="w-[75%] max-w-[220px] flex justify-center mt-3 drop-shadow-xl">
                <img src="/logo-institucional.png" alt="Logo Institucional" className="w-full object-contain" />
              </div>
              {/* Text bottom */}
              <div className="flex flex-col items-center gap-2 mb-5">
                <span className="text-white/75 font-bold text-[8px] tracking-[0.25em] uppercase">Programa de actividades</span>
                <h1 className="text-[2.2rem] md:text-[2.8rem] font-black leading-[1.05] uppercase drop-shadow-lg">
                  <span className="text-white">Semana</span><br />
                  <span className="text-[#FFD100]">Tecnológica</span>
                </h1>
                <p className="text-white text-2xl font-black tracking-[0.2em] drop-shadow-lg">2026</p>
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full mt-1">
                  <Calendar size={11} className="text-[#FFD100] shrink-0" />
                  <span className="text-white text-[9px] font-bold tracking-[0.12em]">DEL 24 AL 27 DE MARZO</span>
                </div>
              </div>
            </div>
          </Page>

          {/* PÁGINAS DEL PROGRAMA */}
          {pageChunks.map((page, i) => (
            <Page key={i} number={i + 1}>
              <div className="h-full flex flex-col text-slate-900 overflow-hidden">
                <div className="border-b-4 border-[#FFD100] pb-1 mb-2 shrink-0">
                  <h2 className="text-sm md:text-base font-black text-[#0033A0] uppercase">
                    {page.date}{!page.isFirst && <span className="text-[9px] font-semibold text-gray-400 ml-2 normal-case">(continuación)</span>}
                  </h2>
                </div>
                <div className="flex-grow flex flex-col justify-start gap-2 overflow-hidden pr-1 pb-1">
                  {page.events.map((e, j) => (
                    <div key={j} className="relative pl-3 py-1 border-l-2 border-slate-200 shrink-0">
                      <span className="inline-flex items-center bg-[#0033A0]/10 text-[#0033A0] text-[8px] font-black px-1.5 py-0.5 rounded-full mb-0.5">
                        <Clock size={8} className="mr-0.5" /> {e.time}
                      </span>
                      <h3 className="text-[11px] font-bold text-slate-900 leading-snug">{e.title}</h3>
                      <div className="flex flex-wrap items-center text-[9px] text-gray-500 gap-x-2 gap-y-0.5 mt-0.5">
                        <span className="flex items-center gap-1"><User size={8} /> {e.speaker}</span>
                        <span className="flex items-center gap-1"><MapPin size={8} /> {e.room}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Page>
          ))}

        </HTMLFlipBook>
      </div>

      {/* Page progress dots */}
      <div className="flex justify-center items-center gap-1.5 mt-4">
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <button
            key={i}
            onClick={() => flipRef.current?.pageFlip().flip(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentPage ? 'w-4 h-2 bg-[#0033A0]' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir a página ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
