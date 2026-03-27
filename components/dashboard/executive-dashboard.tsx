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

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  // ✅ PDF FUNCTION
  const generatePDF = async () => {
    try {
      const element = document.getElementById("report");

      if (!element) {
        alert("Report not found!");
        return;
      }

      // Wait for rendering
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Multi-page support
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Business_Report.pdf");

    } catch (error) {
      console.error("PDF Error:", error);
      alert("PDF generation failed.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader inputs={inputs} />

      {/* ✅ IMPORTANT: Changed ID to "report" */}
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

        {/* ✅ PDF BUTTON */}
        <div className="flex justify-center mt-6">
          <button
            onClick={generatePDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Download PDF
          </button>
        </div>

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
