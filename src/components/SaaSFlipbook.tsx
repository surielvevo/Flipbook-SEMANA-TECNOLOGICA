'use client';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
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
  const [dims, setDims] = useState({ w: 550, h: 750 });
  const [currentPage, setCurrentPage] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const flipRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);

    const calc = () => {
      const pad = 32; // 16px each side
      const w = Math.min(window.innerWidth - pad, 550);
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

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
    setShowHint(false);
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 md:py-6 px-4 min-h-[85vh] relative z-10">

      {/* Flipbook with JS-computed exact dimensions */}
      <div style={{ width: dims.w, height: dims.h }} className="mx-auto relative shadow-2xl rounded-sm">

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
          maxShadowOpacity={0.4} showCover={true} mobileScrollSupport={true} usePortrait={true}
          onFlip={handleFlip}
          className="mx-auto"
        >

          {/* PORTADA */}
          <Page isCover={true} number="Portada">
            <div className="absolute inset-0 bg-[url('/portada-flipbook.png')] bg-cover bg-center bg-no-repeat z-0"></div>
            <div className="relative z-10 h-full flex flex-col justify-between items-center text-center py-8">
              <div className="w-[85%] max-w-[260px] flex justify-center mt-2">
                <img src="/logo-institucional.png" alt="Logo Institucional" className="w-full drop-shadow-md object-contain" />
              </div>
              <div className="flex-grow"></div>
              <div className="bg-white px-6 md:px-8 py-5 md:py-7 rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.15)] w-[90%] max-w-[320px] mx-auto flex flex-col items-center gap-1.5 border border-gray-100 mb-2">
                <span className="text-black font-extrabold text-[8px] md:text-[9px] tracking-[0.2em] uppercase">Programa de actividades</span>
                <h1 className="text-3xl md:text-[2.5rem] font-black text-[#0033A0] leading-none uppercase mt-1">Semana<br /><span className="text-black">Tecnológica</span></h1>
                <p className="text-xl md:text-2xl font-black text-gray-800 tracking-[0.15em] mt-1 mb-4">2026</p>
                <div className="bg-[#111] px-4 md:px-5 py-3 rounded-full shadow-md w-full max-w-[210px]">
                  <span className="text-white text-[8px] md:text-[9px] font-bold tracking-[0.12em] flex items-center justify-center gap-2">
                    <Calendar size={12} className="text-[#FFD100]" /> DEL 24 AL 27 DE MARZO
                  </span>
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
    </div>
  );
}
