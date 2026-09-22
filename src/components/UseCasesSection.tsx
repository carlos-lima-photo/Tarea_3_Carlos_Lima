import React, { useState } from 'react';
import { Landmark, Building2, FileText, Truck, ChevronRight, CheckCircle2 } from 'lucide-react';

export const UseCasesSection: React.FC = () => {
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      id: 'central-bank',
      icon: Landmark,
      title: 'Banca Central & Política Monetaria',
      tag: 'Macro Targeting',
      color: '#00ff88',
      summary: 'Detección temprana de presiones de oferta para calibrar la tasa de interés de intervención antes de que se traslade al IPC.',
      bullets: [
        'Indicador adelantado de 60 a 90 días frente a la inflación minorista de la canasta familiar.',
        'Permite discriminar entre inflación por shock de demanda (exceso de liquidez) vs. shock de oferta en costos.',
        'Entrada obligatoria en los Modelos de Equilibrio General Dinámico Estocástico (DSGE) y funciones de Taylor.'
      ],
      practicalExample: 'Si el IPP de manufactura sube +1.5% MoM impulsado por energía, la Junta Directiva puede anticipar un repunte en el IPC subyacente y adoptar una postura preventiva sin esperar los datos rezagados del consumidor.'
    },
    {
      id: 'national-accounts',
      icon: Building2,
      title: 'Cuentas Nacionales & Deflactación del PIB',
      tag: 'Contabilidad Social',
      color: '#00f0ff',
      summary: 'Conversión del Producto Interno Bruto nominal a precios constantes para medir el crecimiento económico real.',
      bullets: [
        'Deflactación precisa por rama de actividad económica según la Matriz de Insumo-Producto.',
        'Elimina la distorsión monetaria nominal de la facturación empresarial para obtener el volumen físico producido.',
        'Cálculo del Valor Agregado Bruto (VAB) real en manufactura, minería y agro.'
      ],
      practicalExample: 'Una acería factura un 20% más en pesos este año; si el IPP siderúrgico aumentó 18%, el crecimiento en volumen físico real de acero producido fue de tan solo 1.7%.'
    },
    {
      id: 'contracts',
      icon: FileText,
      title: 'Sector Empresarial & Contratos de Suministro',
      tag: 'Fórmula Polinómica',
      color: '#ffb300',
      summary: 'Indexación transparente de precios en licitaciones de obras civiles, energía y contratos corporativos de largo plazo.',
      bullets: [
        'Blindaje contra la inflación de materias primas mediante fórmulas polinómicas oficiales (P = P0 * [a(IPP_cemento) + b(IPP_acero) + c(Salario)]).',
        'Evita litigios contractuales y solicitudes de reequilibrio económico en concesiones viales e infraestructura pública.',
        'Base objetiva para la negociación colectiva de compras mayoristas B2B.'
      ],
      practicalExample: 'Un contrato de construcción de un viaducto a 4 años reajusta mensualmente el pago por metro cúbico de concreto utilizando el subíndice oficial CIIU C2394 del IPP.'
    },
    {
      id: 'supply-chain',
      icon: Truck,
      title: 'Logística & Gestión de Cadenas de Suministro',
      tag: 'Supply Chain Risk',
      color: '#a855f7',
      summary: 'Mitigación de riesgos operativos, compras anticipadas (Forward buying) y fijación de precios dinámicos.',
      bullets: [
        'Monitoreo de la dispersión de precios en proveedores críticos de insumos y empaques.',
        'Benchmarking de compras: Evaluar si el departamento de adquisiciones compra mejor o peor que el promedio del sector.',
        'Estrategias de cobertura (hedging) en contratos de derivados financieros.'
      ],
      practicalExample: 'Una empresa de alimentos compara el incremento que le exige su proveedor de cartón corrugado frente al subíndice IPP de envases de papel; si el proveedor pide +12% y el IPP subió solo +3%, la empresa frena el alza abusiva.'
    }
  ];

  return (
    <section id="casos-uso" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb300]/10 border border-[#ffb300]/30 text-[#ffb300] text-xs font-mono mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>MÓDULO 09 • APLICACIONES SECTORIALES & CASOS DE USO</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Casos de Uso del IPP en la <span className="text-[#ffb300]">Economía Real</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mt-2 text-sm sm:text-base">
          El Índice de Precios al Productor no es solo un indicador académico: es la piedra angular sobre la que se fijan tasas de interés, se deflacta el PIB y se reajustan miles de millones en contratos de infraestructura.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Selector */}
        <div className="lg:col-span-4 space-y-3">
          {cases.map((cs, idx) => {
            const Icon = cs.icon;
            const isSelected = activeCase === idx;
            return (
              <button
                key={cs.id}
                onClick={() => setActiveCase(idx)}
                className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#0d1117] border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.15)]'
                    : 'bg-[#0a0e14] border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{ borderColor: `${cs.color}40`, backgroundColor: `${cs.color}10` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cs.color }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono block text-slate-400">{cs.tag}</span>
                    <h4 className="font-bold text-sm text-white">{cs.title}</h4>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-[#00ff88]' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Detailed Case View */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-[#00ff88] border border-[#00ff88]/20">
                {cases[activeCase].tag}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1.5">{cases[activeCase].title}</h3>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {cases[activeCase].summary}
          </p>

          <div className="space-y-3 mb-6">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400">Impacto y Mecanismos Clave:</h4>
            {cases[activeCase].bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#0a0e14] border border-white/10">
            <span className="font-mono text-[10px] text-[#00f0ff] uppercase block mb-1">
              EJEMPLO PRÁCTICO EN OPERACIÓN:
            </span>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {cases[activeCase].practicalExample}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
