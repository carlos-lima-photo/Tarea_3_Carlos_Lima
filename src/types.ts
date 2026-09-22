export interface SectorData {
  id: string;
  name: string;
  code: string; // CIIU Rev. 4 / NAICS
  weight: number; // percentage of total IPP basket
  momChange: number; // % monthly change
  yoyChange: number; // % annual change
  volatility: number; // standard deviation
  sampleBasket: string[];
  passThroughRate: number; // 0 to 1 transmission to CPI
  description: string;
}

export interface MacroDataPoint {
  period: string; // e.g., "2024-01"
  ipp: number; // IPP Index level (base 100 = 2020)
  ipc: number; // CPI Index level
  ippMoM: number; // % MoM
  ipcMoM: number; // % MoM
  usdCop: number; // Exchange rate or FX index
  brentOil: number; // USD / barrel
  fertPrices: number; // Commodity index
}

export interface MLModelSpec {
  id: string;
  name: string;
  category: 'Supervisado' | 'No Supervisado' | 'Red Neuronal';
  algorithm: string;
  rmse: number;
  mape: number;
  r2: number;
  horizon: string;
  description: string;
  pros: string;
}

export interface PipelineStage {
  id: string;
  stepNumber: number;
  name: string;
  category: string;
  techTool: string;
  methodology: string;
  inputs: string[];
  outputs: string[];
  slaQuality: string;
}

export interface AnomalyRecord {
  id: string;
  timestamp: string;
  establishmentId: string;
  productName: string;
  ciiuCode: string;
  sector: string;
  reportedPrice: number;
  expectedPrice: number;
  deviationPercent: number;
  detector: 'Isolation Forest' | 'Robust Z-Score' | 'Detección Colusión / Congelado';
  severity: 'Crítica' | 'Moderada' | 'Baja';
  status: 'En Investigación' | 'Confirmado Atípico' | 'Imputado' | 'Resuelto';
}

export interface ScenarioDefinition {
  id: string;
  title: string;
  tag: string;
  description: string;
  oilShockPct: number;
  fxDevaluationPct: number;
  agriDroughtShockPct: number;
  freightCostShockPct: number;
  estimatedIppMoM: number;
  estimatedIppYoY: number;
  transmissionLagMonths: number;
}

export interface SubsectorContribution {
  subsector: string;
  ciiu: string;
  weight: number;
  contributionPp: number; // percentage points
  priceChange: number;
}
