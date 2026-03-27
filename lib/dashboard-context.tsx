'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { BusinessInputs, DashboardData } from './types';
import { getCurrencyFromLocation, type CurrencyInfo } from './currency';

interface DashboardContextType {
  step: 'form' | 'loading' | 'dashboard';
  setStep: (step: 'form' | 'loading' | 'dashboard') => void;
  formData: Partial<BusinessInputs>;
  setFormData: (data: Partial<BusinessInputs>) => void;
  dashboardData: DashboardData | null;
  setDashboardData: (data: DashboardData | null) => void;
  generateReport: (inputs: BusinessInputs) => Promise<void>;
  currency: CurrencyInfo;
  setCurrency: (currency: CurrencyInfo) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}

// Generate mock data based on inputs
function generateMockDashboardData(inputs: BusinessInputs): DashboardData {
  const profit = inputs.revenue - inputs.expenses;
  const profitMargin = inputs.revenue > 0 ? (profit / inputs.revenue) * 100 : 0;
  
  return {
    inputs,
    snapshot: {
      revenue: inputs.revenue,
      expenses: inputs.expenses,
      profit,
      profitMargin: Math.round(profitMargin * 10) / 10,
    },
    healthScore: {
      score: Math.min(100, Math.max(0, Math.round(50 + profitMargin + inputs.business_age * 2))),
      riskLevel: profitMargin < 10 ? 'High' : profitMargin < 20 ? 'Medium' : 'Low',
      factors: [
        profitMargin > 15 ? 'Strong profit margins' : 'Profit margins need improvement',
        inputs.business_age > 3 ? 'Established market presence' : 'Building market presence',
        inputs.employees > 5 ? 'Growing team capacity' : 'Lean operations',
      ],
    },
    keyProblems: [
      {
        title: 'Cash Flow Management',
        description: `With ${Math.round((inputs.expenses / inputs.revenue) * 100)}% expense ratio, optimizing cash flow is critical.`,
        severity: inputs.expenses / inputs.revenue > 0.8 ? 'High' : 'Medium',
      },
      {
        title: inputs.biggest_challenge.split(' ').slice(0, 3).join(' ') || 'Market Competition',
        description: inputs.biggest_challenge || 'Addressing competitive pressures in your market segment.',
        severity: 'High',
      },
      {
        title: 'Growth Sustainability',
        description: `Current ${inputs.growth_trend.toLowerCase()} growth trend requires strategic planning.`,
        severity: inputs.growth_trend === 'Declining' ? 'High' : 'Low',
      },
    ],
    diagnosis: `Your ${inputs.business_type} business in ${inputs.location} shows ${inputs.growth_trend.toLowerCase()} growth patterns. With ${inputs.employees} employees and ${inputs.business_age} years of operation, you're positioned in the ${inputs.customer_type} market. The ${profitMargin.toFixed(1)}% profit margin indicates ${profitMargin > 20 ? 'healthy' : profitMargin > 10 ? 'moderate' : 'challenged'} financial performance. Key focus areas include ${inputs.biggest_challenge.toLowerCase() || 'operational efficiency'} and achieving your goal of ${inputs.business_goal.toLowerCase() || 'sustainable growth'}.`,
    marketInsights: [
      { type: 'opportunity', title: 'Digital Transformation', description: `${inputs.business_type} businesses are seeing 30% growth through digital channels.` },
      { type: 'opportunity', title: 'Market Expansion', description: `${inputs.location} market shows strong demand for ${inputs.customer_type} services.` },
      { type: 'opportunity', title: 'Automation Potential', description: 'Process automation could reduce operational costs by 15-25%.' },
      { type: 'threat', title: 'Economic Uncertainty', description: 'Market volatility may impact customer spending patterns.' },
      { type: 'threat', title: 'Competition Intensity', description: `Increasing competition in the ${inputs.business_type} sector requires differentiation.` },
      { type: 'threat', title: 'Rising Costs', description: 'Input costs trending upward across most categories.' },
    ],
    actionPlan: [
      {
        week: 1,
        title: 'Foundation & Analysis',
        focus: 'Data Collection',
        tasks: [
          'Audit current financial statements and cash flow',
          'Map all revenue streams and expense categories',
          'Identify top 3 cost reduction opportunities',
          'Set up tracking metrics for key KPIs',
        ],
      },
      {
        week: 2,
        title: 'Quick Wins Implementation',
        focus: 'Cost Optimization',
        tasks: [
          'Negotiate with top 3 vendors for better terms',
          'Implement expense approval workflow',
          'Review and optimize subscription services',
          'Launch customer feedback collection',
        ],
      },
      {
        week: 3,
        title: 'Revenue Enhancement',
        focus: 'Growth Initiatives',
        tasks: [
          'Analyze highest-margin products/services',
          'Develop upsell strategy for existing customers',
          'Test new marketing channel with limited budget',
          'Create referral program framework',
        ],
      },
      {
        week: 4,
        title: 'Sustainability & Scale',
        focus: 'Process Improvement',
        tasks: [
          'Document improved processes and procedures',
          'Train team on new efficiency measures',
          'Set 90-day goals based on learnings',
          'Schedule monthly review cadence',
        ],
      },
    ],
    recommendations: [
      {
        title: 'Implement Zero-Based Budgeting',
        description: 'Review all expenses from scratch to eliminate unnecessary costs and improve margin by 5-8%.',
        impact: 'High',
        category: 'Financial',
      },
      {
        title: 'Diversify Sales Channels',
        description: `Expand beyond ${inputs.sales_channel.join(', ')} to reduce dependency and increase reach.`,
        impact: 'High',
        category: 'Growth',
      },
      {
        title: 'Customer Retention Program',
        description: 'Implement loyalty program to increase repeat purchases and lifetime value by 25%.',
        impact: 'Medium',
        category: 'Marketing',
      },
      {
        title: 'Operational Automation',
        description: 'Automate repetitive tasks to free up team capacity for high-value activities.',
        impact: 'Medium',
        category: 'Operations',
      },
      {
        title: 'Strategic Partnerships',
        description: 'Explore partnerships with complementary businesses for cross-promotion.',
        impact: 'Medium',
        category: 'Growth',
      },
    ],
    risks: [
      {
        title: 'Cash Flow Shortage',
        description: 'Insufficient reserves for unexpected expenses or slow periods.',
        level: profitMargin < 15 ? 'High' : 'Medium',
        mitigation: 'Build 3-month operating expense reserve gradually.',
      },
      {
        title: 'Market Dependency',
        description: `Heavy reliance on ${inputs.customer_type} segment may limit growth.`,
        level: 'Medium',
        mitigation: 'Develop adjacent market entry strategy.',
      },
      {
        title: 'Talent Retention',
        description: 'Key employee departure could impact operations significantly.',
        level: inputs.employees < 10 ? 'High' : 'Low',
        mitigation: 'Cross-train team and document critical processes.',
      },
    ],
    simulation: {
      baseProfit: profit,
      baseMargin: profitMargin,
      scenarios: {
        revenueIncrease: [5, 10, 15, 20, 25],
        expenseReduction: [5, 10, 15, 20, 25],
      },
    },
  };
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<'form' | 'loading' | 'dashboard'>('form');
  const [formData, setFormData] = useState<Partial<BusinessInputs>>({});
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [currency, setCurrency] = useState<CurrencyInfo>({ symbol: '$', code: 'USD', name: 'US Dollar' });

  const generateReport = async (inputs: BusinessInputs) => {
    setStep('loading');
    
    // Get currency based on location
    const detectedCurrency = getCurrencyFromLocation(inputs.location);
    setCurrency(detectedCurrency);
    
    // Simulate API call delay for realistic loading experience
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const data = generateMockDashboardData(inputs);
    setDashboardData(data);
    setStep('dashboard');
  };

  return (
    <DashboardContext.Provider
      value={{
        step,
        setStep,
        formData,
        setFormData,
        dashboardData,
        setDashboardData,
        generateReport,
        currency,
        setCurrency,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
