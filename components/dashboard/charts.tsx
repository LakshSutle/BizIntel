'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon, Gauge } from 'lucide-react';
import type { BusinessSnapshot } from '@/lib/types';

interface ChartsProps {
  snapshot: BusinessSnapshot;
  salesChannels: string[];
}

const COLORS = {
  primary: 'hsl(245, 58%, 51%)',
  emerald: 'hsl(160, 84%, 39%)',
  amber: 'hsl(38, 92%, 50%)',
  rose: 'hsl(0, 84%, 60%)',
  purple: 'hsl(270, 70%, 60%)',
  cyan: 'hsl(180, 70%, 50%)',
};

const CHANNEL_COLORS = [
  COLORS.primary,
  COLORS.emerald,
  COLORS.amber,
  COLORS.rose,
  COLORS.purple,
  COLORS.cyan,
];

export function Charts({ snapshot, salesChannels }: ChartsProps) {
  const { revenue, expenses, profitMargin } = snapshot;

  const revenueExpenseData = [
    {
      name: 'Monthly',
      Revenue: revenue,
      Expenses: expenses,
      Profit: revenue - expenses,
    },
  ];

  const channelData = salesChannels.map((channel) => ({
    name: channel.length > 15 ? channel.substring(0, 12) + '...' : channel,
    value: Math.round(100 / salesChannels.length),
  }));

  const gaugeData = [
    {
      name: 'Margin',
      value: Math.min(profitMargin, 100),
      fill:
        profitMargin >= 20
          ? COLORS.emerald
          : profitMargin >= 10
          ? COLORS.amber
          : COLORS.rose,
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-${entry.name}-${index}`} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
          <p className="text-xs text-muted-foreground">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-4"
    >
      {/* Gauge */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="h-4 w-4 text-primary" />
          <h4 className="font-semibold text-foreground text-sm">Profit Margin</h4>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={gaugeData}
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="90%"
              isAnimationActive={false} // 🔥 FIX
            >
              <RadialBar dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center -mt-16">
          <p className="text-3xl font-bold">{profitMargin.toFixed(1)}%</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h4 className="font-semibold text-foreground text-sm">Revenue vs Expenses</h4>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueExpenseData} isAnimationActive={false}> {/* 🔥 FIX */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Revenue" fill={COLORS.emerald} />
              <Bar dataKey="Expenses" fill={COLORS.rose} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <PieChartIcon className="h-4 w-4 text-primary" />
          <h4 className="font-semibold text-foreground text-sm">Sales Channel Mix</h4>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart isAnimationActive={false}> {/* 🔥 FIX */}
              <Pie data={channelData} dataKey="value">
                {channelData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
