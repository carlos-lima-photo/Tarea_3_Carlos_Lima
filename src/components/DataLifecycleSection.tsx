import React, { useState } from 'react';
import { PIPELINE_STAGES } from '../data/macroData';
import { Network, Database, Sparkles, Sliders, CheckCircle2, ChevronRight, Terminal, ShieldCheck } from 'lucide-react';

export const DataLifecycleSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(PIPELINE_STAGES[0]);

  return (
    <section id="ciclo-vida" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono mb-3">
          <Network className="w-3.5 h-3.5" />
          <span>MÓDULO 03 • PIPELINE DE INGENIERÍA Y CIENCIA DE DATOS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Ciclo de Vida de los Datos del <span className="text-[#00f0ff]">Índice de Precios al Productor</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mt-2 text-sm sm:text-base">
          Desde la captura en boca de fábrica hasta la fijación de tasas por la Junta Directiva del Banco Central: cómo viajan, se depuran y se ponderan más de 140.000 cotizaciones mensuales.
        </p>
      </div>

      {/* Interactive SVG Flow Diagram */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 mb-8 overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="flex items-center justify-between relative mb-6">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00ff88] via-[#00f0ff] to-[#3b82f6] -translate-y-1/2 z-0 opacity-40" />

            {PIPELINE_STAGES.map((stage) => {
              const isSelected = selectedStep.id === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStep(stage)}
                  className="relative z-10 flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-all border ${
                      isSelected
                        ? 'bg-[#00ff88] text-black border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.6)] scale-110'
                        : 'bg-[#0a0e14] text-slate-300 border-white/20 group-hover:border-[#00f0ff] group-hover:text-white'
                    }`}
                  >
                    0{stage.stepNumber}
                  </div>
                  <span
                    className={`mt-3 text-[11px] font-mono tracking-wide max-w-[100px] text-center transition-colors ${
                      isSelected ? 'text-[#00ff88] font-bold' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {stage.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Step Deep Dive Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00f0ff]/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] mb-1">
              <span>PASO 0{selectedStep.stepNumber} DE 06</span>
              <span>•</span>
              <span className="uppercase">{selectedStep.category}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">{selectedStep.name}</h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0e14] border border-white/10 font-mono text-xs">
            <span className="text-slate-400">Stack Tecnológico:</span>
            <span className="text-[#00ff88] font-semibold">{selectedStep.techTool}</span>
          </div>
        </div>

        {/* Methodology details */}
        <div className="mb-6">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Metodología y Algoritmos Aplicados:</h4>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-[#0a0e14]/60 p-4 rounded-xl border border-white/5">
            {selectedStep.methodology}
          </p>
        </div>

        {/* Inputs, Outputs & SLA Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* Inputs */}
          <div className="p-4 rounded-xl bg-[#0a0e14] border border-white/5">
            <span className="text-slate-400 block mb-2 font-bold text-[10px] text-[#00f0ff]">
              INPUTS (ENTRADAS DE DATOS):
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {selectedStep.inputs.map((inp, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#00f0ff]" />
                  {inp}
                </li>
              ))}
            </ul>
          </div>

          {/* Outputs */}
          <div className="p-4 rounded-xl bg-[#0a0e14] border border-white/5">
            <span className="text-slate-400 block mb-2 font-bold text-[10px] text-[#00ff88]">
              OUTPUTS (PRODUCTOS GENERADOS):
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {selectedStep.outputs.map((out, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#00ff88]" />
                  {out}
                </li>
              ))}
            </ul>
          </div>

          {/* Quality SLA */}
          <div className="p-4 rounded-xl bg-[#0a0e14] border border-[#ffb300]/20 glow-amber">
            <span className="text-slate-400 block mb-2 font-bold text-[10px] text-[#ffb300] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              SLA DE CALIDAD Y CONFIANZA:
            </span>
            <p className="text-slate-200 leading-relaxed text-xs">
              {selectedStep.slaQuality}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
