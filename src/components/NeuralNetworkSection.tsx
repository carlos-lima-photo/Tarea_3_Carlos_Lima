import React, { useState, useEffect } from 'react';
import { Cpu, Play, RotateCcw, Activity, Layers, ArrowRight, Zap, Check } from 'lucide-react';

export const NeuralNetworkSection: React.FC = () => {
  const [lags, setLags] = useState(6);
  const [hiddenUnits, setHiddenUnits] = useState(64);
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(50);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(100);
  const [currentLoss, setCurrentLoss] = useState(0.018);

  // Simulated synthetic series for demonstration
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep (t)', 'Oct (t+1)', 'Nov (t+2)', 'Dic (t+3)'];
  const realIpp = [128.0, 128.5, 129.4, 130.2, 130.8, 131.5, 131.9, 132.3, 132.8, 133.4, 134.1, 134.9];
  
  // LSTM predicted line dynamically adjusts based on parameters
  const getPredictedCurve = () => {
    // Better fit with more hidden units & epochs
    const fitFactor = Math.min(1, (hiddenUnits / 64) * (epochs / 50) * 0.95);
    return realIpp.map((val, idx) => {
      if (idx <= 8) {
        // Historical fitting
        const error = (Math.sin(idx * 1.5) * 0.5) * (1 - fitFactor);
        return Number((val + error).toFixed(2));
      } else {
        // Forecast
        const trend = (idx - 8) * (0.55 + (lags / 12) * 0.15);
        return Number((realIpp[8] + trend).toFixed(2));
      }
    });
  };

  const [predictedIpp, setPredictedIpp] = useState(getPredictedCurve());

  const handleTrain = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    let step = 0;
    const totalSteps = 20;

    const interval = setInterval(() => {
      step++;
      const progress = Math.round((step / totalSteps) * 100);
      setTrainingProgress(progress);

      // Decreasing loss
      const loss = Number((0.25 * Math.exp(-step / 4) + 0.015 + (Math.random() * 0.005)).toFixed(4));
      setCurrentLoss(loss);

      if (step >= totalSteps) {
        clearInterval(interval);
        setIsTraining(false);
        setPredictedIpp(getPredictedCurve());
      }
    }, 100);
  };

  useEffect(() => {
    if (!isTraining) {
      setPredictedIpp(getPredictedCurve());
    }
  }, [lags, hiddenUnits, learningRate, epochs]);

  // SVG Chart bounds
  const minVal = 127;
  const maxVal = 136;
  const getY = (val: number) => {
    const range = maxVal - minVal;
    return 180 - ((val - minVal) / range) * 150;
  };
  const getX = (idx: number) => 40 + idx * 55;

  const realPointsStr = realIpp.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');
  const predPointsStr = predictedIpp.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');

  return (
    <section id="redes-lstm" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>MÓDULO 04 • DEEP LEARNING & REDES NEURONALES RECURRENTES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Arquitectura LSTM para <span className="text-[#00ff88]">Pronóstico de Inflación Mayorista</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mt-2 text-sm sm:text-base">
          Las redes de memoria de largo y corto plazo (LSTM) son ideales para capturar dependencias temporales complejas en la transmisión de costos de commodities hacia el IPP general.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00ff88]" />
              HIPERPARÁMETROS DE LA RED
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00ff88] border border-[#00ff88]/20">
              PYTORCH / TF
            </span>
          </div>

          {/* Lags */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">RETARDOS TEMPORALES (LAGS):</span>
              <span className="text-[#00ff88] font-bold">{lags} meses</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={lags}
              onChange={(e) => setLags(Number(e.target.value))}
              className="w-full accent-[#00ff88]"
            />
            <span className="text-[10px] text-slate-500 font-mono">Ventana deslizante de entrada t-k</span>
          </div>

          {/* Hidden units */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">NEURONAS / CAPAS OCULTAS:</span>
              <span className="text-[#00f0ff] font-bold">{hiddenUnits} unidades</span>
            </div>
            <input
              type="range"
              min="8"
              max="128"
              step="8"
              value={hiddenUnits}
              onChange={(e) => setHiddenUnits(Number(e.target.value))}
              className="w-full accent-[#00f0ff]"
            />
            <span className="text-[10px] text-slate-500 font-mono">Dimensión del estado de celda c_t</span>
          </div>

          {/* Learning rate */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">LEARNING RATE (η):</span>
              <span className="text-[#ffb300] font-bold">{learningRate}</span>
            </div>
            <input
              type="range"
              min="0.001"
              max="0.05"
              step="0.002"
              value={learningRate}
              onChange={(e) => setLearningRate(Number(e.target.value))}
              className="w-full accent-[#ffb300]"
            />
            <span className="text-[10px] text-slate-500 font-mono">Optimizador Adam / gradiente</span>
          </div>

          {/* Epochs */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-300">ÉPOCAS DE ENTRENAMIENTO:</span>
              <span className="text-white font-bold">{epochs}</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="10"
              value={epochs}
              onChange={(e) => setEpochs(Number(e.target.value))}
              className="w-full accent-white"
            />
          </div>

          {/* Train Button */}
          <button
            onClick={handleTrain}
            disabled={isTraining}
            id="btn-train-lstm"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00e676] text-black font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-95 hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-all disabled:opacity-50"
          >
            {isTraining ? (
              <>
                <Activity className="w-4 h-4 animate-spin" />
                ENTRENANDO ({trainingProgress}%)...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                SIMULAR ENTRENAMIENTO EN TIEMPO REAL
              </>
            )}
          </button>

          {/* Real-time Loss Indicator */}
          <div className="bg-[#0a0e14] p-3 rounded-lg border border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">PÉRDIDA (LOSS MSE):</span>
            <span className="text-[#00ff88] font-bold">{currentLoss}</span>
          </div>
        </div>

        {/* Network & Chart Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* LSTM Architecture Diagram */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <span className="text-xs font-mono text-slate-400 block mb-3 uppercase tracking-wider">
              FLUJO COMPUTACIONAL DE LA CELDA LSTM:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#0a0e14] border border-[#00f0ff]/30">
                <span className="text-[10px] text-[#00f0ff] block font-bold">1. FORGET GATE (f_t)</span>
                <p className="text-[11px] text-slate-300 mt-1 font-sans">
                  Decide qué shocks de precios antiguos olvidar usando sigmoide.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#0a0e14] border border-[#00ff88]/30">
                <span className="text-[10px] text-[#00ff88] block font-bold">2. INPUT GATE (i_t)</span>
                <p className="text-[11px] text-slate-300 mt-1 font-sans">
                  Actualiza el estado de la celda con nuevas cotizaciones reportadas.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#0a0e14] border border-[#ffb300]/30">
                <span className="text-[10px] text-[#ffb300] block font-bold">3. CELL STATE (C_t)</span>
                <p className="text-[11px] text-slate-300 mt-1 font-sans">
                  Línea de memoria a largo plazo que transporta la tendencia de fondo.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#0a0e14] border border-white/20">
                <span className="text-[10px] text-white block font-bold">4. OUTPUT (o_t)</span>
                <p className="text-[11px] text-slate-300 mt-1 font-sans">
                  Emite la predicción del IPP para horizontes t+1, t+3 y t+6.
                </p>
              </div>
            </div>
          </div>

          {/* Chart View: Real vs LSTM Predicted */}
          <div className="glass-panel p-6 rounded-2xl border border-[#00ff88]/30 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h4 className="font-mono text-sm font-bold text-white">
                CONVERGENCIA DEL MODELO: SERIE REAL VS. PREDICCIÓN LSTM
              </h4>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-3 h-0.5 bg-slate-300 inline-block" />
                  Real Histórico
                </span>
                <span className="flex items-center gap-1.5 text-[#00ff88]">
                  <span className="w-3 h-0.5 bg-[#00ff88] inline-block shadow-[0_0_8px_#00ff88]" />
                  Ajuste / Pronóstico LSTM
                </span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 700 220" className="w-full min-w-[580px] h-52">
                {/* Horizontal grid lines */}
                {[128, 130, 132, 134, 136].map((v) => (
                  <g key={v}>
                    <line
                      x1="35"
                      y1={getY(v)}
                      x2="680"
                      y2={getY(v)}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="4 4"
                    />
                    <text x="5" y={getY(v) + 4} fill="#64748b" fontSize="10" fontFamily="monospace">
                      {v}
                    </text>
                  </g>
                ))}

                {/* Forecast Zone Background separator */}
                <rect
                  x={getX(8.5)}
                  y="10"
                  width="200"
                  height="180"
                  fill="rgba(0, 255, 136, 0.04)"
                  stroke="rgba(0, 255, 136, 0.2)"
                  strokeDasharray="2 2"
                />
                <text
                  x={getX(8.7)}
                  y="30"
                  fill="#00ff88"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  ZONA DE PRONÓSTICO (OUT-OF-SAMPLE)
                </text>

                {/* Real Series Line */}
                <polyline
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  points={realPointsStr}
                />

                {/* Predicted Series Line */}
                <polyline
                  fill="none"
                  stroke="#00ff88"
                  strokeWidth="2.5"
                  points={predPointsStr}
                  className="drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]"
                />

                {/* Data Points */}
                {realIpp.map((v, i) => (
                  <circle
                    key={`real-${i}`}
                    cx={getX(i)}
                    cy={getY(v)}
                    r="3"
                    fill="#94a3b8"
                  />
                ))}

                {predictedIpp.map((v, i) => (
                  <circle
                    key={`pred-${i}`}
                    cx={getX(i)}
                    cy={getY(v)}
                    r="3.5"
                    fill="#00ff88"
                  />
                ))}

                {/* X-axis labels */}
                {months.map((m, i) => (
                  <text
                    key={m}
                    x={getX(i)}
                    y="205"
                    textAnchor="middle"
                    fill={i > 8 ? '#00ff88' : '#64748b'}
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {m}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
