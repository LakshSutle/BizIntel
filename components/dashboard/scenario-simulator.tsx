'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Sliders, TrendingUp, TrendingDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import type { BusinessSnapshot } from '@/lib/types';
import { useDashboard } from '@/lib/dashboard-context';

interface ScenarioSimulatorProps {
  snapshot: BusinessSnapshot;
}

export function ScenarioSimulator({ snapshot }: ScenarioSimulatorProps) {
  const { currency } = useDashboard();
  const [revenueAdjustment, setRevenueAdjustment] = useState(0);
  const [expenseReduction, setExpenseReduction] = useState(0);

  const { revenue, expenses } = snapshot;

  const projectedData = useMemo(() => {
    const months = ['Current', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];
    
    return months.map((month, index) => {
      const progressFactor = index / (months.length - 1);
      
      // Gradual increase in revenue
      const projectedRevenue = revenue * (1 + (revenueAdjustment / 100) * progressFactor);
      // Gradual decrease in expenses
      const projectedExpenses = expenses * (1 - (expenseReduction / 100) * progressFactor);
      
      const projectedProfit = projectedRevenue - projectedExpenses;
      const projectedMargin = projectedRevenue > 0 
        ? (projectedProfit / projectedRevenue) * 100 
        : 0;

      return {
        month,
        revenue: Math.round(projectedRevenue),
        expenses: Math.round(projectedExpenses),
        profit: Math.round(projectedProfit),
        margin: Math.round(projectedMargin * 10) / 10,
      };
    });
  }, [revenue, expenses, revenueAdjustment, expenseReduction]);

  const finalData = projectedData[projectedData.length - 1];
  const currentData = projectedData[0];

  const marginChange = finalData.margin - currentData.margin;
  const profitChange = finalData.profit - currentData.profit;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={`sim-tooltip-${entry.name}-${index}`} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'margin' ? `${entry.value}%` : `${currency.symbol}${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sliders className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Scenario Simulator</h3>
          <p className="text-sm text-muted-foreground">Project your margin with adjustments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          {/* Revenue Adjustment Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald" />
                Revenue Increase
              </label>
              <span className="text-sm font-bold text-emerald">+{revenueAdjustment}%</span>
            </div>
            <Slider
              value={[revenueAdjustment]}
              onValueChange={([value]) => setRevenueAdjustment(value)}
              max={50}
              step={1}
              className="py-2"
            />
            <p className="text-xs text-muted-foreground">
              Projected: {currency.symbol}{((revenue * (1 + revenueAdjustment / 100))).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>

          {/* Expense Reduction Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-rose" />
                Expense Reduction
              </label>
              <span className="text-sm font-bold text-rose">-{expenseReduction}%</span>
            </div>
            <Slider
              value={[expenseReduction]}
              onValueChange={([value]) => setExpenseReduction(value)}
              max={30}
              step={1}
              className="py-2"
            />
            <p className="text-xs text-muted-foreground">
              Projected: {currency.symbol}{((expenses * (1 - expenseReduction / 100))).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>

          {/* Impact Summary */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">6-Month Impact</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Margin Change</span>
                <span className={`text-sm font-bold ${marginChange >= 0 ? 'text-emerald' : 'text-rose'}`}>
                  {marginChange >= 0 ? '+' : ''}{marginChange.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Profit Change</span>
                <span className={`text-sm font-bold ${profitChange >= 0 ? 'text-emerald' : 'text-rose'}`}>
                  {profitChange >= 0 ? '+' : ''}{currency.symbol}{profitChange.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
                <span className="text-xs text-muted-foreground">Final Margin</span>
                <span className={`text-sm font-bold ${finalData.margin >= 20 ? 'text-emerald' : finalData.margin >= 10 ? 'text-amber' : 'text-rose'}`}>
                  {finalData.margin}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectedData}>
                <defs>
                  <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(245, 58%, 51%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(245, 58%, 51%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }} 
                  axisLine={{ stroke: 'hsl(var(--border))' }} 
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }} 
                  axisLine={{ stroke: 'hsl(var(--border))' }} 
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 'dataMax + 10']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="margin"
                  stroke="hsl(245, 58%, 51%)"
                  strokeWidth={2}
                  fill="url(#colorMargin)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Metric badges */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald" />
              <span className="text-muted-foreground">Current Margin:</span>
              <span className="font-medium text-foreground">{currentData.margin}%</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Projected Margin:</span>
              <span className="font-medium text-foreground">{finalData.margin}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
