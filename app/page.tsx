'use client';

import { DashboardProvider, useDashboard } from '@/lib/dashboard-context';
import { ThemeProvider } from '@/lib/theme-context';
import { OnboardingForm } from '@/components/onboarding-form';
import { LoadingScreen } from '@/components/loading-screen';
import { ExecutiveDashboard } from '@/components/dashboard/executive-dashboard';

function DashboardContent() {
  const { step, dashboardData } = useDashboard();

  if (step === 'form') {
    return <OnboardingForm />;
  }

  if (step === 'loading') {
    return <LoadingScreen />;
  }

  if (step === 'dashboard' && dashboardData) {
    return <ExecutiveDashboard data={dashboardData} />;
  }

  return <OnboardingForm />;
}

export default function Home() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <DashboardContent />
      </DashboardProvider>
    </ThemeProvider>
  );
}
