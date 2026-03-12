'use client';
import React, { useState, useEffect, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';
import { Clock, MapPin, User, Calendar } from 'lucide-react';
import { scheduleData } from '../data/schedule';

const Page = forwardRef<HTMLDivElement, any>(({ children, number, isCover = false }, ref) => (
  <div ref={ref} className="relative bg-white overflow-hidden flex flex-col h-full shadow-inner border-l border-gray-100">
    <div className={`flex-grow h-full flex flex-col relative z-10 ${isCover ? '' : 'p-6'}`}>{children}</div>
    {!isCover && (<div className="absolute bottom-2 w-full text-center z-10 text-[10px] font-bold text-[#0033A0]">Pág. {number}</div>)}
  </div>
));
Page.displayName = 'Page';

export default function SaaSFlipbook() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center py-10 min-h-[85vh] relative z-10 w-full overflow-hidden">
      <div className="w-full max-w-screen-md mx-auto flex justify-center items-center">
        {/* @ts-ignore */}
        <HTMLFlipBook 
          width={550} 
          height={750} 
          size="stretch" 
          minWidth={315} 
          maxWidth={550} 
          minHeight={400} 
          maxHeight={750} 
          maxShadowOpacity={0.7}
          showCover={true} 
          useMouseEvents={true}
          mobileScrollSupport={true}
          className="shadow-2xl mx-auto"
        >
          {/* PORTADA FRONT */}
          <Page isCover={true} number="Portada">
            <div className="absolute inset-0 bg-[url('/portada-flipbook.png')] bg-cover bg-center bg-no-repeat z-0"></div>
            <div className="relative z-10 h-full flex flex-col justify-between items-center text-center p-8 bg-white/10 backdrop-blur-[2px]">
              <img src="/logo-institucional.png" alt="Logo FIA" className="w-56 mt-6 drop-shadow-2xl object-contain" />
              <div className="flex-grow"></div>
              <div className="flex flex-col items-center gap-2 mb-8 w-[85%] max-w-[320px] mx-auto bg-white/80 p-6 rounded-3xl shadow-xl border border-white">
                <span className="text-black font-bold text-sm tracking-[0.2em] uppercase opacity-80">Programa de actividades</span>
                <h1 className="text-4xl font-black text-[#0033A0] leading-none uppercase">Semana<br/><span className="text-black">Tecnología</span></h1>
                <p className="text-xl font-black text-gray-800 tracking-widest mt-1">2026</p>
                <div className="mt-4 bg-black/90 px-5 py-2.5 rounded-full border border-blue-500/30 shadow-2xl">
                  <span className="text-white text-[9px] font-bold tracking-widest flex items-center gap-2">
                    <Calendar size={14} className="text-[#0033A0]" /> DEL 24 AL 27 DE MARZO
                  </span>
                </div>
              </div>
            </div>
          </Page>

          {/* PÁGINAS DEL PROGRAMA */}
          {scheduleData.map((day, i) => (
            <Page key={i} number={i + 1}>
              <div className="h-full flex flex-col text-slate-900">
                <div className="border-b-4 border-[#FFD100] pb-2 mb-4"><h2 className="text-xl font-black text-[#0033A0] uppercase">{day.date}</h2></div>
                <div className="flex-grow flex flex-col justify-around">
                  {day.events.map((e, j) => (
                    <div key={j} className="relative pl-4 py-1 border-l-2 border-slate-100">
                      <span className="flex items-center text-[9px] font-black text-[#0033A0] uppercase"><Clock size={10} className="mr-1" /> {e.time}</span>
                      <h3 className="text-[12px] font-bold text-slate-900 leading-tight">{e.title}</h3>
                      <div className="flex items-center text-[10px] text-gray-500 gap-2 truncate">
                         <span className="flex items-center gap-1"><User size={10} /> {e.speaker}</span>
                         <span className="flex items-center gap-1"><MapPin size={10} /> {e.room}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Page>
          ))}

          {/* CONTRAPORTADA BACK */}
          <Page isCover={true} number="Fin">
            <div className="absolute inset-0 bg-[url('/portada-flipbook.png')] bg-[length:200%_100%] bg-left bg-no-repeat z-0"></div>
          </Page>
        </HTMLFlipBook>
      </div>
    </div>
  );
}