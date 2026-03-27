export interface BusinessInputs {
  business_type: string;
  revenue: number;
  expenses: number;
  location: string;
  business_age: number;
  employees: number;
  customer_type: string;
  sales_channel: string[];
  growth_trend: string;
  business_goal: string;
  biggest_challenge: string;
}

export interface BusinessSnapshot {
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
}

export interface HealthScore {
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  factors: string[];
}

export interface KeyProblem {
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface MarketInsight {
  type: 'opportunity' | 'threat';
  title: string;
  description: string;
}

export interface ActionPlanWeek {
  week: number;
  title: string;
  tasks: string[];
  focus: string;
}

export interface StrategicRecommendation {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  category: string;
}

export interface RiskItem {
  title: string;
  description: string;
  level: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

export interface ScenarioSimulation {
  baseProfit: number;
  baseMargin: number;
  scenarios: {
    revenueIncrease: number[];
    expenseReduction: number[];
  };
}

export interface DashboardData {
  inputs: BusinessInputs;
  snapshot: BusinessSnapshot;
  healthScore: HealthScore;
  keyProblems: KeyProblem[];
  diagnosis: string;
  marketInsights: MarketInsight[];
  actionPlan: ActionPlanWeek[];
  recommendations: StrategicRecommendation[];
  risks: RiskItem[];
  simulation: ScenarioSimulation;
}
