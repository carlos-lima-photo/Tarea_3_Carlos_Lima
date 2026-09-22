import React, { useState } from 'react';
import { SECTORS } from '../data/macroData';
import { BookOpen, Calculator, Layers, HelpCircle, ArrowRightLeft, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const FundamentosSection: React.FC = () => {
  // Interactive mini calculator for Laspeyres, Paasche, Fisher
  const [p0_wheat, setP0Wheat] = useState(10);
  const [pt_wheat, setPtWheat] = useState(14);
  const [q0_wheat, setQ0Wheat] = useState(100);
  const [qt_wheat, setQtWheat] = useState(85);

  const [p0_steel, setP0Steel] = useState(50);
  const [pt_steel, setPtSteel] = useState(58);
  const [q0_steel, setQ0Steel] = useState(40);
  const [qt_steel, setQtSteel] = useState(38);

  // Laspeyres: sum(pt * q0) / sum(p0 * q0) * 100
  const numLaspeyres = pt_wheat * q0_wheat + pt_steel * q0_steel;
  const denLaspeyres = p0_wheat * q0_wheat + p0_steel * q0_steel;
  const laspeyresIndex = Number(((numLaspeyres / (denLaspeyres || 1)) * 100).toFixed(2));

  // Paasche: sum(pt * qt) / sum(p0 * qt) * 100
  const numPaasche = pt_wheat * qt_wheat + pt_steel * qt_steel;
  const denPaasche = p0_wheat * qt_wheat + p0_steel * qt_steel;
  const paascheIndex = Number(((numPaasche / (denPaasche || 1)) * 100).toFixed(2));

  // Fisher: sqrt(Laspeyres * Paasche)
  const fisherIndex = Number(Math.sqrt(laspeyresIndex * paascheIndex).toFixed(2));

  const [selectedSector, setSelectedSector] = useState(SECTORS[2]); // Default Manufacturing

  return (
    <section id="fundamentos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>MÓDULO 01 • TEORÍA ECONÓMICA Y ARQUITECTURA DE DATOS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Fundamentos del IPP & <span className="text-[#00f0ff]">Metodología Estadística</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mt-2 text-sm sm:text-base">
          El Índice de Precios al Productor (IPP) mide la variación promedio de los precios de venta recibidos por los productores nacionales por su producción primaria e intermedia, antes de márgenes comerciales e impuestos al consumo.
        </p>
      </div>

      {/* Difference IPP vs IPC comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="glass-panel p-6 rounded-xl border border-[#00ff88]/30 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-semibold">
              IPP • PRECIOS AL PRODUCTOR (PPI)
            </span>
            <span className="text-xs font-mono text-slate-400">FASE INICIAL</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Precios en Puerta de Fábrica o Finca (FOB)</h3>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <span><strong>Ámbito:</strong> Mide la primera transacción comercial en el mercado doméstico o de exportación.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <span><strong>Composición de Precio:</strong> No incluye fletes de distribución minorista, márgenes de comercialización ni IVA.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <span><strong>Propiedad Macroeconómica:</strong> Es un <strong>indicador adelantado (Leading Indicator)</strong> de la inflación al consumidor por un desfase de 1 a 3 meses.</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-[#00f0ff]/30 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-semibold">
              IPC • PRECIOS AL CONSUMIDOR (CPI)
            </span>
            <span className="text-xs font-mono text-slate-400">FASE TERMINAL</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Precios Finales en Mostrador y Canasta Familiar</h3>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
              <span><strong>Ámbito:</strong> Mide el costo monetario que pagan los hogares por una canasta fija de bienes y servicios.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
              <span><strong>Composición de Precio:</strong> Incluye costos logísticos, intermediación comercial, subsidios e impuestos indirectos (IVA/Aranceles).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
              <span><strong>Propiedad Macroeconómica:</strong> Es el objetivo formal de la meta de inflación de los Bancos Centrales (Targeting).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Didactic Formulas: Laspeyres, Paasche, Fisher */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 text-[#00ff88]" />
          <div>
            <h3 className="text-xl font-bold text-white">Laboratorio Interactivo de Fórmulas del Índice</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Modifica los precios y cantidades para observar en tiempo real la discrepancia y el sesgo de sustitución entre Laspeyres, Paasche y Fisher.
            </p>
          </div>
        </div>

        {/* Input sliders for 2 sample goods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#0a0e14] p-5 rounded-xl border border-white/5 mb-6">
          {/* Bien 1: Trigo / Cereal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
                BIEN A: Trigo / Insumo Agrícola (kg)
              </span>
              <span className="text-xs font-mono text-[#00ff88]">p0=${p0_wheat} → pt=${pt_wheat}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Precio Base (p0): ${p0_wheat}</label>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={p0_wheat}
                  onChange={(e) => setP0Wheat(Number(e.target.value))}
                  className="w-full accent-[#00ff88]"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Precio Actual (pt): ${pt_wheat}</label>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={pt_wheat}
                  onChange={(e) => setPtWheat(Number(e.target.value))}
                  className="w-full accent-[#00ff88]"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Cant. Base (q0): {q0_wheat}u</label>
                <input
                  type="range"
                  min="40"
                  max="150"
                  value={q0_wheat}
                  onChange={(e) => setQ0Wheat(Number(e.target.value))}
                  className="w-full accent-[#00ff88]"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Cant. Actual (qt): {qt_wheat}u</label>
                <input
                  type="range"
                  min="30"
                  max="150"
                  value={qt_wheat}
                  onChange={(e) => setQtWheat(Number(e.target.value))}
                  className="w-full accent-[#00ff88]"
                />
              </div>
            </div>
          </div>

          {/* Bien 2: Acero / Siderurgia */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                BIEN B: Acero Laminado / Metal (kg)
              </span>
              <span className="text-xs font-mono text-[#00f0ff]">p0=${p0_steel} → pt=${pt_steel}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Precio Base (p0): ${p0_steel}</label>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={p0_steel}
                  onChange={(e) => setP0Steel(Number(e.target.value))}
                  className="w-full accent-[#00f0ff]"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Precio Actual (pt): ${pt_steel}</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={pt_steel}
                  onChange={(e) => setPtSteel(Number(e.target.value))}
                  className="w-full accent-[#00f0ff]"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Cant. Base (q0): {q0_steel}u</label>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={q0_steel}
                  onChange={(e) => setQ0Steel(Number(e.target.value))}
                  className="w-full accent-[#00f0ff]"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Cant. Actual (qt): {qt_steel}u</label>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={qt_steel}
                  onChange={(e) => setQtSteel(Number(e.target.value))}
                  className="w-full accent-[#00f0ff]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real-time calculated formula cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          {/* Laspeyres */}
          <div className="p-4 rounded-xl bg-[#0a0e14] border border-[#00ff88]/40 glow-green">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>ÍNDICE DE LASPEYRES (IL)</span>
              <span className="text-[#00ff88] text-[10px] uppercase font-bold">Base Fija</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{laspeyresIndex} pts</div>
            <div className="text-[11px] text-slate-400 bg-white/5 p-2 rounded mb-2">
              <code>I_L = [ ∑(p_t · q_0) / ∑(p_0 · q_0) ] × 100</code>
            </div>
            <p className="text-[11px] text-slate-300 font-sans">
              Pondera con las cantidades del <strong>período base (q0)</strong>. Suele sobreestimar la inflación debido a que ignora que las empresas sustituyen insumos encarecidos.
            </p>
          </div>

          {/* Paasche */}
          <div className="p-4 rounded-xl bg-[#0a0e14] border border-[#00f0ff]/40 glow-cyan">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>ÍNDICE DE PAASCHE (IP)</span>
              <span className="text-[#00f0ff] text-[10px] uppercase font-bold">Ponderación Corriente</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{paascheIndex} pts</div>
            <div className="text-[11px] text-slate-400 bg-white/5 p-2 rounded mb-2">
              <code>I_P = [ ∑(p_t · q_t) / ∑(p_0 · q_t) ] × 100</code>
            </div>
            <p className="text-[11px] text-slate-300 font-sans">
              Pondera con las cantidades del <strong>período corriente (qt)</strong>. Suele subestimar la inflación pues asume la estructura de costos más reciente tras la sustitución.
            </p>
          </div>

          {/* Fisher */}
          <div className="p-4 rounded-xl bg-[#0a0e14] border border-[#ffb300]/40 glow-amber">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>ÍNDICE IDEAL DE FISHER (IF)</span>
              <span className="text-[#ffb300] text-[10px] uppercase font-bold">Superlativo</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{fisherIndex} pts</div>
            <div className="text-[11px] text-slate-400 bg-white/5 p-2 rounded mb-2">
              <code>I_F = √( I_L × I_P )</code>
            </div>
            <p className="text-[11px] text-slate-300 font-sans">
              Media geométrica ideal recomendada por el Manual del FMI. Elimina el sesgo de sustitución y satisface las pruebas de reversión temporal y de factores.
            </p>
          </div>
        </div>
      </div>

      {/* Sectors and Industrial Classification (CIIU / NAICS) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Clasificación Industrial por Sectores (CIIU Rev. 4)</h3>
            <p className="text-xs sm:text-sm text-slate-400">Selecciona un sector para inspeccionar su estructura de ponderación y comportamiento de precios.</p>
          </div>
        </div>

        {/* Sector Tabs / Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {SECTORS.map((sec) => {
            const isSelected = selectedSector.id === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-[#00ff88]/15 border-[#00ff88] glow-green'
                    : 'bg-[#0a0e14] border-white/10 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400">{sec.code}</div>
                <div className="font-bold text-sm text-white mt-1 line-clamp-1">{sec.name}</div>
                <div className="mt-2 flex items-baseline justify-between font-mono text-xs">
                  <span className="text-[#00ff88] font-bold">{sec.weight}% peso</span>
                  <span className={sec.momChange >= 0 ? 'text-[#00ff88]' : 'text-rose-400'}>
                    {sec.momChange >= 0 ? `+${sec.momChange}%` : `${sec.momChange}%`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed View of Selected Sector */}
        <div className="glass-panel p-6 rounded-2xl border border-[#00f0ff]/30">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
            <div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                {selectedSector.code}
              </span>
              <h4 className="text-2xl font-bold text-white mt-1">{selectedSector.name}</h4>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs">
              <div>
                <span className="text-slate-400 block">Ponderación en Canasta:</span>
                <span className="text-xl font-bold text-[#00ff88]">{selectedSector.weight}%</span>
              </div>
              <div>
                <span className="text-slate-400 block">Volatilidad (σ mensual):</span>
                <span className="text-xl font-bold text-[#ffb300]">{selectedSector.volatility}%</span>
              </div>
              <div>
                <span className="text-slate-400 block">Pass-Through al IPC:</span>
                <span className="text-xl font-bold text-[#00f0ff]">{selectedSector.passThroughRate * 100}%</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {selectedSector.description}
          </p>

          <div className="bg-[#0a0e14] p-4 rounded-xl border border-white/5">
            <span className="text-xs font-mono text-slate-400 block mb-2">
              CANASTA REPRESENTATIVA DE BIENES TESTIGO Y PRODUCTOS ENCUESTADOS:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedSector.sampleBasket.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-white/5 text-xs font-mono text-slate-200 border border-white/10 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
