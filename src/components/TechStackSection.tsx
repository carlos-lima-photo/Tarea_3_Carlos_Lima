import React from 'react';
import { Terminal, Database, Cpu, Code2, Server, Globe } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const technologies = [
    {
      name: 'Python',
      category: 'Core Language',
      role: 'Lenguaje estándar para pipelines ETL, web scraping de cotizaciones B2B y orquestación de modelos de Machine Learning.',
      badge: 'v3.12+'
    },
    {
      name: 'Pandas & NumPy',
      category: 'Data Wrangling',
      role: 'Estructuras de series de tiempo de alta dimensión, álgebra matricial para la fórmula de Laspeyres encadenada y transformaciones vectorizadas.',
      badge: 'Vectorized'
    },
    {
      name: 'Statsmodels',
      category: 'Econometrics',
      role: 'Estimación rigurosa de modelos SARIMAX, pruebas de raíces unitarias (ADF/KPSS), cointegración de Johansen y desestacionalización X-13.',
      badge: 'Strict Stats'
    },
    {
      name: 'Scikit-Learn',
      category: 'Machine Learning',
      role: 'Algoritmos de Isolation Forest, RobustScaler (MAD), imputadores KNN y modelos de regresión supervisada con validación cruzada temporal.',
      badge: 'Production ML'
    },
    {
      name: 'PyTorch / TensorFlow',
      category: 'Deep Learning',
      role: 'Entrenamiento de redes neuronales recurrentes LSTM y arquitecturas Transformer para pronóstico de inflación no-lineal.',
      badge: 'Neural Nets'
    },
    {
      name: 'R (tseries / plm)',
      category: 'Econometrics',
      role: 'Validación cruzada institucional con modelos de datos de panel (Panel Data) y pruebas formales de estacionalidad del FMI.',
      badge: 'Academic Standard'
    },
    {
      name: 'DuckDB & SQL',
      category: 'Database Engine',
      role: 'Consultas analíticas OLAP ultrarrápidas sobre millones de registros históricos de precios con compresión columnar Parquet.',
      badge: 'OLAP / Parquet'
    },
    {
      name: 'FastAPI',
      category: 'Backend Microservices',
      role: 'API REST asíncrona de alto rendimiento que entrega los índices calculados con endpoints documentados OpenAPI para analistas.',
      badge: 'REST API'
    },
    {
      name: 'Docker & Kubernetes',
      category: 'Infrastructure',
      role: 'Contenedores reproducibles para garantizar que los cálculos estadísticos generen resultados idénticos sin importar el host.',
      badge: 'Cloud Native'
    },
    {
      name: 'PowerBI / Tableau',
      category: 'BI & Dissemination',
      role: 'Tableros ejecutivos interactivos para la Junta Directiva de la Banca Central y ministerios de hacienda pública.',
      badge: 'BI Analytics'
    }
  ];

  return (
    <section id="tech-stack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono mb-3">
          <Code2 className="w-3.5 h-3.5" />
          <span>MÓDULO 10 • ECOSISTEMA TECNOLÓGICO & HERRAMIENTAS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Tech Stack de <span className="text-[#00f0ff]">Analítica Económica & Data Science</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mt-2 text-sm sm:text-base">
          Arquitectura tecnológica institucional para procesar, auditar y diseminar índices de precios al productor a escala nacional con trazabilidad matemática reproducible.
        </p>
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="glass-panel p-5 rounded-xl border border-white/10 hover:border-[#00f0ff]/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">{tech.category}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#00ff88] border border-[#00ff88]/20">
                  {tech.badge}
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
                {tech.name}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{tech.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
