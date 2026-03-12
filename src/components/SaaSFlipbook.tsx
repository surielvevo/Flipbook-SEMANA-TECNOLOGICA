'use client';
import React, { useState, useEffect, useRef, forwardRef, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Clock, MapPin, User, ChevronLeft, ChevronRight, Calendar, Maximize, Minimize } from 'lucide-react';
import { scheduleData } from '../data/schedule';

const Page = forwardRef<HTMLDivElement, any>(({ children, number, isCover = false }, ref) => (
  <div ref={ref} className={`relative bg-white overflow-hidden flex flex-col h-full ${!isCover ? 'border-r border-gray-200' : ''}`}
    style={{ boxShadow: 'inset -10px 0 40px -10px rgba(0,0,0,0.08), inset 10px 0 40px -10px rgba(0,0,0,0.04)' }}>
    <div className={`flex-grow h-full flex flex-col relative z-10 ${isCover ? '' : 'p-4 md:p-6'}`}>{children}</div>
    {!isCover && (<div className="absolute bottom-2 w-full flex justify-center z-10"><span className="text-[10px] text-[#0033A0] font-bold bg-blue-50 px-3 py-1 rounded-full shadow-sm">Pág. {number}</span></div>)}
  </div>
));
Page.displayName = 'Page';

export default function SaaSFlipbook() {
  const [isMounted, setIsMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const bookRef = useRef<any>(null);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!bookRef.current) return;
      if (e.key === 'ArrowRight') bookRef.current.pageFlip().flipNext();
      if (e.key === 'ArrowLeft') bookRef.current.pageFlip().flipPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err: any) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const nextButtonClick = useCallback(() => { if (bookRef.current) bookRef.current.pageFlip().flipNext(); }, []);
  const prevButtonClick = useCallback(() => { if (bookRef.current) bookRef.current.pageFlip().flipPrev(); }, []);

  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <div ref={containerRef} className={`relative flex flex-col justify-center items-center ${isFullscreen ? 'h-screen w-screen bg-gray-900' : 'min-h-[85vh] bg-gray-50'} transition-colors duration-500 overflow-hidden select-none`}>
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button onClick={toggleFullscreen} className="bg-white/90 backdrop-blur p-2.5 rounded-full shadow-lg text-[#0033A0] hover:bg-[#0033A0] hover:text-white transition-all">
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
      <div className="relative drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)] flex items-center z-10 flipbook-wrapper w-full max-w-6xl justify-center px-4" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
        <button onClick={prevButtonClick} className={`hidden md:flex absolute -left-4 md:-left-16 z-20 ${isFullscreen ? 'bg-gray-800 text-white' : 'bg-white text-[#0033A0]'} p-4 rounded-full shadow-2xl hover:scale-110 transition-all border`}><ChevronLeft size={28} /></button>
        {/* @ts-ignore */}
        <HTMLFlipBook width={550} height={750} size="stretch" minWidth={315} maxWidth={650} minHeight={450} maxHeight={950} maxShadowOpacity={0.7} showCover={true} mobileScrollSupport={true} useMouseEvents={true} flippingTime={1200} swipeDistance={30} ref={bookRef} className="bg-white mx-auto" style={{ backgroundColor: '#ffffff' }}>
          {/* PORTADA FRONT (DERECHA DEL SPREAD) */}
          <Page isCover={true} number="Portada">
            {/* 1. Fondo Absoluto Full-Bleed */}
            <div className="absolute inset-0 bg-[url('/portada-flipbook.png')] bg-[length:200%_100%] bg-right bg-no-repeat z-0"></div>

            {/* 2. Capa de Contenido */}
            <div className="relative z-10 h-full w-full flex flex-col justify-between py-8 px-6">

              {/* TOP: LOGOS */}
              <div className="w-full flex justify-center">
                <img src="/logo-institucional.png" alt="Logos Institucionales" className="w-56 md:w-64 drop-shadow-md" />
              </div>

              {/* CENTER: Espacio libre para la mano robótica (protagonista visual) */}
              <div className="flex-grow"></div>

              {/* BOTTOM: BLOQUE DE TEXTO */}
              <div className="flex flex-col items-center text-center gap-2 mb-2">
                <h1 className="text-4xl md:text-5xl font-black text-[#0033A0] uppercase leading-none drop-shadow-lg">
                  Semana <br /><span className="text-black">Tecnologica</span>
                </h1>
                <p className="text-2xl font-black text-gray-800 tracking-widest">2026</p>
                <span className="text-black font-bold text-sm md:text-base tracking-[0.25em] uppercase opacity-80">
                  Programa de actividades
                </span>
                <div className="mt-2 bg-black/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-blue-500/20 shadow-2xl">
                  <span className="text-white text-[10px] md:text-xs font-black tracking-widest flex items-center gap-2">
                    <Calendar size={14} className="text-[#0033A0]" /> DEL 24 AL 27 DE MARZO
                  </span>
                </div>
              </div>
            </div>
          </Page>
          {scheduleData.map((day, dayIndex) => (
            <Page key={dayIndex} number={dayIndex + 1}>
              <div className="h-full flex flex-col">
                <div className="border-b-4 border-gray-100 pb-2 mb-3"><h2 className="text-xl md:text-2xl font-black text-[#0033A0] uppercase flex items-center"><span className="w-3 h-6 md:h-8 bg-[#FFD100] mr-3 rounded-sm"></span>{day.date}</h2></div>
                <div className="space-y-0 flex-grow relative overflow-hidden flex flex-col justify-around">
                  <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                  {day.events.map((evt, evtIndex) => (
                    <div key={evtIndex} className="relative pl-10 py-1 md:py-1.5 group hover:bg-gray-50 rounded-xl transition-all">
                      <div className="absolute left-[8px] top-2.5 md:top-3 w-3 h-3 rounded-full border-[3px] border-white bg-[#FFD100] shadow-md z-10 group-hover:bg-[#0033A0] transition-all"></div>
                      <div className="flex flex-col">
                        <span className="flex items-center text-[9px] md:text-[10px] font-black text-[#0033A0] bg-blue-50 px-2 py-0.5 rounded w-max mb-0.5"><Clock size={12} className="mr-1.5" /> {evt.time}</span>
                        <h3 className="text-[12px] md:text-[14px] font-bold text-gray-900 leading-tight">{evt.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-[10px] md:text-xs text-gray-600 gap-1 sm:gap-3 mt-0.5">
                          <div className="flex items-center font-medium"><User size={12} className="mr-1 text-[#0033A0]" />{evt.speaker}</div>
                          <div className="hidden sm:block text-gray-300">|</div>
                          <div className="flex items-center font-medium truncate"><MapPin size={12} className="mr-1 text-[#FFD100]" />{evt.room}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Page>
          ))}
          {/* CONTRAPORTADA BACK (IZQUIERDA DEL SPREAD) */}
          <Page isCover={true} number="Fin">
            <div className="absolute inset-0 bg-[url('/portada-flipbook.png')] bg-[length:200%_100%] bg-left bg-no-repeat z-0"></div>
          </Page>
        </HTMLFlipBook>
        <button onClick={nextButtonClick} className={`hidden md:flex absolute -right-4 md:-right-16 z-20 ${isFullscreen ? 'bg-gray-800 text-white' : 'bg-white text-[#0033A0]'} p-4 rounded-full shadow-2xl hover:scale-110 transition-all border`}><ChevronRight size={28} /></button>
      </div>
    </div>
  );
}
