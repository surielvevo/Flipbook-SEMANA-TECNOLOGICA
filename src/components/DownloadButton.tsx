'use client';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ProgramPDF } from './ProgramPDF';
import { Download } from 'lucide-react';

export default function DownloadButton() {
  return (
    <PDFDownloadLink document={<ProgramPDF />} fileName="Semana_Tecnologica_FIA_2026.pdf">
      {({ loading }: any) => (
        <button disabled={loading} className="bg-[#0033A0] text-white px-5 py-2.5 rounded shadow-lg font-bold text-sm uppercase hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center gap-2">
          <Download size={18} /> {loading ? 'Compilando...' : 'Descargar PDF Oficial'}
        </button>
      )}
    </PDFDownloadLink>
  );
}