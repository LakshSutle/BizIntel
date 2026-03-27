'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Percent, PiggyBank, Banknote } from 'lucide-react';
import type { BusinessSnapshot } from '@/lib/types';
import { useDashboard } from '@/lib/dashboard-context';
import { formatCurrency } from '@/lib/currency';

interface KPICardsProps {
  snapshot: BusinessSnapshot;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function KPICards({ snapshot }: KPICardsProps) {
  const { currency } = useDashboard();
  const { revenue, expenses, profit, profitMargin } = snapshot;
  const isPositiveProfit = profit >= 0;

  const kpis = [
    {
      label: 'Revenue',
      value: formatCurrency(revenue, currency.symbol),
      icon: Banknote,
      color: 'text-emerald',
      bgColor: 'bg-emerald/10',
      glowColor: 'shadow-emerald/20',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      label: 'Expenses',
      value: formatCurrency(expenses, currency.symbol),
      icon: TrendingDown,
      color: 'text-rose',
      bgColor: 'bg-rose/10',
      glowColor: 'shadow-rose/20',
      trend: '-3.2%',
      trendUp: false,
    },
    {
      label: 'Profit',
      value: formatCurrency(Math.abs(profit), currency.symbol),
      icon: PiggyBank,
      color: isPositiveProfit ? 'text-emerald' : 'text-destructive',
      bgColor: isPositiveProfit ? 'bg-emerald/10' : 'bg-destructive/10',
      glowColor: isPositiveProfit ? 'shadow-emerald/20' : 'shadow-destructive/20',
      trend: isPositiveProfit ? '+8.7%' : '-5.2%',
      trendUp: isPositiveProfit,
      prefix: isPositiveProfit ? '' : '-',
    },
    {
      label: 'Profit Margin',
      value: `${profitMargin.toFixed(1)}%`,
      icon: Percent,
      color: profitMargin >= 20 ? 'text-emerald' : profitMargin >= 10 ? 'text-amber' : 'text-rose',
      bgColor: profitMargin >= 20 ? 'bg-emerald/10' : profitMargin >= 10 ? 'bg-amber/10' : 'bg-rose/10',
      glowColor: profitMargin >= 20 ? 'shadow-emerald/20' : profitMargin >= 10 ? 'shadow-amber/20' : 'shadow-rose/20',
      trend: profitMargin >= 15 ? 'Healthy' : 'Needs Attention',
      trendUp: profitMargin >= 15,
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={`${kpi.label}-${index}`}
            variants={item}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`relative p-6 rounded-xl border border-border bg-card overflow-hidden shadow-lg ${kpi.glowColor}`}
          >
            {/* Glow effect */}
            <div className={`absolute -top-12 -right-12 w-24 h-24 ${kpi.bgColor} rounded-full blur-2xl opacity-50`} />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${kpi.trendUp ? 'text-emerald' : 'text-rose'}`}>
                  {kpi.trendUp ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {kpi.trend}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
              <p className={`text-3xl font-bold ${kpi.color}`}>
                {kpi.prefix}{kpi.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
