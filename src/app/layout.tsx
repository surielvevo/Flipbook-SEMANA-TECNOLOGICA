import './globals.css'
export const metadata = {
  title: 'Programa Semana Tecnologica 2026',
  description: 'Programa interactivo de la Facultad de Ingeniería y Arquitectura',
  icons: { icon: '/favicon.png' }
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{margin:0}}>{children}</body>
    </html>
  );
}