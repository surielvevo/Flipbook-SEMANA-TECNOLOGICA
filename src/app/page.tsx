'use client';
import dynamic from 'next/dynamic';

const Flipbook = dynamic(() => import('@/components/SaaSFlipbook'), { ssr: false });
const DownloadBtn = dynamic(() => import('@/components/DownloadButton'), { ssr: false });
const WhatsAppBtn = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });
const TechBackground = dynamic(() => import('@/components/TechBackground'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <TechBackground />
      <header className="relative z-10 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4 flex justify-between items-center shadow-sm">
        <div className="font-black text-[#0033A0] tracking-widest text-lg">SEMANA TECNOLOGICA 2026</div>
        <div className="flex items-center gap-2">
          <WhatsAppBtn />
          <DownloadBtn />
        </div>
      </header>
      <div className="relative z-10 flex-grow">
        <Flipbook />
      </div>
    </main>
  );
}