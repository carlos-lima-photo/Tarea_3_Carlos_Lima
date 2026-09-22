import React, { useState } from 'react';
import { Sliders, RotateCcw, TrendingUp, Zap, Sparkles, Check, AlertCircle } from 'lucide-react';

export const PlaygroundSection: React.FC = () => {
  // Sector variations
  const [agriVar, setAgriVar] = useState(1.85);
  const [miningVar, setMiningVar] = useState(-0.92);
  const [manufVar, setManufVar] = useState(0.42);
  const [energyVar, setEnergyVar] = useState(1.15);
  const [servicesVar, setServicesVar] = useState(0.28);

  // Configuration
  const [formula, setFormula] = useState<'Laspeyres' | 'Paasche'>('Laspeyres');
  const [macroShock, setMacroShock] = useState(0); // additional macro shock (-2% to +5%)
  const [seasonalAdjustment, setSeasonalAdjustment] = useState(true);

  // Weights (sum = 100%)
  const wAgri = 0.154;
  const wMining = 0.186;
  const wManuf = 0.482;
  const wEnergy = 0.098;
  const wServices = 0.080;

  // Substitution adjustment factor if Paasche
  // In Paasche, consumers/producers substitute expensive goods, reducing total inflation slightly
  const substitutionFactor = formula === 'Paasche' ? 0.92 : 1.0;
  // Seasonal adjustment smooths peaks
  const seasonalMultiplier = seasonalAdjustment ? 0.95 : 1.05;

  // Contributions in percentage points
  const cAgri = (agriVar * wAgri * substitutionFactor * seasonalMultiplier);
  const cMining = (miningVar * wMining * substitutionFactor * seasonalMultiplier);
  const cManuf = (manufVar * wManuf * substitutionFactor * seasonalMultiplier);
  const cEnergy = (energyVar * wEnergy * substitutionFactor * seasonalMultiplier);
  const cServices = (servicesVar * wServices * substitutionFactor * seasonalMultiplier);

  // Total IPP MoM
  const totalIppMoM = Number((cAgri + cMining + cManuf + cEnergy + cServices + macroShock).toFixed(2));
  // Annualized projection
  const annualizedIpp = Number(((Math.pow(1 + totalIppMoM / 100, 12) - 1) * 100).toFixed(2));
  // Transmission to CPI
  const estimatedCpiImpact = Number((totalIppMoM * 0.68).toFixed(2));

  const resetDefaults = () => {
    setAgriVar(1.85);
    setMiningVar(-0.92);
    setManufVar(0.42);
    setEnergyVar(1.15);
    setServicesVar(0.28);
    setFormula('Laspeyres');
    setMacroShock(0);
    setSeasonalAdjustment(true);
  };

  return (
    <section id="playground" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-mono mb-3">
          <Sliders className="w-3.5 h-3.5" />
          <span>MÓDULO 06 • IP-PLAYGROUND RECALCULATION ENGINE</span>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Playground Analítico de Precios <span className="text-[#00ff88]">(IP-Playground)</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
              Ajusta las variaciones sectoriales, la fórmula de agregación y los choques macroeconómicos. Observa la recalculación en tiempo real de la canasta ponderada.
            </p>
          </div>
          <button
            onClick={resetDefaults}
            id="btn-reset-playground"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restablecer Valores Base
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders and Controls Column */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-mono text-sm font-bold text-white">VARIACIONES DE PRECIOS POR SECTORES</h3>
            <span className="text-[10px] font-mono text-[#00ff88]">SUMA DE PESOS: 100.0%</span>
          </div>

          {/* Sector 1: Agro */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-200">1. Agropecuario, Caza y Pesca (15.4%)</span>
              <span className={agriVar >= 0 ? 'text-[#00ff88] font-bold' : 'text-rose-400 font-bold'}>
                {agriVar >= 0 ? `+${agriVar}%` : `${agriVar}%`}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="15"
              step="0.1"
              value={agriVar}
              onChange={(e) => setAgriVar(Number(e.target.value))}
              className="w-full accent-[#00ff88]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>-10.0%</span>
              <span>Contribución: {cAgri >= 0 ? `+${cAgri.toFixed(2)}` : cAgri.toFixed(2)} p.p.</span>
              <span>+15.0%</span>
            </div>
          </div>

          {/* Sector 2: Minería */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-200">2. Minería e Hidrocarburos (18.6%)</span>
              <span className={miningVar >= 0 ? 'text-[#00ff88] font-bold' : 'text-rose-400 font-bold'}>
                {miningVar >= 0 ? `+${miningVar}%` : `${miningVar}%`}
              </span>
            </div>
            <input
              type="range"
              min="-15"
              max="15"
              step="0.1"
              value={miningVar}
              onChange={(e) => setMiningVar(Number(e.target.value))}
              className="w-full accent-[#00f0ff]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>-15.0%</span>
              <span>Contribución: {cMining >= 0 ? `+${cMining.toFixed(2)}` : cMining.toFixed(2)} p.p.</span>
              <span>+15.0%</span>
            </div>
          </div>

          {/* Sector 3: Manufactura */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-200">3. Industrias Manufactureras (48.2%)</span>
              <span className={manufVar >= 0 ? 'text-[#00ff88] font-bold' : 'text-rose-400 font-bold'}>
                {manufVar >= 0 ? `+${manufVar}%` : `${manufVar}%`}
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="10"
              step="0.1"
              value={manufVar}
              onChange={(e) => setManufVar(Number(e.target.value))}
              className="w-full accent-[#ffb300]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>-5.0%</span>
              <span>Contribución: {cManuf >= 0 ? `+${cManuf.toFixed(2)}` : cManuf.toFixed(2)} p.p.</span>
              <span>+10.0%</span>
            </div>
          </div>

          {/* Sector 4: Energía */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-200">4. Electricidad, Gas y Agua (9.8%)</span>
              <span className={energyVar >= 0 ? 'text-[#00ff88] font-bold' : 'text-rose-400 font-bold'}>
                {energyVar >= 0 ? `+${energyVar}%` : `${energyVar}%`}
              </span>
            </div>
            <input
              type="range"
              min="-8"
              max="12"
              step="0.1"
              value={energyVar}
              onChange={(e) => setEnergyVar(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>-8.0%</span>
              <span>Contribución: {cEnergy >= 0 ? `+${cEnergy.toFixed(2)}` : cEnergy.toFixed(2)} p.p.</span>
              <span>+12.0%</span>
            </div>
          </div>

          {/* Sector 5: Servicios */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-200">5. Servicios y Transporte (8.0%)</span>
              <span className={servicesVar >= 0 ? 'text-[#00ff88] font-bold' : 'text-rose-400 font-bold'}>
                {servicesVar >= 0 ? `+${servicesVar}%` : `${servicesVar}%`}
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="8"
              step="0.1"
              value={servicesVar}
              onChange={(e) => setServicesVar(Number(e.target.value))}
              className="w-full accent-indigo-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>-5.0%</span>
              <span>Contribución: {cServices >= 0 ? `+${cServices.toFixed(2)}` : cServices.toFixed(2)} p.p.</span>
              <span>+8.0%</span>
            </div>
          </div>

          {/* Secondary Parameters: Formula & Seasonal Adjustment */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-2">FÓRMULA DE PONDERACIÓN:</label>
              <div className="flex rounded-lg bg-[#0a0e14] p-1 border border-white/10 font-mono text-xs">
                <button
                  onClick={() => setFormula('Laspeyres')}
                  className={`flex-1 py-1.5 rounded-md transition-all ${
                    formula === 'Laspeyres' ? 'bg-[#00ff88] text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Laspeyres (q0)
                </button>
                <button
                  onClick={() => setFormula('Paasche')}
                  className={`flex-1 py-1.5 rounded-md transition-all ${
                    formula === 'Paasche' ? 'bg-[#00f0ff] text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Paasche (qt)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-2">AJUSTE ESTACIONAL (X-13):</label>
              <button
                onClick={() => setSeasonalAdjustment(!seasonalAdjustment)}
                className={`w-full py-2 px-3 rounded-lg border font-mono text-xs flex items-center justify-between transition-all ${
                  seasonalAdjustment
                    ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/40'
                    : 'bg-white/5 text-slate-400 border-white/10'
                }`}
              >
                <span>{seasonalAdjustment ? 'Desestacionalizado (SA)' : 'Serie Original (NSA)'}</span>
                <span className={`w-2 h-2 rounded-full ${seasonalAdjustment ? 'bg-[#00ff88]' : 'bg-slate-600'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Dynamic Results Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main calculated result card */}
          <div className="glass-panel p-6 rounded-2xl border border-[#00ff88]/40 glow-green relative overflow-hidden">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              VARIACIÓN TOTAL DEL IPP MENSUAL:
            </div>
            <div className="flex items-baseline gap-3">
              <span className={`text-5xl font-mono font-extrabold ${totalIppMoM >= 0 ? 'text-[#00ff88]' : 'text-rose-400'} text-glow-green`}>
                {totalIppMoM >= 0 ? `+${totalIppMoM}%` : `${totalIppMoM}%`}
              </span>
              <span className="text-xs font-mono text-slate-400">MoM Calculado</span>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <span className="text-slate-400 block">Proyección Anualizada:</span>
                <span className="text-lg font-bold text-white">
                  {annualizedIpp >= 0 ? `+${annualizedIpp}%` : `${annualizedIpp}%`}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Impacto en IPC Final:</span>
                <span className="text-lg font-bold text-[#00f0ff]">
                  +{estimatedCpiImpact}%
                </span>
              </div>
            </div>
          </div>

          {/* Sectoral Contribution Bar Breakdown */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-4">
              CONTRIBUCIÓN EN PUNTOS PORCENTUALES (p.p.):
            </h4>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Agropecuario:</span>
                  <span className={cAgri >= 0 ? 'text-[#00ff88]' : 'text-rose-400'}>
                    {cAgri >= 0 ? `+${cAgri.toFixed(2)}` : cAgri.toFixed(2)} p.p.
                  </span>
                </div>
                <div className="w-full bg-[#0a0e14] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00ff88] h-full transition-all"
                    style={{ width: `${Math.min(100, Math.max(5, Math.abs(cAgri) * 50))}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Minería:</span>
                  <span className={cMining >= 0 ? 'text-[#00f0ff]' : 'text-rose-400'}>
                    {cMining >= 0 ? `+${cMining.toFixed(2)}` : cMining.toFixed(2)} p.p.
                  </span>
                </div>
                <div className="w-full bg-[#0a0e14] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00f0ff] h-full transition-all"
                    style={{ width: `${Math.min(100, Math.max(5, Math.abs(cMining) * 50))}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Manufactura:</span>
                  <span className={cManuf >= 0 ? 'text-[#ffb300]' : 'text-rose-400'}>
                    {cManuf >= 0 ? `+${cManuf.toFixed(2)}` : cManuf.toFixed(2)} p.p.
                  </span>
                </div>
                <div className="w-full bg-[#0a0e14] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#ffb300] h-full transition-all"
                    style={{ width: `${Math.min(100, Math.max(5, Math.abs(cManuf) * 50))}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Energía & Servicios:</span>
                  <span className={(cEnergy + cServices) >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {(cEnergy + cServices) >= 0 ? `+${(cEnergy + cServices).toFixed(2)}` : (cEnergy + cServices).toFixed(2)} p.p.
                  </span>
                </div>
                <div className="w-full bg-[#0a0e14] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full transition-all"
                    style={{ width: `${Math.min(100, Math.max(5, Math.abs(cEnergy + cServices) * 50))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Automated AI Economic Diagnosis */}
          <div className="p-4 rounded-xl bg-[#0a0e14] border border-white/10 text-xs font-sans text-slate-300 leading-relaxed">
            <span className="font-mono text-[#00ff88] font-bold block mb-1">DIAGNÓSTICO MACROECONÓMICO:</span>
            {totalIppMoM > 0.8 ? (
              <p>
                ⚠️ <strong>Presión de Costos Fuerte:</strong> La variación del IPP (+{totalIppMoM}%) se encuentra en el percentil superior. Se recomienda a la autoridad monetaria monitorear la tasa de interés ante un posible contagio a la inflación subyacente.
              </p>
            ) : totalIppMoM < 0 ? (
              <p>
                📉 <strong>Deflación de Producción:</strong> Caída en cotizaciones mayoristas ({totalIppMoM}%), liderada por minería o alimentos. Alivia los costos industriales pero podría comprimir márgenes corporativos.
              </p>
            ) : (
              <p>
                ✅ <strong>Régimen Moderado:</strong> La variación mensual (+{totalIppMoM}%) es coherente con una trayectoria de convergencia hacia la meta inflacionaria del Banco Central.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
