import React, { useState } from 'react';
import { HISTORICAL_SERIES, SUBSECTORS, SECTORS } from '../data/macroData';
import { Activity, BarChart3, LineChart, TrendingUp, DollarSign, Calendar, Layers, Eye } from 'lucide-react';

export const DashboardSection: React.FC = () => {
  const [activeChartTab, setActiveChartTab] = useState<'line' | 'bar' | 'scatter' | 'heatmap'>('line');
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);

  // Line chart coordinates for IPP vs IPC
  const minIndex = 120;
  const maxIndex = 142;
  const getY = (val: number) => 180 - ((val - minIndex) / (maxIndex - minIndex)) * 140;
  const getX = (idx: number) => 45 + idx * 31;

  const ippPoints = HISTORICAL_SERIES.map((d, i) => `${getX(i)},${getY(d.ipp)}`).join(' ');
  const ipcPoints = HISTORICAL_SERIES.map((d, i) => `${getX(i)},${getY(d.ipc)}`).join(' ');

  // Scatter data: USD Exchange rate vs IPP MoM
  // USD ranges 4050 to 4260, IPP MoM ranges 0.2 to 0.8
  const minFx = 4030;
  const maxFx = 4280;
  const minMom = 0.15;
  const maxMom = 0.80;

  const getScatterX = (fx: number) => 45 + ((fx - minFx) / (maxFx - minFx)) * 580;
  const getScatterY = (mom: number) => 180 - ((mom - minMom) / (maxMom - minMom)) * 140;

  // Heatmap months and sector rows
  const heatmapMonths = ['Oct 25', 'Nov 25', 'Dic 25', 'Ene 26', 'Feb 26', 'Mar 26', 'Abr 26', 'May 26', 'Jun 26', 'Jul 26', 'Ago 26', 'Sep 26'];
  const heatmapRows = [
    { sector: 'Agropecuario', values: [1.2, 0.8, 1.5, 2.4, 2.1, 1.4, 1.8, 0.4, 0.6, 1.1, 1.5, 1.85] },
    { sector: 'Minería', values: [0.2, -1.4, -0.8, 1.1, 0.4, 1.9, 0.3, -2.1, -1.8, 0.1, -0.4, -0.92] },
    { sector: 'Manufactura', values: [0.3, 0.4, 0.2, 0.6, 0.5, 0.4, 0.5, 0.3, 0.2, 0.4, 0.4, 0.42] },
    { sector: 'Energía', values: [0.9, 0.6, 1.1, 1.8, 1.4, 0.8, 1.2, 0.5, 0.3, 0.7, 0.9, 1.15] },
    { sector: 'Servicios', values: [0.2, 0.2, 0.3, 0.4, 0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.3, 0.28] }
  ];

  const getHeatColor = (val: number) => {
    if (val > 1.8) return 'bg-rose-500/80 text-white';
    if (val > 1.0) return 'bg-amber-500/70 text-black font-bold';
    if (val > 0.4) return 'bg-[#00ff88]/50 text-black';
    if (val >= 0) return 'bg-[#00f0ff]/30 text-white';
    return 'bg-blue-600/60 text-white'; // Negative
  };

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono mb-3">
          <Activity className="w-3.5 h-3.5" />
          <span>MÓDULO 07 • DASHBOARD DE MANDO Y VISUALIZACIÓN MULTIDIMENSIONAL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Dashboard Institucional de <span className="text-[#00f0ff]">Analítica Económica</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mt-2 text-sm sm:text-base">
          Series de tiempo históricas de alta frecuencia, correlación cambiaria y mapas de calor para la detección de presiones en los costos de producción.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="glass-panel p-4 rounded-xl border border-white/10">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">IPP AGROPECUARIO</span>
          <span className="text-2xl font-mono font-bold text-[#00ff88]">+1.85%</span>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">YoY: +8.24%</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/10">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">IPP MINERO</span>
          <span className="text-2xl font-mono font-bold text-rose-400">-0.92%</span>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">YoY: -3.45%</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/10">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">IPP MANUFACTURA</span>
          <span className="text-2xl font-mono font-bold text-[#00f0ff]">+0.42%</span>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">YoY: +4.15%</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/10">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">VOLATILIDAD (σ IPP)</span>
          <span className="text-2xl font-mono font-bold text-[#ffb300]">3.42 pts</span>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">Régimen normal</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/10 col-span-2 lg:col-span-1">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">PASS-THROUGH (IPP→IPC)</span>
          <span className="text-2xl font-mono font-bold text-emerald-400">0.74</span>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">Rezago: 2 meses</span>
        </div>
      </div>

      {/* Chart Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-xs">
        <button
          onClick={() => setActiveChartTab('line')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
            activeChartTab === 'line'
              ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88] glow-green'
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
          }`}
        >
          <LineChart className="w-4 h-4" />
          Serie Histórica (IPP vs. IPC)
        </button>

        <button
          onClick={() => setActiveChartTab('bar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
            activeChartTab === 'bar'
              ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff] glow-cyan'
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Contribución por Subclases
        </button>

        <button
          onClick={() => setActiveChartTab('scatter')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
            activeChartTab === 'scatter'
              ? 'bg-[#ffb300]/20 text-[#ffb300] border-[#ffb300] glow-amber'
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Dispersión (TRM vs. IPP)
        </button>

        <button
          onClick={() => setActiveChartTab('heatmap')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
            activeChartTab === 'heatmap'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500'
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          Heatmap Sectorial
        </button>
      </div>

      {/* Main Chart Viewer Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
        {/* VIEW 1: Line Chart */}
        {activeChartTab === 'line' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-mono text-sm font-bold text-white">
                  SERIE MULTIANUAL IPP VS. IPC (BASE 100 = 2020)
                </h3>
                <span className="text-xs text-slate-400 font-sans">
                  Observa cómo los picos en el IPP (verde) preceden sistemáticamente a los repuntes en el IPC (cian).
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#00ff88]">
                  <span className="w-3 h-0.5 bg-[#00ff88] inline-block shadow-[0_0_8px_#00ff88]" />
                  IPP (Precios al Productor)
                </span>
                <span className="flex items-center gap-1.5 text-[#00f0ff]">
                  <span className="w-3 h-0.5 bg-[#00f0ff] inline-block shadow-[0_0_8px_#00f0ff]" />
                  IPC (Consumidor)
                </span>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 700 230" className="w-full min-w-[620px] h-60">
                {/* Horizontal grid lines */}
                {[120, 125, 130, 135, 140].map((val) => (
                  <g key={val}>
                    <line
                      x1="40"
                      y1={getY(val)}
                      x2="680"
                      y2={getY(val)}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="4 4"
                    />
                    <text x="5" y={getY(val) + 4} fill="#64748b" fontSize="10" fontFamily="monospace">
                      {val}
                    </text>
                  </g>
                ))}

                {/* IPP Line */}
                <polyline
                  fill="none"
                  stroke="#00ff88"
                  strokeWidth="2.5"
                  points={ippPoints}
                  className="drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]"
                />

                {/* IPC Line */}
                <polyline
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  points={ipcPoints}
                  className="drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                />

                {/* Interactive Points */}
                {HISTORICAL_SERIES.map((pt, i) => (
                  <g key={pt.period} className="cursor-pointer">
                    <circle
                      cx={getX(i)}
                      cy={getY(pt.ipp)}
                      r="3.5"
                      fill="#00ff88"
                      onMouseEnter={() => setHoveredPoint({ ...pt, type: 'IPP', val: pt.ipp })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    <circle
                      cx={getX(i)}
                      cy={getY(pt.ipc)}
                      r="3.5"
                      fill="#00f0ff"
                      onMouseEnter={() => setHoveredPoint({ ...pt, type: 'IPC', val: pt.ipc })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    {i % 3 === 0 && (
                      <text
                        x={getX(i)}
                        y="215"
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        {pt.period}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </div>

            {hoveredPoint && (
              <div className="mt-2 p-2.5 rounded bg-[#0a0e14] border border-white/10 font-mono text-xs flex items-center justify-between text-slate-300">
                <span>Período: <strong className="text-white">{hoveredPoint.period}</strong></span>
                <span>IPP Nivel: <strong className="text-[#00ff88]">{hoveredPoint.ipp}</strong> (MoM: +{hoveredPoint.ippMoM}%)</span>
                <span>IPC Nivel: <strong className="text-[#00f0ff]">{hoveredPoint.ipc}</strong> (MoM: +{hoveredPoint.ipcMoM}%)</span>
                <span>TRM: <strong className="text-amber-400">${hoveredPoint.usdCop}</strong></span>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: Bar Chart */}
        {activeChartTab === 'bar' && (
          <div>
            <div className="mb-4">
              <h3 className="font-mono text-sm font-bold text-white">
                CONTRIBUCIÓN PONDERADA POR SUBCLASES INDUSTRIALES (p.p.)
              </h3>
              <span className="text-xs text-slate-400 font-sans">
                Descomposición aditiva de la variación del IPP general según la participación de cada subsector manufacturero y extractivo.
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {SUBSECTORS.map((sub) => (
                <div key={sub.ciiu} className="bg-[#0a0e14] p-3 rounded-xl border border-white/5">
                  <div className="flex justify-between text-slate-300 mb-1.5">
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-[#00f0ff]">{sub.ciiu}</span>
                      <strong className="text-white">{sub.subsector}</strong> (Ponderación {sub.weight}%)
                    </span>
                    <span className={sub.contributionPp >= 0 ? 'text-[#00ff88] font-bold' : 'text-rose-400 font-bold'}>
                      {sub.contributionPp >= 0 ? `+${sub.contributionPp}` : sub.contributionPp} p.p.
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${sub.contributionPp >= 0 ? 'bg-[#00ff88]' : 'bg-rose-500'}`}
                        style={{ width: `${Math.min(100, Math.max(5, Math.abs(sub.contributionPp) * 200))}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Var: {sub.priceChange >= 0 ? `+${sub.priceChange}%` : `${sub.priceChange}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: Scatter Plot */}
        {activeChartTab === 'scatter' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-mono text-sm font-bold text-white">
                  DISPERSIÓN: TIPO DE CAMBIO (TRM USD) VS. VARIACIÓN MENSUAL DEL IPP
                </h3>
                <span className="text-xs text-slate-400 font-sans">
                  Regresión lineal estimada: IPP_MoM = β0 + β1(TRM) + ε | Coeficiente R² = 0.784
                </span>
              </div>
              <div className="text-xs font-mono text-[#00ff88] bg-[#00ff88]/10 px-3 py-1 rounded-full border border-[#00ff88]/30">
                CORRELACIÓN POSITIVA MODERADA-ALTA (ρ = +0.885)
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 680 220" className="w-full min-w-[580px] h-56">
                {/* Horizontal Grid */}
                {[0.2, 0.4, 0.6, 0.8].map((v) => (
                  <g key={v}>
                    <line
                      x1="45"
                      y1={getScatterY(v)}
                      x2="640"
                      y2={getScatterY(v)}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="4 4"
                    />
                    <text x="10" y={getScatterY(v) + 4} fill="#64748b" fontSize="10" fontFamily="monospace">
                      +{v}%
                    </text>
                  </g>
                ))}

                {/* Regression Line */}
                <line
                  x1={getScatterX(4050)}
                  y1={getScatterY(0.32)}
                  x2={getScatterX(4260)}
                  y2={getScatterY(0.72)}
                  stroke="#ffb300"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />

                {/* Scatter Points */}
                {HISTORICAL_SERIES.map((pt, i) => (
                  <circle
                    key={i}
                    cx={getScatterX(pt.usdCop)}
                    cy={getScatterY(pt.ippMoM)}
                    r="4.5"
                    fill="#00ff88"
                    className="drop-shadow-[0_0_6px_rgba(0,255,136,0.8)] cursor-pointer hover:r-6"
                  >
                    <title>{`${pt.period}: TRM $${pt.usdCop}, IPP +${pt.ippMoM}%`}</title>
                  </circle>
                ))}

                {/* Axis Labels */}
                <text x="340" y="210" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  Tipo de Cambio Nominal (TRM / USD)
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* VIEW 4: Heatmap */}
        {activeChartTab === 'heatmap' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-mono text-sm font-bold text-white">
                  MAPA TÉRMICO SECTORIAL (12 MESES)
                </h3>
                <span className="text-xs text-slate-400 font-sans">
                  Intensidad de variación de precios por sector económico mensual.
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-blue-600/60 text-white">&lt;0%</span>
                <span className="px-2 py-0.5 rounded bg-[#00f0ff]/30 text-white">0-0.4%</span>
                <span className="px-2 py-0.5 rounded bg-[#00ff88]/50 text-black">0.4-1.0%</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/70 text-black">1.0-1.8%</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/80 text-white">&gt;1.8%</span>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[650px] font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="text-left py-2 px-3">Sector</th>
                    {heatmapMonths.map((m) => (
                      <th key={m} className="py-2 px-2 text-center text-[10px]">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapRows.map((row) => (
                    <tr key={row.sector} className="border-b border-white/5">
                      <td className="py-2.5 px-3 text-slate-200 font-bold">{row.sector}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="p-1 text-center">
                          <div
                            className={`py-1 px-1.5 rounded text-[10px] font-mono ${getHeatColor(v)}`}
                          >
                            {v >= 0 ? `+${v}` : v}%
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
