import React, { useState } from 'react';
import { ANOMALIES_MOCK } from '../data/macroData';
import { ShieldAlert, AlertTriangle, CheckCircle, Search, RefreshCw, Filter, Sparkles } from 'lucide-react';
import { AnomalyRecord } from '../types';

export const AnomalyDetectionSection: React.FC = () => {
  const [anomalies, setAnomalies] = useState<AnomalyRecord[]>(ANOMALIES_MOCK);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    setScanMessage(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanMessage('✅ Escaneo completado: 142.850 cotizaciones auditadas. 2 nuevas alertas clasificadas con Isolation Forest.');
      // Add a simulated new alert
      const newAlert: AnomalyRecord = {
        id: `ALR-2026-09${Math.floor(Math.random() * 9)}`,
        timestamp: '2026-09-21 10:32',
        establishmentId: 'EST-MAN-4491',
        productName: 'Cemento Portland Tipo 1 (saco 50kg)',
        ciiuCode: 'C2394',
        sector: 'Minerales No Metálicos',
        reportedPrice: 38500.0,
        expectedPrice: 28900.0,
        deviationPercent: +33.22,
        detector: 'Isolation Forest',
        severity: 'Moderada',
        status: 'En Investigación'
      };
      setAnomalies((prev) => [newAlert, ...prev]);
    }, 1200);
  };

  const handleUpdateStatus = (id: string, newStatus: AnomalyRecord['status']) => {
    setAnomalies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filtered = anomalies.filter((a) => {
    if (filterSeverity === 'all') return true;
    return a.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  return (
    <section id="anomalias" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>MÓDULO 08 • SUPERVISIÓN ESTADÍSTICA Y AUDITORÍA ALGORÍTMICA</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Detección de Anomalías & <span className="text-rose-400">Alertas en Precios</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mt-2 text-sm sm:text-base">
          Supervisión automática para blindar la calidad estadística del IPP. Algoritmos de Isolation Forest y Z-Score Robusto detectan errores de digitación, picos artificiales de especulación o presunción de colusión comercial.
        </p>
      </div>

      {/* Pipeline Diagram of AI Evaluation */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 mb-8">
        <span className="text-xs font-mono text-slate-400 block mb-4 uppercase tracking-wider">
          FLUJO ALGORÍTMICO DE EVALUACIÓN DE COTIZACIONES:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#0a0e14] border border-white/10">
            <span className="text-[10px] text-[#00f0ff] font-bold block mb-1">1. PRECIO CAPTURADO</span>
            <p className="text-[11px] text-slate-300 font-sans">
              Cotización transmitida por API o recolector de campo en el establecimiento informante.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0e14] border border-[#00ff88]/30">
            <span className="text-[10px] text-[#00ff88] font-bold block mb-1">2. EVALUACIÓN IA</span>
            <p className="text-[11px] text-slate-300 font-sans">
              Isolation Forest & MAD comparan el precio contra la distribución histórica y el vecindario de pares.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0e14] border border-[#ffb300]/30">
            <span className="text-[10px] text-[#ffb300] font-bold block mb-1">3. CLASIFICACIÓN</span>
            <p className="text-[11px] text-slate-300 font-sans">
              Puntaje de anomalía: Válido, Sospechoso Moderado o Outlier Crítico (Desviación &gt; 3σ).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0e14] border border-rose-500/30">
            <span className="text-[10px] text-rose-400 font-bold block mb-1">4. ACCIÓN DE CAMPO</span>
            <p className="text-[11px] text-slate-300 font-sans">
              Revisión presencial, confirmación de factura comercial o imputación metodológica inmediata.
            </p>
          </div>
        </div>
      </div>

      {/* Live Table Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Filtrar Severidad:
          </span>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-[#0a0e14] border border-white/10 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-[#00ff88]"
          >
            <option value="all">Todas las severidades</option>
            <option value="crítica">Solo Críticas</option>
            <option value="moderada">Solo Moderadas</option>
          </select>
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning}
          id="btn-scan-anomalies"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/20 border border-rose-500/50 text-rose-300 font-mono text-xs hover:bg-rose-500/30 hover:border-rose-400 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Escaneando 140k registros...' : 'Ejecutar Escaneo de Anomalías en Lote'}
        </button>
      </div>

      {scanMessage && (
        <div className="mb-4 p-3 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] font-mono text-xs">
          {scanMessage}
        </div>
      )}

      {/* Anomalies Audit Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left font-mono text-xs">
            <thead className="bg-[#070a0e] text-slate-400 border-b border-white/10 text-[11px]">
              <tr>
                <th className="py-3 px-4">ID / Timestamp</th>
                <th className="py-3 px-4">Establecimiento</th>
                <th className="py-3 px-4">Producto / CIIU</th>
                <th className="py-3 px-4 text-right">Precio Reportado</th>
                <th className="py-3 px-4 text-right">Desviación %</th>
                <th className="py-3 px-4">Algoritmo Detector</th>
                <th className="py-3 px-4">Severidad</th>
                <th className="py-3 px-4">Estado / Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-white block">{item.id}</span>
                    <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{item.establishmentId}</td>
                  <td className="py-3 px-4">
                    <span className="text-white block font-medium font-sans">{item.productName}</span>
                    <span className="text-[10px] text-slate-400">{item.ciiuCode} • {item.sector}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-200">
                    <div>${item.reportedPrice.toLocaleString('es-CO')}</div>
                    <span className="text-[10px] text-slate-500">Exp: ${item.expectedPrice.toLocaleString('es-CO')}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-bold ${
                        item.deviationPercent > 40
                          ? 'text-rose-400'
                          : item.deviationPercent > 20
                          ? 'text-[#ffb300]'
                          : 'text-[#00f0ff]'
                      }`}
                    >
                      {item.deviationPercent > 0 ? `+${item.deviationPercent}%` : `${item.deviationPercent}%`}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                      {item.detector}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.severity === 'Crítica'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item.id, e.target.value as any)}
                        className="bg-[#0a0e14] border border-white/10 rounded px-2 py-1 text-[11px] text-slate-300 outline-none focus:border-[#00ff88]"
                      >
                        <option value="En Investigación">En Investigación</option>
                        <option value="Confirmado Atípico">Confirmado Atípico</option>
                        <option value="Imputado">Imputado</option>
                        <option value="Resuelto">Resuelto</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
