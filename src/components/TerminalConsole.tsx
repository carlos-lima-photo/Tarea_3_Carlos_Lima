import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Maximize2, Minimize2, Trash2, HelpCircle, CornerDownLeft, Sparkles } from 'lucide-react';
import { SECTORS } from '../data/macroData';

interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sys.boot',
      output: (
        <div className="text-slate-300">
          <span className="text-[#00ff88] font-bold">IPP ANALYTICS TERMINAL v4.2.0-STABLE</span>
          <br />
          <span className="text-slate-400">Núcleo de Inteligencia Macroeconómica inicializado. Escribe </span>
          <span className="text-[#00f0ff] font-bold">help</span>
          <span className="text-slate-400"> para consultar el catálogo de comandos.</span>
        </div>
      ),
      timestamp: '10:30:00'
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const now = new Date().toLocaleTimeString('es-ES');
    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();

    let output: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-[#00ff88] font-bold">COMANDOS DISPONIBLES EN EL KERNEL:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div><span className="text-[#00f0ff] font-bold">help</span>: Lista de comandos del sistema.</div>
              <div><span className="text-[#00f0ff] font-bold">ipp.status</span>: Estado de captura y último índice nacional.</div>
              <div><span className="text-[#00f0ff] font-bold">ipp.calculate --sector=[sec]</span>: Cálculo sectorial (ej. manufactura).</div>
              <div><span className="text-[#00f0ff] font-bold">ml.predict --target=ipp --months=[n]</span>: Ejecuta pronóstico LSTM.</div>
              <div><span className="text-[#00f0ff] font-bold">anomaly.scan</span>: Auditoría en lote de 142k cotizaciones.</div>
              <div><span className="text-[#00f0ff] font-bold">basket.weights</span>: Matriz de ponderaciones CIIU de la canasta.</div>
              <div><span className="text-[#00f0ff] font-bold">stress.test --oil=+25</span>: Simulación de shock macroeconómico.</div>
              <div><span className="text-[#00f0ff] font-bold">clear</span>: Limpia el búfer de la pantalla.</div>
            </div>
          </div>
        );
        break;

      case 'ipp.status':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-[#00ff88] font-bold">ESTADO DE LA RED ESTADÍSTICA:</div>
            <div>• IPP General Actual: <span className="text-[#00ff88] font-bold">+0.45% MoM</span> (YoY: +4.82%)</div>
            <div>• Cobertura de Muestra: <span className="text-[#00f0ff]">99.4%</span> (2.840 establecimientos activos)</div>
            <div>• Cotizaciones Procesadas: <span className="text-white">142.850 / mes</span></div>
            <div>• Tasa de Imputación: <span className="text-[#ffb300]">1.2%</span> (Dentro del SLA &lt; 2%)</div>
            <div>• Estatus de Cálculo: <span className="text-[#00ff88]">CONVERGENCIA ADITIVA 100% OK</span></div>
          </div>
        );
        break;

      case 'basket.weights':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-[#00f0ff] font-bold">PONDERACIONES DE LA CANASTA NACIONAL (CIIU Rev. 4):</div>
            {SECTORS.map((s) => (
              <div key={s.id} className="flex justify-between max-w-md">
                <span>{s.code} - {s.name}:</span>
                <span className="text-[#00ff88] font-bold">{s.weight}%</span>
              </div>
            ))}
            <div className="text-slate-500 border-t border-white/10 pt-1 mt-1 max-w-md flex justify-between">
              <span>TOTAL CANASTA AGREGADA:</span>
              <span className="text-white font-bold">100.0%</span>
            </div>
          </div>
        );
        break;

      case 'anomaly.scan':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-rose-400 font-bold">EJECUTANDO ESCANEO DE ANOMALÍAS (ISOLATION FOREST + MAD):</div>
            <div className="text-slate-400">Analizando 142.850 cotizaciones en memoria caché...</div>
            <div className="text-[#00ff88]">✓ 142.836 cotizaciones dentro de la banda de tolerancia normal (&lt; 3σ)</div>
            <div className="text-[#ffb300]">⚠ 11 cotizaciones con sospecha moderada de quiebre de inventario</div>
            <div className="text-rose-400">🚨 3 alertas críticas emitidas para inspección física en campo (C2013, C2012, A0113)</div>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        return;

      default:
        if (trimmed.startsWith('ipp.calculate')) {
          const sectorArg = parts.find((p) => p.startsWith('--sector='))?.split('=')[1] || 'general';
          output = (
            <div className="space-y-1 text-slate-300">
              <div className="text-[#00ff88] font-bold">CÁLCULO DEL ÍNDICE SECTORIAL: [{sectorArg.toUpperCase()}]</div>
              <div>• Metodología: Laspeyres Encadenado (Jevons en nivel elemental)</div>
              <div>• Variación mensual calculada: <span className="text-[#00ff88] font-bold">+0.58%</span></div>
              <div>• Contribución al IPP general: <span className="text-[#00f0ff] font-bold">+0.19 p.p.</span></div>
              <div>• Intervalo de confianza (95%): [+0.48%, +0.68%]</div>
            </div>
          );
        } else if (trimmed.startsWith('ml.predict')) {
          output = (
            <div className="space-y-1 text-slate-300">
              <div className="text-[#00f0ff] font-bold">EJECUCIÓN DEL MODELO PREDICTIVO (LSTM NEURAL REGRESSOR):</div>
              <div>• Horizonte: t+1 a t+6 meses</div>
              <div>• Pronóstico IPP t+1: <span className="text-[#00ff88] font-bold">133.4 pts (+0.45% MoM)</span></div>
              <div>• Pronóstico IPP t+3: <span className="text-[#00ff88] font-bold">134.9 pts (+1.12% acum)</span></div>
              <div>• Pronóstico IPP t+6: <span className="text-[#ffb300] font-bold">136.8 pts (+2.54% acum)</span></div>
              <div>• Pass-through estimado a IPC minorista: <span className="text-slate-200">0.71 (moderado)</span></div>
            </div>
          );
        } else if (trimmed.startsWith('stress.test')) {
          output = (
            <div className="space-y-1 text-slate-300">
              <div className="text-[#ffb300] font-bold">STRESS TESTING ECONOMÉTRICO (SHOCK SIMULADO):</div>
              <div>• Parámetro de choque aplicado: Crudo Brent +25.0%</div>
              <div>• Impacto directo en IPP Minero: <span className="text-rose-400 font-bold">+4.65%</span></div>
              <div>• Impacto en IPP Manufacturero: <span className="text-[#ffb300] font-bold">+1.84%</span></div>
              <div>• Desfase medio de transmisión al IPC: <span className="text-[#00f0ff]">2.1 meses</span></div>
            </div>
          );
        } else {
          output = (
            <div className="text-rose-400">
              Comando no reconocido: "{trimmed}". Escribe <span className="text-[#00ff88] font-bold">help</span> para ver la lista de comandos válidos.
            </div>
          );
        }
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output,
        timestamp: now
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all font-mono shadow-2xl ${
        isMaximized
          ? 'inset-4 rounded-xl border border-[#00ff88]/50 glow-green'
          : 'bottom-4 right-4 left-4 sm:left-auto sm:w-[620px] h-[480px] rounded-xl border border-[#00ff88]/40 glow-green'
      } bg-[#0a0e14]/95 backdrop-blur-xl flex flex-col overflow-hidden`}
    >
      {/* Terminal Title Bar */}
      <div className="bg-[#070a0e] px-4 py-2.5 border-b border-white/10 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00ff88]" />
          <span className="text-xs font-bold text-white tracking-wider">
            IPP-CLI CONSOLE <span className="text-[#00ff88] text-[10px]">● INTERACTIVE</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <button
            onClick={() => setLogs([])}
            className="p-1 hover:text-white transition-colors"
            title="Limpiar pantalla"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:text-white transition-colors"
            title={isMaximized ? 'Restaurar' : 'Maximizar'}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:text-rose-400 transition-colors"
            title="Cerrar consola"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Commands Bar */}
      <div className="px-3 py-1.5 bg-[#0d1117] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-[10px]">
        <span className="text-slate-500 shrink-0">Sugerencias:</span>
        {['help', 'ipp.status', 'basket.weights', 'anomaly.scan', 'ml.predict --target=ipp'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              setInputVal(cmd);
              inputRef.current?.focus();
            }}
            className="px-2 py-0.5 rounded bg-white/5 text-[#00f0ff] hover:bg-[#00f0ff]/15 shrink-0 border border-white/5"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Logs View Area */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {logs.map((log) => (
          <div key={log.id} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-[#00ff88]">analyst@ipp-terminal:~$</span>
              <span className="text-white font-bold">{log.command}</span>
              <span className="text-[10px] text-slate-600 ml-auto">{log.timestamp}</span>
            </div>
            <div className="pl-4 border-l border-white/10 text-slate-300">
              {log.output}
            </div>
          </div>
        ))}
      </div>

      {/* Input Prompt */}
      <div className="p-3 bg-[#070a0e] border-t border-white/10 flex items-center gap-2 text-xs">
        <span className="text-[#00ff88] shrink-0">analyst@ipp-terminal:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un comando (ej: help, ipp.status, anomaly.scan)..."
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-slate-600"
        />
        <button
          onClick={() => {
            executeCommand(inputVal);
            setInputVal('');
          }}
          className="p-1 rounded text-[#00ff88] hover:bg-[#00ff88]/10"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
