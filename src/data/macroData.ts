import { SectorData, MacroDataPoint, MLModelSpec, PipelineStage, AnomalyRecord, ScenarioDefinition, SubsectorContribution } from '../types';

export const SECTORS: SectorData[] = [
  {
    id: 'agri',
    name: 'Agricultura, Ganadería, Caza y Pesca',
    code: 'CIIU Sección A',
    weight: 15.4,
    momChange: 1.85,
    yoyChange: 8.24,
    volatility: 4.12,
    sampleBasket: ['Café pergamino', 'Frutas y cítricos', 'Ganado vacuno en pie', 'Papas y tubérculos', 'Maíz amarillo'],
    passThroughRate: 0.88,
    description: 'Elevada volatilidad por choques climáticos (El Niño/La Niña), estacionalidad de cosechas e insumos de fertilizantes nitrogenados.'
  },
  {
    id: 'mining',
    name: 'Explotación de Minas y Canteras',
    code: 'CIIU Sección B',
    weight: 18.6,
    momChange: -0.92,
    yoyChange: -3.45,
    volatility: 6.85,
    sampleBasket: ['Petróleo crudo Brent/WTI', 'Carbón térmico', 'Gas natural en boca de pozo', 'Minerales de níquel y oro'],
    passThroughRate: 0.62,
    description: 'Fuerte dolarización y exposición a cotizaciones internacionales en bolsas de commodities (ICE, NYMEX, LME).'
  },
  {
    id: 'manuf',
    name: 'Industrias Manufactureras',
    code: 'CIIU Sección C',
    weight: 48.2,
    momChange: 0.42,
    yoyChange: 4.15,
    volatility: 1.95,
    sampleBasket: ['Alimentos procesados y bebidas', 'Productos químicos y plásticos', 'Metales básicos y siderurgia', 'Cemento y materiales de construcción'],
    passThroughRate: 0.74,
    description: 'El núcleo de la oferta industrial agregada. Transmite costos con un rezago promedio de 1.5 a 3 meses hacia el IPC final.'
  },
  {
    id: 'energy',
    name: 'Suministro de Electricidad, Gas y Agua',
    code: 'CIIU Sección D/E',
    weight: 9.8,
    momChange: 1.15,
    yoyChange: 6.90,
    volatility: 3.40,
    sampleBasket: ['Generación eléctrica en bolsa', 'Distribución de gas por tubería', 'Captación y distribución de agua potable'],
    passThroughRate: 0.81,
    description: 'Dependiente del nivel de embalses hídricos, precios del gas combustible y regulación tarifaria de servicios públicos.'
  },
  {
    id: 'services',
    name: 'Servicios Logísticos y Transporte de Carga',
    code: 'CIIU Sección H/I',
    weight: 8.0,
    momChange: 0.28,
    yoyChange: 3.80,
    volatility: 1.35,
    sampleBasket: ['Transporte de carga terrestre', 'Almacenamiento y bodegaje', 'Servicios portuarios y aduaneros'],
    passThroughRate: 0.55,
    description: 'Corredor de transmisión de costos entre productores primarios y distribución mayorista. Sensible al precio del ACPM/Diesel.'
  }
];

export const HISTORICAL_SERIES: MacroDataPoint[] = [
  { period: '2025-01', ipp: 122.4, ipc: 128.6, ippMoM: 0.45, ipcMoM: 0.62, usdCop: 4050, brentOil: 78.2, fertPrices: 142.1 },
  { period: '2025-02', ipp: 123.1, ipc: 129.4, ippMoM: 0.57, ipcMoM: 0.61, usdCop: 4080, brentOil: 81.5, fertPrices: 144.3 },
  { period: '2025-03', ipp: 123.6, ipc: 130.1, ippMoM: 0.41, ipcMoM: 0.54, usdCop: 4110, brentOil: 83.2, fertPrices: 146.0 },
  { period: '2025-04', ipp: 124.5, ipc: 130.7, ippMoM: 0.73, ipcMoM: 0.46, usdCop: 4140, brentOil: 86.8, fertPrices: 149.2 },
  { period: '2025-05', ipp: 124.9, ipc: 131.2, ippMoM: 0.32, ipcMoM: 0.38, usdCop: 4105, brentOil: 84.1, fertPrices: 147.8 },
  { period: '2025-06', ipp: 125.2, ipc: 131.6, ippMoM: 0.24, ipcMoM: 0.30, usdCop: 4090, brentOil: 82.5, fertPrices: 145.4 },
  { period: '2025-07', ipp: 125.8, ipc: 132.1, ippMoM: 0.48, ipcMoM: 0.38, usdCop: 4125, brentOil: 84.7, fertPrices: 148.1 },
  { period: '2025-08', ipp: 126.3, ipc: 132.6, ippMoM: 0.40, ipcMoM: 0.37, usdCop: 4160, brentOil: 85.9, fertPrices: 150.3 },
  { period: '2025-09', ipp: 127.1, ipc: 133.1, ippMoM: 0.63, ipcMoM: 0.38, usdCop: 4190, brentOil: 89.2, fertPrices: 153.8 },
  { period: '2025-10', ipp: 127.6, ipc: 133.8, ippMoM: 0.39, ipcMoM: 0.52, usdCop: 4180, brentOil: 87.4, fertPrices: 151.9 },
  { period: '2025-11', ipp: 128.0, ipc: 134.4, ippMoM: 0.31, ipcMoM: 0.45, usdCop: 4150, brentOil: 83.9, fertPrices: 149.5 },
  { period: '2025-12', ipp: 128.5, ipc: 135.1, ippMoM: 0.39, ipcMoM: 0.51, usdCop: 4130, brentOil: 82.0, fertPrices: 148.0 },
  { period: '2026-01', ipp: 129.4, ipc: 136.0, ippMoM: 0.70, ipcMoM: 0.67, usdCop: 4175, brentOil: 84.5, fertPrices: 152.4 },
  { period: '2026-02', ipp: 130.2, ipc: 136.8, ippMoM: 0.62, ipcMoM: 0.58, usdCop: 4210, brentOil: 86.2, fertPrices: 155.1 },
  { period: '2026-03', ipp: 130.8, ipc: 137.5, ippMoM: 0.46, ipcMoM: 0.51, usdCop: 4235, brentOil: 88.0, fertPrices: 157.0 },
  { period: '2026-04', ipp: 131.5, ipc: 138.2, ippMoM: 0.54, ipcMoM: 0.51, usdCop: 4250, brentOil: 89.5, fertPrices: 159.2 },
  { period: '2026-05', ipp: 131.9, ipc: 138.7, ippMoM: 0.30, ipcMoM: 0.36, usdCop: 4220, brentOil: 87.1, fertPrices: 156.4 },
  { period: '2026-06', ipp: 132.3, ipc: 139.1, ippMoM: 0.30, ipcMoM: 0.29, usdCop: 4195, brentOil: 85.3, fertPrices: 154.2 },
  { period: '2026-07', ipp: 132.8, ipc: 139.6, ippMoM: 0.38, ipcMoM: 0.36, usdCop: 4230, brentOil: 86.9, fertPrices: 156.8 },
  { period: '2026-08', ipp: 133.4, ipc: 140.2, ippMoM: 0.45, ipcMoM: 0.43, usdCop: 4260, brentOil: 88.4, fertPrices: 159.0 }
];

export const SUBSECTORS: SubsectorContribution[] = [
  { subsector: 'Alimentos y Bebidas', ciiu: 'C10-C11', weight: 19.5, contributionPp: 0.18, priceChange: 0.92 },
  { subsector: 'Sustancias y Prod. Químicos', ciiu: 'C20', weight: 8.8, contributionPp: 0.09, priceChange: 1.02 },
  { subsector: 'Derivados de Petróleo y Carbón', ciiu: 'C19', weight: 7.2, contributionPp: -0.04, priceChange: -0.55 },
  { subsector: 'Metales Comunes y Siderurgia', ciiu: 'C24', weight: 5.4, contributionPp: 0.05, priceChange: 0.93 },
  { subsector: 'Minerales No Metálicos (Cemento)', ciiu: 'C23', weight: 4.1, contributionPp: 0.03, priceChange: 0.73 },
  { subsector: 'Cultivos Agrícolas Transitorios', ciiu: 'A011', weight: 9.2, contributionPp: 0.14, priceChange: 1.52 },
  { subsector: 'Crudo de Petróleo & Gas', ciiu: 'B06', weight: 14.8, contributionPp: -0.12, priceChange: -0.81 }
];

export const ML_MODELS: MLModelSpec[] = [
  {
    id: 'sarimax',
    name: 'SARIMAX (2,1,2)(1,1,1)[12]',
    category: 'Supervisado',
    algorithm: 'Autorregresivo Integrado de Media Móvil Estacional con Regresores Exógenos (Brent + TRM)',
    rmse: 0.21,
    mape: 1.34,
    r2: 0.942,
    horizon: '1 a 6 meses',
    description: 'Estándar econométrico en Bancos Centrales. Modela estacionalidad y componentes exógenos con rigurosa teoría estadística.',
    pros: 'Alta interpretabilidad de coeficientes p-valor y pruebas de raíz unitaria (Dickey-Fuller).'
  },
  {
    id: 'xgboost',
    name: 'XGBoost TimeSeries Regressor',
    category: 'Supervisado',
    algorithm: 'Extreme Gradient Boosting con Lags Temporales (t-1 a t-12) y Features de Calendario',
    rmse: 0.16,
    mape: 1.12,
    r2: 0.968,
    horizon: '1 a 3 meses',
    description: 'Captura no-linealidades complejas e interacciones cruzadas entre commodities internacionales y precios domésticos.',
    pros: 'Menor RMSE en horizontes cortos e inmunidad a multicolinealidad severa.'
  },
  {
    id: 'lstm',
    name: 'Red Neuronal Recurrente LSTM',
    category: 'Red Neuronal',
    algorithm: 'Long Short-Term Memory bidireccional con mecanismo de atención temporal',
    rmse: 0.14,
    mape: 0.98,
    r2: 0.975,
    horizon: '1 a 12 meses',
    description: 'Retiene dependencias de memoria a largo plazo (shock de insumos que tardan trimestres en propagarse en la cadena de valor).',
    pros: 'Excelente generalización en presencia de choques estructurales y cambios de régimen.'
  },
  {
    id: 'kmeans',
    name: 'K-Means Sector Clustering',
    category: 'No Supervisado',
    algorithm: 'K-Means (k=4) basado en Volatilidad Histórica, Coeficiente de Transmisión y Kurtosis',
    rmse: 0.0,
    mape: 0.0,
    r2: 0.0,
    horizon: 'Estructural',
    description: 'Clasifica los 48 subsectores industriales en clusters: "Líderes de Transmisión", "Receptores Inertes", "Alta Volatilidad Climática" y "Precios Regulados".',
    pros: 'Permite focalizar la supervisión estadística y auditoría en los sectores con mayor poder de contagio.'
  },
  {
    id: 'pca',
    name: 'PCA (Análisis de Componentes Principales)',
    category: 'No Supervisado',
    algorithm: 'Descomposición en Valores Singulares (SVD) de la matriz de precios estandarizados',
    rmse: 0.0,
    mape: 0.0,
    r2: 0.812, // Varianza explicada por PC1
    horizon: 'Latente',
    description: 'El primer componente (PC1) explica el 81.2% de la covarianza común, aislando el "Factor Inflacionario Subyacente del Productor".',
    pros: 'Elimina el ruido microeconómico individual y revela la tendencia pura de costos agregados.'
  }
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'step1',
    stepNumber: 1,
    name: 'Extracción y Captura Multi-Fuente',
    category: 'Ingesta de Datos',
    techTool: 'FastAPI + Apache Airflow + Web Scraping B2B',
    methodology: 'Captura mensual de más de 140.000 cotizaciones directas en 2.800 establecimientos informantes (fábricas, fincas, bocaminas) con verificación de precios de transacción efectivos.',
    inputs: ['Encuesta Mensual DANE/INE', 'Facturación Electrónica DIAN/SAT', 'Cotizaciones Bolsas Mercantiles'],
    outputs: ['Dataset Cruto de Precios Informados (Raw Data)', 'Metadatos de Establecimiento'],
    slaQuality: '99.4% cobertura de muestra a día t+18'
  },
  {
    id: 'step2',
    stepNumber: 2,
    name: 'Validación, Limpieza e Imputación',
    category: 'Procesamiento',
    techTool: 'Polars / Pandas + Scikit-Learn Imputer',
    methodology: 'Detección de outliers automáticos. Imputación de precios faltantes por quiebre temporal de inventario usando regresión hedónica, variación de la subclase homogénea y hot-deck.',
    inputs: ['Precios Crudos', 'Histórico de Cotizaciones'],
    outputs: ['Dataset Limpio y Validado', 'Reporte de Imputaciones'],
    slaQuality: '< 1.8% tasa de imputación global'
  },
  {
    id: 'step3',
    stepNumber: 3,
    name: 'Ajuste Estacional y Efectos Calendario',
    category: 'Econometría',
    techTool: 'X-13ARIMA-SEATS (US Census Bureau) en Python',
    methodology: 'Descomposición de series en Tendencia-Ciclo, Estacionalidad y Componente Irregular. Corrección por días hábiles, Semana Santa móvil y bisiestos.',
    inputs: ['Series Limpias Mensuales'],
    outputs: ['Series Desestacionalizadas (SA)', 'Factores Estacionales'],
    slaQuality: 'Prueba F de estacionalidad p < 0.01'
  },
  {
    id: 'step4',
    stepNumber: 4,
    name: 'Agregación y Ponderación de Canasta',
    category: 'Cálculo de Índices',
    techTool: 'NumPy Vectorizado + DuckDB',
    methodology: 'Cálculo de índices elementales de Jevons/Dutot y agregación piramidal con fórmula de Laspeyres encadenada según la Matriz de Insumo-Producto de Cuentas Nacionales.',
    inputs: ['Precios Relativos', 'Ponderaciones CIIU Matriz Insumo-Producto'],
    outputs: ['Índices Sectoriales', 'IPP General Nacional', 'Contribuciones en p.p.'],
    slaQuality: 'Consistencia contable 100% aditiva'
  },
  {
    id: 'step5',
    stepNumber: 5,
    name: 'Modelado Predictivo y Detección de Anomalías',
    category: 'Machine Learning',
    techTool: 'PyTorch LSTM + XGBoost + Isolation Forest',
    methodology: 'Ejecución de pronósticos a 1, 3 y 6 meses. Escaneo de anomalías de mercado, sospechas de colusión oligopólica o desajustes bruscos de márgenes brutos.',
    inputs: ['Series Históricas IPP', 'Variables Macro (TRM, Petróleo, Fletes)'],
    outputs: ['Pronóstico con Intervalos 80%/95%', 'Matriz de Alertas de Campo'],
    slaQuality: 'MAPE < 1.5% en pronóstico a 1 mes'
  },
  {
    id: 'step6',
    stepNumber: 6,
    name: 'Diseminación, API y Toma de Decisiones',
    category: 'Terminal y Gobierno',
    techTool: 'Dashboard React + REST API + Publicación Oficial',
    methodology: 'Publicación para Banco Central (Junta Directiva), Ministerio de Hacienda, gremios industriales y reajuste de contratos de obras públicas.',
    inputs: ['Dataset Final Certificado', 'Boletín Técnico'],
    outputs: ['API Endpoint /ipp/latest', 'Tablero Ejecutivo', 'Boletín Estadístico'],
    slaQuality: 'Disponibilidad 99.99% en día de release'
  }
];

export const ANOMALIES_MOCK: AnomalyRecord[] = [
  {
    id: 'ALR-2026-089',
    timestamp: '2026-09-20 09:14',
    establishmentId: 'EST-IND-7429',
    productName: 'Polietileno de baja densidad (granza)',
    ciiuCode: 'C2013',
    sector: 'Química Industrial',
    reportedPrice: 8450.0,
    expectedPrice: 5120.0,
    deviationPercent: +65.04,
    detector: 'Isolation Forest',
    severity: 'Crítica',
    status: 'En Investigación'
  },
  {
    id: 'ALR-2026-088',
    timestamp: '2026-09-19 16:42',
    establishmentId: 'EST-AGR-1104',
    productName: 'Fertilizante Urea granulada 46%',
    ciiuCode: 'C2012',
    sector: 'Agroinsumos',
    reportedPrice: 195000.0,
    expectedPrice: 142000.0,
    deviationPercent: +37.32,
    detector: 'Robust Z-Score',
    severity: 'Crítica',
    status: 'Confirmado Atípico'
  },
  {
    id: 'ALR-2026-087',
    timestamp: '2026-09-18 11:20',
    establishmentId: 'EST-MAN-3382',
    productName: 'Varilla de acero corrugado 1/2 pulgada',
    ciiuCode: 'C2410',
    sector: 'Siderurgia',
    reportedPrice: 42000.0,
    expectedPrice: 42000.0,
    deviationPercent: 0.0,
    detector: 'Detección Colusión / Congelado',
    severity: 'Moderada',
    status: 'En Investigación'
  },
  {
    id: 'ALR-2026-086',
    timestamp: '2026-09-17 14:05',
    establishmentId: 'EST-AGR-8891',
    productName: 'Papa parda pastusa (bulto 50kg)',
    ciiuCode: 'A0113',
    sector: 'Agricultura',
    reportedPrice: 110000.0,
    expectedPrice: 72000.0,
    deviationPercent: +52.78,
    detector: 'Robust Z-Score',
    severity: 'Crítica',
    status: 'Confirmado Atípico'
  },
  {
    id: 'ALR-2026-085',
    timestamp: '2026-09-16 10:30',
    establishmentId: 'EST-ENE-0043',
    productName: 'Energía en contrato bilateral no regulado',
    ciiuCode: 'D3510',
    sector: 'Energía Eléctrica',
    reportedPrice: 385.4,
    expectedPrice: 310.2,
    deviationPercent: +24.24,
    detector: 'Isolation Forest',
    severity: 'Moderada',
    status: 'Imputado'
  }
];

export const SCENARIOS: ScenarioDefinition[] = [
  {
    id: 'oil-shock',
    title: 'Shock Geopolítico en Hidrocarburos',
    tag: 'Crudo +25%',
    description: 'Escalada de tensiones bélicas que interrumpe el tránsito marítimo en el Estrecho de Ormuz, disparando el crudo Brent un 25% y los combustibles refinados.',
    oilShockPct: 25.0,
    fxDevaluationPct: 4.5,
    agriDroughtShockPct: 2.0,
    freightCostShockPct: 18.0,
    estimatedIppMoM: 1.84,
    estimatedIppYoY: 7.95,
    transmissionLagMonths: 2
  },
  {
    id: 'drought-climate',
    title: 'Evento Climático Severo (El Niño Extremo)',
    tag: 'Sequía Agrícola',
    description: 'Sequía prolongada que disminuye la producción de alimentos perecederos y reduce el nivel útil de embalses hidroeléctricos por debajo del 30%.',
    oilShockPct: -2.0,
    fxDevaluationPct: 2.0,
    agriDroughtShockPct: 35.0,
    freightCostShockPct: 5.0,
    estimatedIppMoM: 2.35,
    estimatedIppYoY: 9.10,
    transmissionLagMonths: 1
  },
  {
    id: 'fx-devaluation',
    title: 'Devaluación Cambiaria Acelerada',
    tag: 'Dólar +15%',
    description: 'Aumento de tasas de la Reserva Federal de EE. UU. y aversión global al riesgo que devalúa la moneda local un 15% frente al dólar.',
    oilShockPct: 5.0,
    fxDevaluationPct: 15.0,
    agriDroughtShockPct: 8.0,
    freightCostShockPct: 12.0,
    estimatedIppMoM: 1.62,
    estimatedIppYoY: 6.80,
    transmissionLagMonths: 3
  },
  {
    id: 'supply-chain-choke',
    title: 'Disrupción Logística Global en Fletes',
    tag: 'Fletes +45%',
    description: 'Cuellos de botella en puertos clave y crisis de contenedores, elevando tarifas del flete marítimo y materias primas intermedias importadas.',
    oilShockPct: 8.0,
    fxDevaluationPct: 3.0,
    agriDroughtShockPct: 4.0,
    freightCostShockPct: 45.0,
    estimatedIppMoM: 1.45,
    estimatedIppYoY: 6.20,
    transmissionLagMonths: 3
  }
];
