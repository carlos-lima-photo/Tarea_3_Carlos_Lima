import React, { useState } from 'react';
import { ML_MODELS } from '../data/macroData';
import { Cpu, Network, GitBranch, ArrowRight, Gauge, Layers, Filter } from 'lucide-react';

export const MachineLearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'supervisado' | 'no-supervisado'>('supervisado');

  // Transmission Simulator state
  const [commodityShock, setCommodityShock] = useState(25); // +25% shock
  const [commodityType, setCommodityType] = useState('Petróleo Crudo & Fletes');
  const [timeLag, setTimeLag] = useState(2); // 2 months lag
  const [marginAbsorption, setMarginAbsorption] = useState(30); // 30% absorbed by producer margins

  // Computed downstream effects:
  // Manufacturing IPP shock = commodityShock * sensitivity (0.45) * (1 - marginAbsorption/100)
  const manufIppImpact = Number((commodityShock * 0.45 * (1 - marginAbsorption / 100)).toFixed(2));
  // Final CPI impact = manufIppImpact * passThrough (0.68)
  const finalCpiImpact = Number((manufIppImpact * 0.68).toFixed(2));

  return (
    <section id="machine-learning" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>MÓDULO 02 • MACHINE LEARNING & MODELADO MACROECONÓMICO</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Machine Learning en <span className="text-[#00ff88]">Series Temporales de Precios</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mt-2 text-sm sm:text-base">
          Los índices de precios exhiben autocorrelación, estacionalidad, quiebres estructurales y no-linealidades causadas por choques de oferta. Combinamos modelos econométricos tradicionales con algoritmos de aprendizaje supervisado y no supervisado.
        </p>
      </div>

      {/* Model Category Toggle */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab('supervisado')}
          className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all border ${
            activeTab === 'supervisado'
              ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88] glow-green'
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
          }`}
        >
          Modelos Supervisados (SARIMAX / XGBoost)
        </button>
        <button
          onClick={() => setActiveTab('no-supervisado')}
          className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all border ${
            activeTab === 'no-supervisado'
              ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff] glow-cyan'
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
          }`}
        >
          Modelos No Supervisados (Clustering K-Means & PCA)
        </button>
      </div>

      {/* Models Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {ML_MODELS.filter((m) =>
          activeTab === 'supervisado'
            ? m.category === 'Supervisado' || m.category === 'Red Neuronal'
            : m.category === 'No Supervisado'
        ).map((model) => (
          <div
            key={model.id}
            className="glass-panel p-6 rounded-xl border border-white/10 hover:border-[#00ff88]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-[#00f0ff] border border-white/10">
                  {model.category}
                </span>
                <span className="text-xs font-mono text-slate-400">Horizonte: {model.horizon}</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#00ff88] transition-colors">
                {model.name}
              </h4>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">{model.description}</p>

              <div className="bg-[#0a0e14] p-3 rounded-lg border border-white/5 mb-4 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Algoritmo:</span>
                  <span className="text-slate-200 text-right truncate max-w-[170px]">{model.algorithm}</span>
                </div>
                {model.rmse > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">RMSE:</span>
                    <span className="text-[#00ff88] font-bold">{model.rmse}</span>
                  </div>
                )}
                {model.mape > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">MAPE:</span>
                    <span className="text-[#00ff88] font-bold">{model.mape}%</span>
                  </div>
                )}
                {model.r2 > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">R² Score:</span>
                    <span className="text-[#00f0ff] font-bold">{model.r2}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-white/5 pt-3">
              <strong className="text-slate-300">Ventaja técnica:</strong> {model.pros}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Price Transmission (Pass-Through) Demonstration */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00f0ff]/30 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/40 flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-[#00f0ff]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Simulador Interactivo de Transmisión de Precios (Pass-Through Engine)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Modula un choque exógeno en materias primas y observa la propagación en cascada a través de la cadena de valor industrial hacia el consumidor.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0a0e14] p-5 rounded-xl border border-white/5 mb-8">
          <div>
            <label className="text-xs font-mono text-slate-300 block mb-2">
              TIPO DE COMMODITY / INSUMO:
            </label>
            <select
              value={commodityType}
              onChange={(e) => setCommodityType(e.target.value)}
              className="w-full bg-[#161d27] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-[#00f0ff] outline-none"
            >
              <option value="Petróleo Crudo & Fletes">Petróleo Crudo Brent & Fletes (+energía)</option>
              <option value="Fertilizantes & Agroquímicos">Fertilizantes Nitrogenados / Urea (+alimentos)</option>
              <option value="Siderurgia & Mineral de Hierro">Siderurgia & Chatarra (+construcción)</option>
              <option value="Polímeros & Resinas Plásticas">Polímeros Plásticos (+empaques)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">MAGNITUD DEL CHOQUE:</span>
              <span className="text-[#00ff88] font-bold">+{commodityShock}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={commodityShock}
              onChange={(e) => setCommodityShock(Number(e.target.value))}
              className="w-full accent-[#00ff88]"
            />
            <span className="text-[10px] text-slate-500 font-mono">Sensibilidad de oferta en frontera</span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">ABSORCIÓN POR MÁRGENES:</span>
              <span className="text-[#ffb300] font-bold">{marginAbsorption}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={marginAbsorption}
              onChange={(e) => setMarginAbsorption(Number(e.target.value))}
              className="w-full accent-[#ffb300]"
            />
            <span className="text-[10px] text-slate-500 font-mono">Poder de amortiguación del productor</span>
          </div>
        </div>

        {/* Transmission Cascading Pipeline Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Stage 1: Insumo Crudo */}
          <div className="p-5 rounded-xl bg-[#0a0e14] border border-[#ffb300]/40 glow-amber relative">
            <div className="text-[10px] font-mono text-[#ffb300] font-bold uppercase mb-1">
              ETAPA 1 • MERCADO PRIMARIO
            </div>
            <h4 className="text-sm font-bold text-white mb-2">{commodityType}</h4>
            <div className="text-3xl font-mono font-extrabold text-[#ffb300] mb-2">
              +{commodityShock}%
            </div>
            <p className="text-xs text-slate-400">
              Impacto directo de cotizaciones internacionales FOB en aduana. Transmisión inmediata en día t+0.
            </p>
          </div>

          {/* Stage 2: IPP Manufactura */}
          <div className="p-5 rounded-xl bg-[#0a0e14] border border-[#00f0ff]/40 glow-cyan relative">
            <div className="text-[10px] font-mono text-[#00f0ff] font-bold uppercase mb-1">
              ETAPA 2 • IPP MANUFACTURA (PPI)
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Costos en Fábrica (Lags {timeLag} meses)</h4>
            <div className="text-3xl font-mono font-extrabold text-[#00f0ff] mb-2">
              +{manufIppImpact}%
            </div>
            <p className="text-xs text-slate-400">
              Traslado amortiguado por inventarios previos y compresión de márgenes industriales brutos.
            </p>
          </div>

          {/* Stage 3: IPC Consumidor */}
          <div className="p-5 rounded-xl bg-[#0a0e14] border border-[#00ff88]/40 glow-green relative">
            <div className="text-[10px] font-mono text-[#00ff88] font-bold uppercase mb-1">
              ETAPA 3 • IPC CONSUMIDOR (CPI)
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Inflación Minorista Proyectada</h4>
            <div className="text-3xl font-mono font-extrabold text-[#00ff88] mb-2">
              +{finalCpiImpact}%
            </div>
            <p className="text-xs text-slate-400">
              Presión inflacionaria final en mostrador con un rezago acumulado estimado de 2 a 4 meses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
