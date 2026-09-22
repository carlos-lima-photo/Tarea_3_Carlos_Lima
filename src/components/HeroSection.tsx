import React, { useState, useEffect } from 'react';
import { ArrowRight, Sliders, Activity, ShieldAlert, Cpu, Sparkles, TrendingUp, Layers } from 'lucide-react';

export const HeroSection: React.FC = () => {
  // Simulated real-time streaming values with subtle micro-fluctuations
  const [ippMoM, setIppMoM] = useState(0.45);
  const [processedQuotes, setProcessedQuotes] = useState(142850);
  const [activeAlerts, setActiveAlerts] = useState(14);
  const [rmse, setRmse] = useState(0.142);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live incoming quotes
      setProcessedQuotes((prev) => prev + Math.floor(Math.random() * 3) + 1);
      // Small jitter every few intervals
      if (Math.random() > 0.6) {
        setIppMoM((prev) => {
          const delta = (Math.random() - 0.5) * 0.02;
          return Number((prev + delta).toFixed(2));
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Glow background highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main hero badge */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
          <span>TERMINAL DE INTELIGENCIA DE PRECIOS AL PRODUCTOR (IPP)</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">MACRO DATA SCIENCE ENGINE</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          IPP ANALYTICS & <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00f0ff] to-[#3b82f6] text-glow-green">
            PREDICTIVE AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
          <span className="text-[#00ff88] font-mono font-medium">Ciencia de Datos</span> •{' '}
          <span className="text-[#00f0ff] font-mono font-medium">Modelado Macroeconómico</span> •{' '}
          <span className="text-[#ffb300] font-mono font-medium">Pronóstico Inflacionario de Precios al Productor</span>
        </p>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Explora la captura y agregación de precios mayoristas, la fórmula de Laspeyres/Paasche, detección no supervisada de anomalías con Machine Learning y predicción de propagación hacia el IPC.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#fundamentos"
            id="btn-explore-indices"
            className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#00ff88] to-[#00e676] text-black font-semibold text-sm hover:opacity-95 hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] transition-all font-mono"
          >
            <Activity className="w-4 h-4" />
            Explorar Índices & Metodología
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#playground"
            id="btn-start-simulator"
            className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/5 border border-[#00f0ff]/40 text-[#00f0ff] font-semibold text-sm hover:bg-[#00f0ff]/10 hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all font-mono"
          >
            <Sliders className="w-4 h-4" />
            Iniciar Simulator / Playground
          </a>

          <a
            href="#dashboard"
            id="btn-view-dashboard"
            className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm hover:bg-white/10 transition-all font-mono"
          >
            <Layers className="w-4 h-4 text-[#ffb300]" />
            Dashboard de Mando
          </a>
        </div>
      </div>

      {/* Real-time Simulated KPI Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
        {/* KPI 1: IPP General */}
        <div className="glass-panel p-5 rounded-xl border border-[#00ff88]/30 hover:border-[#00ff88] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ff88]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00ff88]/10 transition-colors" />
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>IPP GENERAL NACIONAL</span>
            <span className="flex items-center gap-1 text-[#00ff88]">
              <TrendingUp className="w-3 h-3" />
              OFICIAL
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-mono font-bold text-white text-glow-green">
              {ippMoM >= 0 ? `+${ippMoM}%` : `${ippMoM}%`}
            </span>
            <span className="text-xs font-mono text-slate-400">Var. Mensual</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-mono border-t border-white/5 pt-2">
            <span className="text-slate-400">Var. Anual (YoY):</span>
            <span className="text-[#00ff88] font-bold">+4.82%</span>
          </div>
        </div>

        {/* KPI 2: Precios procesados */}
        <div className="glass-panel p-5 rounded-xl border border-[#00f0ff]/30 hover:border-[#00f0ff] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00f0ff]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00f0ff]/10 transition-colors" />
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>COTIZACIONES PROCESADAS</span>
            <span className="text-[#00f0ff] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              BATCH t+18
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-mono font-bold text-white text-glow-cyan">
              {processedQuotes.toLocaleString('es-CO')}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-mono border-t border-white/5 pt-2">
            <span className="text-slate-400">Establecimientos:</span>
            <span className="text-[#00f0ff] font-bold">2.840 fuentes</span>
          </div>
        </div>

        {/* KPI 3: Precisión ML */}
        <div className="glass-panel p-5 rounded-xl border border-[#ffb300]/30 hover:border-[#ffb300] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffb300]/5 rounded-bl-full pointer-events-none group-hover:bg-[#ffb300]/10 transition-colors" />
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>PRECISIÓN PRONÓSTICO IA</span>
            <span className="text-[#ffb300] flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              LSTM v3
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <div>
              <span className="text-xs font-mono text-slate-400 block">RMSE</span>
              <span className="text-2xl font-mono font-bold text-white text-glow-amber">{rmse}</span>
            </div>
            <span className="text-slate-600">/</span>
            <div>
              <span className="text-xs font-mono text-slate-400 block">MAPE</span>
              <span className="text-2xl font-mono font-bold text-[#00ff88]">0.98%</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-mono border-t border-white/5 pt-2">
            <span className="text-slate-400">R² Ajustado:</span>
            <span className="text-[#00ff88] font-bold">0.975 (Excelente)</span>
          </div>
        </div>

        {/* KPI 4: Anomalías en cadenas */}
        <div className="glass-panel p-5 rounded-xl border border-rose-500/30 hover:border-rose-500 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-bl-full pointer-events-none group-hover:bg-rose-500/10 transition-colors" />
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>ALERTAS EN CADENAS</span>
            <span className="text-rose-400 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              MONITOREO
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-mono font-bold text-rose-400">
              {activeAlerts}
            </span>
            <span className="text-xs font-mono text-slate-400">Flags activas</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-mono border-t border-white/5 pt-2">
            <span className="text-slate-400">Críticas (Outliers &gt; 35%):</span>
            <span className="text-rose-400 font-bold">3 en campo</span>
          </div>
        </div>
      </div>
    </section>
  );
};
