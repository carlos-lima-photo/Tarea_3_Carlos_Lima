import React, { useState } from 'react';
import { SCENARIOS } from '../data/macroData';
import { TrendingUp, AlertTriangle, ShieldAlert, Sliders, ChevronRight } from 'lucide-react';

export const ScenariosSection: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [customOil, setCustomOil] = useState(SCENARIOS[0].oilShockPct);
  const [customFx, setCustomFx] = useState(SCENARIOS[0].fxDevaluationPct);
  const [customAgri, setCustomAgri] = useState(SCENARIOS[0].agriDroughtShockPct);

  // Recalculate projected impact based on shocks
  // Weightings: Oil ~ 0.04, FX ~ 0.05, Agri ~ 0.03
  const projectedIppMoM = Number((0.40 + customOil * 0.045 + customFx * 0.055 + customAgri * 0.035).toFixed(2));
  const projectedIppYoY = Number((4.82 + projectedIppMoM * 2.8).toFixed(2));

  // Trajectory points for next 6 months
  const baseLevel = 133.4;
  const trajectory = [
    baseLevel,
    Number((baseLevel + projectedIppMoM * 0.8).toFixed(2)),
    Number((baseLevel + projectedIppMoM * 1.7).toFixed(2)),
    Number((baseLevel + projectedIppMoM * 2.5).toFixed(2)),
    Number((baseLevel + projectedIppMoM * 3.2).toFixed(2)),
    Number((baseLevel + projectedIppMoM * 3.8).toFixed(2))
  ];

  // SVG Fan Chart calculation
  const months = ['Mes actual (t)', 't+1', 't+2', 't+3', 't+4', 't+5'];
  const minVal = 132;
  const maxVal = 145;
  const getY = (val: number) => 170 - ((val - minVal) / (maxVal - minVal)) * 140;
  const getX = (idx: number) => 50 + idx * 110;

  // Upper/lower bounds 80% & 95%
  const upper95 = trajectory.map((v, i) => v + i * 0.65);
  const lower95 = trajectory.map((v, i) => Math.max(minVal, v - i * 0.65));
  const upper80 = trajectory.map((v, i) => v + i * 0.35);
  const lower80 = trajectory.map((v, i) => Math.max(minVal, v - i * 0.35));

  const path95 =
    trajectory.map((_, i) => `${getX(i)},${getY(upper95[i])}`).join(' L ') +
    ' L ' +
    [...trajectory].reverse().map((_, i) => `${getX(5 - i)},${getY(lower95[5 - i])}`).join(' L ') +
    ' Z';

  const path80 =
    trajectory.map((_, i) => `${getX(i)},${getY(upper80[i])}`).join(' L ') +
    ' L ' +
    [...trajectory].reverse().map((_, i) => `${getX(5 - i)},${getY(lower80[5 - i])}`).join(' L ') +
    ' Z';

  const medianPath = trajectory.map((v, i) => `${getX(i)},${getY(v)}`).join(' L ');

  const applyPreset = (sc: typeof SCENARIOS[0]) => {
    setSelectedScenario(sc);
    setCustomOil(sc.oilShockPct);
    setCustomFx(sc.fxDevaluationPct);
    setCustomAgri(sc.agriDroughtShockPct);
  };

  return (
    <section id="escenarios" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb300]/10 border border-[#ffb300]/30 text-[#ffb300] text-xs font-mono mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>MÓDULO 05 • STRESS TESTING ECONOMÉTRICO & PRONÓSTICO FAN CHART</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Síntesis de Escenarios de <span className="text-[#ffb300]">Shock Inflacionario</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mt-2 text-sm sm:text-base">
          Simulación macroeconómica ante perturbaciones extremas en commodities y tipo de cambio. Visualización de trayectorias proyectadas con intervalos de confianza al 80% y 95%.
        </p>
      </div>

      {/* Preset Scenario Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {SCENARIOS.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => applyPreset(sc)}
              className={`p-5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#ffb300]/15 border-[#ffb300] glow-amber'
                  : 'bg-[#0a0e14] border-white/10 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#ffb300] border border-[#ffb300]/20 font-bold">
                  {sc.tag}
                </span>
                <h4 className="font-bold text-sm text-white mt-2 mb-1">{sc.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{sc.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-baseline justify-between font-mono text-xs">
                <span className="text-slate-400">IPP Proyectado:</span>
                <span className="text-[#ffb300] font-bold">+{sc.estimatedIppMoM}% MoM</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Controls and Fan Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Shock Modifiers */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#ffb300]" />
              CALIBRACIÓN DEL CHOQUE
            </h3>
            <span className="text-[10px] font-mono text-slate-400">MONTE CARLO</span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">SHOCK DE PETRÓLEO / ENERGÍA:</span>
              <span className="text-[#ffb300] font-bold">{customOil >= 0 ? `+${customOil}%` : `${customOil}%`}</span>
            </div>
            <input
              type="range"
              min="-10"
              max="50"
              value={customOil}
              onChange={(e) => setCustomOil(Number(e.target.value))}
              className="w-full accent-[#ffb300]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">DEVALUACIÓN CAMBIARIA (TRM):</span>
              <span className="text-[#00f0ff] font-bold">+{customFx}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={customFx}
              onChange={(e) => setCustomFx(Number(e.target.value))}
              className="w-full accent-[#00f0ff]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">DISRUPCIÓN AGROPECUARIA / SEQUÍA:</span>
              <span className="text-[#00ff88] font-bold">+{customAgri}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={customAgri}
              onChange={(e) => setCustomAgri(Number(e.target.value))}
              className="w-full accent-[#00ff88]"
            />
          </div>

          <div className="bg-[#0a0e14] p-4 rounded-xl border border-white/5 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">IPP MoM Impacto Estimado:</span>
              <span className="text-[#ffb300] font-bold">+{projectedIppMoM}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">IPP Anualizado Proyectado:</span>
              <span className="text-rose-400 font-bold">+{projectedIppYoY}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Desfase Transmisión IPC:</span>
              <span className="text-slate-200">1.8 meses</span>
            </div>
          </div>
        </div>

        {/* Fan Chart Projection */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-[#ffb300]/30">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h4 className="font-mono text-sm font-bold text-white">
              TRAYECTORIA DEL IPP CON BANDAS DE CONFIANZA (FAN CHART)
            </h4>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#ffb300]">
                <span className="w-3 h-2 bg-[#ffb300]/40 rounded-xs inline-block" />
                Intervalo 80%
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-2 bg-[#ffb300]/15 rounded-xs inline-block" />
                Intervalo 95%
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-3 h-0.5 bg-white inline-block" />
                Mediana
              </span>
            </div>
          </div>

          {/* SVG Fan Chart */}
          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 650 200" className="w-full min-w-[550px] h-52">
              {/* Grid Lines */}
              {[134, 137, 140, 143].map((v) => (
                <g key={v}>
                  <line
                    x1="45"
                    y1={getY(v)}
                    x2="620"
                    y2={getY(v)}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="4 4"
                  />
                  <text x="10" y={getY(v) + 4} fill="#64748b" fontSize="10" fontFamily="monospace">
                    {v}
                  </text>
                </g>
              ))}

              {/* 95% Confidence Band Polygon */}
              <path d={`M ${path95}`} fill="rgba(255, 179, 0, 0.12)" />

              {/* 80% Confidence Band Polygon */}
              <path d={`M ${path80}`} fill="rgba(255, 179, 0, 0.25)" />

              {/* Median Forecast Line */}
              <path
                d={`M ${medianPath}`}
                fill="none"
                stroke="#ffb300"
                strokeWidth="2.5"
                className="drop-shadow-[0_0_8px_rgba(255,179,0,0.7)]"
              />

              {/* Dots */}
              {trajectory.map((v, i) => (
                <circle
                  key={i}
                  cx={getX(i)}
                  cy={getY(v)}
                  r="3.5"
                  fill="#ffffff"
                />
              ))}

              {/* X-axis labels */}
              {months.map((m, i) => (
                <text
                  key={m}
                  x={getX(i)}
                  y="190"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {m}
                </text>
              ))}
            </svg>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-[#0a0e14] border border-white/5 text-xs text-slate-400 leading-relaxed font-sans">
            <strong>Evaluación de Riesgo Macroeconómico:</strong> En caso de materializarse el escenario seleccionado, la probabilidad de que el IPP supere los 140 puntos en los próximos 5 meses es del <strong>74.2%</strong>, generando una aceleración del pass-through hacia el IPC de alimentos y servicios públicos.
          </div>
        </div>
      </div>
    </section>
  );
};
