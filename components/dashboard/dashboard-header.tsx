'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Download, RefreshCw, Building2, 
  MapPin, Calendar, Users, Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/lib/dashboard-context';
import { ThemeToggle } from '@/components/theme-toggle';
import type { BusinessInputs } from '@/lib/types';

interface DashboardHeaderProps {
  inputs: BusinessInputs;
}

export function DashboardHeader({ inputs }: DashboardHeaderProps) {
  const { setStep, setDashboardData } = useDashboard();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleNewAnalysis = () => {
    setDashboardData(null);
    setStep('form');
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    
    try {
      // Dynamically import the PDF libraries
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ]);

      // Get the dashboard content
      const dashboardElement = document.getElementById('dashboard-content');
      if (!dashboardElement) {
        throw new Error('Dashboard content not found');
      }

      // Create canvas from the dashboard
      const canvas = await html2canvas(dashboardElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0f172a', // Match the dark background
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      const fileName = `BI-Report-${inputs.business_type.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: Title and business info */}
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">BizIntel AI Report</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {inputs.business_type}
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {inputs.location}
                </span>
                <span className="hidden md:flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {inputs.business_age} years
                </span>
                <span className="hidden md:flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {inputs.employees} employees
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewAnalysis}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">New Analysis</span>
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="gap-2 bg-gradient-to-r from-primary to-indigo-500 hover:opacity-90 text-primary-foreground"
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Download PDF Report</span>
              <span className="sm:hidden">PDF</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
