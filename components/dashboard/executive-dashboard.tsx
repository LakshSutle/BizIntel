'use client';

import { DashboardHeader } from './dashboard-header';
import { KPICards } from './kpi-cards';
import { HealthScore } from './health-score';
import { Charts } from './charts';
import { ActionPlan } from './action-plan';
import { MarketInsights } from './market-insights';
import { Recommendations } from './recommendations';
import { ScenarioSimulator } from './scenario-simulator';
import type { DashboardData } from '@/lib/types';



interface ExecutiveDashboardProps {
  data: DashboardData;
}

export function ExecutiveDashboard({ data }: ExecutiveDashboardProps) {
  const {
    inputs,
    snapshot,
    healthScore,
    diagnosis,
    marketInsights,
    actionPlan,
    recommendations,
  } = data;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader inputs={inputs} dashboardData={data} />

      <main id="report" className="container mx-auto px-4 py-6 space-y-6">

        {/* Financial Snapshot - KPI Cards */}
        <section>
          <KPICards snapshot={snapshot} />
        </section>

        {/* Health Score & Diagnosis */}
        <section>
          <HealthScore healthScore={healthScore} diagnosis={diagnosis} />
        </section>

        {/* Visual Analytics - Charts */}
        <section>
          <Charts snapshot={snapshot} salesChannels={inputs.sales_channel} />
        </section>

        {/* Strategy Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActionPlan actionPlan={actionPlan} />
          <MarketInsights insights={marketInsights} />
        </div>

        {/* Strategic Recommendations */}
        <section>
          <Recommendations recommendations={recommendations} />
        </section>

        {/* Scenario Simulator */}
        <section>
          <ScenarioSimulator snapshot={snapshot} />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border mt-8">
          <p className="text-sm text-muted-foreground">
            Generated on {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Powered by BizIntel AI
          </p>
        </footer>

      </main>
    </div>
  );
}
