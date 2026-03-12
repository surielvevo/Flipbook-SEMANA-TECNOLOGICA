'use client';
import React, { useState, useEffect, forwardRef } from 'react';
import Image from 'next/image';
import HTMLFlipBook from 'react-pageflip';
import { Clock, MapPin, User, Calendar } from 'lucide-react';
import { scheduleData } from '../data/schedule';

const Page = forwardRef<HTMLDivElement, any>(({ children, number, isCover = false }, ref) => (
  <div ref={ref} className="relative bg-white overflow-hidden flex flex-col h-full shadow-inner border-l border-gray-100">
    <div className={`flex-grow h-full flex flex-col relative z-10 ${isCover ? '' : 'pt-6 px-6 pb-12 overflow-hidden'}`}>{children}</div>
    {!isCover && (
      <div className="absolute bottom-0 w-full text-center z-20 text-[10px] font-bold text-[#0033A0] bg-gradient-to-t from-white via-white to-transparent pt-6 pb-3">
        Pág. {number}
      </div>
    )}
  </div>
));
Page.displayName = 'Page';

export default function SaaSFlipbook() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center py-6 px-4 min-h-[85vh] relative z-10 overflow-hidden">
      <div className="w-full max-w-[550px] mx-auto flex justify-center items-center">
        {/* @ts-ignore */}
        <HTMLFlipBook 
          width={550} 
          height={750} 
          size="stretch" 
          minWidth={280} 
          maxWidth={550} 
          minHeight={380} 
          maxHeight={750} 
          maxShadowOpacity={0.5} 
          showCover={true} 
          mobileScrollSupport={true} 
          className="shadow-2xl mx-auto"
        >
          
          {/* PORTADA FRONT: MÁRGENES PREMIUM */}
          <Page isCover={true} number="Portada">
            <div className="absolute inset-0 bg-[url('/portada-flipbook.png')] bg-cover bg-center bg-no-repeat z-0"></div>
            
            {/* py-8 asegura separación vertical perfecta del borde de la pantalla */}
            <div className="relative z-10 h-full flex flex-col justify-between items-center text-center py-8">
              
              {/* Logos con ancho controlado para alinearse con la tarjeta */}
              <div className="w-[85%] max-w-[260px] flex justify-center">
                <img src="/logo-institucional.png" alt="Logo Institucional" className="w-full drop-shadow-md object-contain" />
              </div>
              
              <div className="flex-grow"></div>
              
              {/* Tarjeta Sólida con Padding Interno (px-8 py-7) para que el texto respire */}
              <div className="bg-white px-8 py-7 rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.15)] w-[85%] max-w-[320px] mx-auto flex flex-col items-center gap-1.5 border border-gray-100">
                <span className="text-black font-extrabold text-[9px] tracking-[0.2em] uppercase">Programa de actividades</span>
                
                {/* Título más compacto y centrado */}
                <h1 className="text-[2.5rem] font-black text-[#0033A0] leading-none uppercase mt-1">Semana<br/><span className="text-black">Tecnología</span></h1>
                <p className="text-2xl font-black text-gray-800 tracking-[0.15em] mt-1 mb-4">2026</p>
                
                {/* Botón negro con proporciones correctas */}
                <div className="bg-[#111] px-5 py-3 rounded-full shadow-md w-full max-w-[210px]">
                  <span className="text-white text-[9px] font-bold tracking-[0.12em] flex items-center justify-center gap-2">
                    <Calendar size={12} className="text-[#0033A0]" /> DEL 24 AL 27 DE MARZO
                  </span>
                </div>
              </div>

            </div>
          </Page>

          {/* PÁGINAS DEL PROGRAMA */}
          {scheduleData.map((day, i) => (
            <Page key={i} number={i + 1}>
              <div className="h-full flex flex-col text-slate-900 overflow-hidden">
                <div className="border-b-4 border-[#FFD100] pb-2 mb-3 shrink-0">
                  <h2 className="text-lg md:text-xl font-black text-[#0033A0] uppercase">{day.date}</h2>
                </div>
                <div className="flex-grow flex flex-col justify-start gap-3.5 overflow-y-auto pr-2 pb-2" style={{ scrollbarWidth: 'none' }}>
                  {day.events.map((e, j) => (
                    <div key={j} className="relative pl-3 md:pl-4 py-1 border-l-2 border-slate-200 shrink-0">
                      <span className="flex items-center text-[8px] md:text-[9px] font-black text-[#0033A0] uppercase"><Clock size={10} className="mr-1" /> {e.time}</span>
                      <h3 className="text-[11px] md:text-[12px] font-bold text-slate-900 leading-tight mt-0.5">{e.title}</h3>
                      <div className="flex items-center text-[9px] md:text-[10px] text-gray-500 gap-2 truncate mt-1">
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
            <div className="absolute inset-0 bg-[url('/portada-flipbook.png')] bg-cover bg-left bg-no-repeat z-0"></div>
          </Page>

        </HTMLFlipBook>
      </div>
    </div>
  );
}