import React from 'react';
import { Activity, ShieldCheck, Terminal, Heart, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070a0e] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand info */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Activity className="w-4 h-4 text-[#00ff88]" />
            <span className="font-bold text-white tracking-wider">
              IPP ANALYTICS TERMINAL <span className="text-[#00ff88]">AI v4.2</span>
            </span>
          </div>
          <p className="text-slate-500 max-w-md font-sans">
            Plataforma interactiva de analítica macroeconómica, ciencia de datos y aprendizaje automático para la modelación de Índices de Precios al Productor.
          </p>
        </div>

        {/* Technical stack & year */}
        <div className="text-center md:text-right space-y-1">
          <div>
            <span>Desarrollado con </span>
            <span className="text-[#00ff88] font-bold">HTML5 • CSS3 • Canvas 2D • SVG • TypeScript • Deep Learning</span>
          </div>
          <div className="text-slate-500">
            Autor / Lead Architect: <span className="text-white font-medium">Carlos Mauricio Lima</span> • Año 2026
          </div>
          <div className="text-[11px] text-slate-600">
            Aviso: Datos y series temporales simulados dinámicamente con fines educativos y de investigación econométrica.
          </div>
        </div>
      </div>
    </footer>
  );
};
