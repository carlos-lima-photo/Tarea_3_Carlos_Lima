import React from 'react';
import { ShieldCheck, Lock, Eye, Scale, FileCode2, Award } from 'lucide-react';

export const GovernanceSection: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'Transparencia Metodológica',
      desc: 'Publicación íntegra de los manuales metodológicos, ponderaciones de la matriz de insumo-producto y algoritmos de agregación. Cualquier economista o ciudadano debe poder auditar y replicar los cálculos.',
      accent: '#00ff88'
    },
    {
      icon: Scale,
      title: 'Control del Sesgo por Sustitución',
      desc: 'Actualización periódica de la canasta y uso de fórmulas superlativas (Fisher/Törnqvist) o índices encadenados de Laspeyres para evitar la sobreestimación cuando las empresas cambian sus insumos ante alzas de precios.',
      accent: '#00f0ff'
    },
    {
      icon: Lock,
      title: 'Secreto Estadístico & Confidencialidad',
      desc: 'Los precios reportados por cada fábrica o empresa informante están protegidos por ley. Los datos se publican exclusivamente de forma agregada (mínimo 3 empresas por subclase) con anonimización criptográfica para evitar espionaje comercial.',
      accent: '#ffb300'
    },
    {
      icon: Award,
      title: 'Independencia Institucional',
      desc: 'Autonomía técnica frente a presiones gubernamentales o políticas de corto plazo. Calendario de publicación preestablecido con un año de anticipación a las 09:00 AM para evitar filtraciones o manipulación bursátil.',
      accent: '#a855f7'
    }
  ];

  return (
    <section id="gobernanza" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-mono mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>MÓDULO 11 • GOBERNANZA DE DATOS, ÉTICA & INTEGRIDAD</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Ética, Calidad del Dato & <span className="text-[#00ff88]">Gobernanza Estadística</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mt-2 text-sm sm:text-base">
          La confianza en el sistema financiero depende de la neutralidad e invulnerabilidad matemática de las estadísticas oficiales. Principios Fundamentales de las Estadísticas Oficiales de la ONU.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{ borderColor: `${p.accent}40`, backgroundColor: `${p.accent}10` }}
                >
                  <Icon className="w-6 h-6" style={{ color: p.accent }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00ff88] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
